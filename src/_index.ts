import State from "./state"
import {compareNodeToSelector, castArray, logError} from "./utils"
import { TagType, TagInstance } from './state/setttings'
import { SaxTag, SaxNode } from 'xml2tree'
import { SaxTagSelector } from "./types"

import XmlTag from './tags/xml'
import StringTag from './tags/string'
import HtmlTag from "./tags/html";
import JsxTag from "./tags/jsx";
export { StringTag, SaxTag, XmlTag, HtmlTag, JsxTag }

export const cloneNode = (node: SaxTag): SaxTag => JSON.parse(JSON.stringify(node))

export interface ReturnType {
	result: string | string[] | Object
	state: State
}

export function iterateTree<T>(node: SaxTag, func: (node: SaxNode) => T): any {
	const iterate = (n: SaxNode): T => {
		if (n == null) return
		if (typeof n !== 'string') n = cloneNode(n)
		if (typeof n !== 'string' && n.hasOwnProperty('children')) (n.children as any) = n.children.map(iterate)
		return func(n)
	}
	return iterate(node)
}

export const fromTree = (node: SaxTag, state: State): string => {
	//let str = iterateTree(node, (n: SaxTag) => {
	const convertSaxTag = (n: SaxTag): string => {
		if (typeof n === 'string') return state.settings.transformTextNode(n, state)
		if (state.settings.ignore.some(selector => compareNodeToSelector(n)(selector))) {
			return ''
		}

		// The node is passed to user defined functions (transformNode, getComponent),
		// so we clone the node to keep xmlio immutable
		n = cloneNode(n)

		n = state.settings.transformNode(n)

		const Tag: TagType = state.settings.getComponent(n)
		const tag: TagInstance = new Tag(n, state)

		state.openTags.add(tag)
		const open = tag.open()
		const children = n.hasOwnProperty('children') ? n.children.map(convertSaxTag).join('') : ''
		const close = tag.close()
		state.openTags.remove()

		return `${open}${children}${close}`
	}

	return convertSaxTag(node)
}

// export const treeToString = (tree: SaxTag, settings: SettingsConfig): string => fromTree(tree, new State(settings))

export const filterFromTree = (node: SaxTag, selector: SaxTagSelector): SaxTag[] => {
	const found: SaxTag[] = []

	const iterate = (n: SaxTag): void => {
		if (n == null) return
		if (n.hasOwnProperty('children')) n.children.forEach(iterate)
		if (compareNodeToSelector(n)(selector)) found.push(n)
	}
	iterate(node)

	return found
}

export const removeFromTree = (tree: SaxTag, selector: SaxTagSelector): [SaxTag, SaxTag[]] => {
	if (selector == null || !Object.keys(selector).length) return [tree, []]

	const removed: SaxTag[] = []

	const iterated = iterateTree(tree, (n: SaxTag) => {
		if (typeof n === 'string') return n

		const found = compareNodeToSelector(n)(selector)

		if (!found) {
			if (n.hasOwnProperty('children')) n.children = n.children.filter((x: any) => x != null)
			return n
		} else {
			removed.push(n)
		}
	})

	return [iterated, removed]
}

export type PartialSaxNode = Partial<SaxTag> | string
export type NodesToAdd = PartialSaxNode | PartialSaxNode[]
export const addToTree = (tree: SaxTag, nodesToAdd: NodesToAdd, parent: SaxTagSelector, append = true) =>
	iterateTree(tree, (n: SaxTag) => {
		if (typeof n === 'string') return n

		if (compareNodeToSelector(n)(parent)) {
			const nodes: SaxNode[] = castArray(nodesToAdd).map((n: PartialSaxNode) => {
				if (typeof n === 'string') return n
				const tmp = new SaxTag(n)
				return tmp
			})

			n.children = append ? n.children.concat(nodes) : nodes.concat(n.children)
		}

		return n
	})

export const moveNode = (tree: SaxTag, selector: SaxTagSelector, parentSelector: SaxTagSelector, append?: boolean) => {
	const [nextTree, removedNodes] = removeFromTree(tree, selector)
	return addToTree(nextTree, removedNodes, parentSelector, append)
}

/** Replace target (selector) with source (node) */
// export const replaceNode = (tree: SaxTag, targetSelector: SaxTagSelector, sourceNode: SaxTag) => {
// 	if (sourceNode == null || targetSelector == null) return tree

// 	return iterateTree(tree, (n: SaxTag) => {
// 		if (typeof n === 'string') return n
// 		const isTarget = compareNodeToSelector(n)(targetSelector)
// 		if (isTarget) return sourceNode
// 		return n
// 	})
// }

export type SourceSelectorFunc = (targetNode: SaxTag) => SaxTagSelector
export const replaceNodes = (
	tree: SaxTag,
	targetSelector: SaxTagSelector,
	sourceSelectorFunc: SourceSelectorFunc,
	removeSourceNode: boolean = true
): SaxTag => {
	// Create an array of pairs: [[target, source], [target, source], ...]
	// While creating the pairs, the source nodes are removed from the tree
	const pairs = filterFromTree(tree, targetSelector)
		.map(target => {
			const sourceSelector = sourceSelectorFunc(target)
			let sources: SaxTag[]

			if (removeSourceNode) {
				const removed = removeFromTree(tree, sourceSelector) 
				tree = removed[0]
				sources = removed[1]
			} else {
				sources = filterFromTree(tree, sourceSelector)
			}

			// console.log(JSON.stringify(target.attributes), sources.map(s => JSON.stringify(s.attributes)))

			if (sources.length !== 1) {
				logError(`replaceNodes`, [`sources length: ${sources.length}`, target.name, target.attributes])
				if (sources.length > 1) return [target, sources[0]]
				else return null
			}

			return [target, sources[0]]
		})
		.filter(x => x != null)

	if (!pairs.length) return tree

	// Iterate the tree to put the sources at the places of the targets
	return iterateTree(tree, (n: SaxTag) => {
		if (typeof n === 'string') return n
		// Find a pair of wich the target is equal to n 
		const pair = pairs.find(p => p[0].id === n.id)
		if (pair == null) return n
		else return pair[1]
	})
}

export const wrapNodes = (tree: SaxTag, selector: SaxTagSelector, parent: Partial<SaxTag> ) => {
	return iterateTree(tree, (n: SaxTag) => {
		if (typeof n === 'string') return n

		const found = compareNodeToSelector(n)(selector)
		if (found) parent.children = [{...n}]
		// return (found) ? { ...createSaxTag(parent), children: [{...n}] } : { ...n }
		return (found) ? new SaxTag(parent) : new SaxTag(n)
	})
}
