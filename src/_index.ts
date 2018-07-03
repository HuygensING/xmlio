import State from "./state"
import {compareNodeToSelector} from "./utils"
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
		const found = compareNodeToSelector(n)(parent)
		const nextNode = cloneNode(n)
		if (!Array.isArray(nodesToAdd)) nodesToAdd = [nodesToAdd]
		const nodes: SaxNode[] = nodesToAdd.map((n: PartialSaxNode) => {
			if (typeof n === 'string') return n
			return createSaxTag(n)
		})
		if (found) nextNode.children = append ? nextNode.children.concat(nodes) : nodes.concat(nextNode.children)
		return nextNode
	})

export const moveNode = (tree: SaxTag, selector: SaxTagSelector, parentSelector: SaxTagSelector, append?: boolean) => {
	const [nextTree, removedNodes] = removeFromTree(tree, selector)
	return addToTree(nextTree, removedNodes, parentSelector, append)
}

export const replaceNode = (tree: SaxTag, sourceNode: SaxTag, targetSelector: SaxTagSelector) => {
	if (sourceNode == null || targetSelector == null) return tree

	return iterateTree(tree, (n: SaxTag) => {
		if (typeof n === 'string') return n
		const isTarget = compareNodeToSelector(n)(targetSelector)
		if (isTarget) return sourceNode
		return n
	})
}

export type TargetSelectorFunc = (sourceNode: SaxTag) => SaxTagSelector
export const replaceNodes = (tree: SaxTag, sourceSelector: SaxTagSelector, targetSelectorFunc: TargetSelectorFunc): SaxTag => {
	let [nextTree, removedNodes] = removeFromTree(tree, sourceSelector)
	for (const node of removedNodes) {
		nextTree = replaceNode(nextTree, node, targetSelectorFunc(node))
	}
	return nextTree
}

export const wrapNodes = (tree: SaxTag, selector: SaxTagSelector, parent: Partial<SaxTag> ) => {
	return iterateTree(tree, (n: SaxTag) => {
		if (typeof n === 'string') return n

		const found = compareNodeToSelector(n)(selector)
		return (found) ? { ...createSaxTag(parent), children: [{...n}] } : { ...n }
	})
}

function createSaxTag(tag: Partial<SaxTag>): SaxTag {
	// TODO move to xml2tree
	// TODO use crypto to create ID
	const defaultTagNode: SaxTag = {
		attributes: {},
		id: 'some-id',
		isSelfClosing: false,
		name: null,
		parents: []
	}

	if (tag.hasOwnProperty('children')) {
		tag.children = tag.children.map((child: SaxNode) => {
			if (typeof child === 'string') return child
			return createSaxTag(child)
		})
	}

	return { ...defaultTagNode, ...tag }
}
