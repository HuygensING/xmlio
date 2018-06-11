import State, { CustomState } from "./state"
import {compareNodeToSelector} from "./utils"
import { TagType, TagInstance, SettingsConfig } from './state/setttings'
import sax2tree, { TagNode } from 'sax2tree'
import { SaxTagSelector } from "./types"

import XmlTag from './tags/xml'
import EmptyTag from './tags/empty'
import HtmlTag from "./tags/html";
import JsxTag from "./tags/jsx";
export { EmptyTag, TagNode, XmlTag, HtmlTag, JsxTag }

const cloneNode = (node: TagNode): TagNode => JSON.parse(JSON.stringify(node))

export interface ReturnType {
	result: string | string[] | Object
	state: State
}

export default async function xml2html(xml: string, settings?: SettingsConfig): Promise<[string[], CustomState]> {
	const state = new State(settings)
	let tree = await sax2tree(xml)

	let [nextTree, parts] = removeFromTree(tree, state.settings.parent)
	if (!parts.length) parts.push(nextTree)

	const outputString = parts
		.map(t => wrapNodes(t, state.settings.wrapNodes))
		.map(t => moveNode(t, state.settings.move))
		.map(t => fromTree(t, state))

	return [outputString, state.custom]
}

export function iterateTree<T>(node: TagNode, func: (node: TagNode) => T): T {
	const iterate = (n: TagNode): T => {
		if (n == null) return
		if (typeof n !== 'string') n = cloneNode(n)
		if (n.hasOwnProperty('children')) (n.children as any) = n.children.map(iterate)
		return func(n)
	}
	return iterate(node)
}

export const fromTree = (node: TagNode, state: State): string => {
	const usedTags = new Set()

	let str = iterateTree(node, (n: TagNode) => {
		if (typeof n === 'string') return state.settings.transformTextNode(n)
		if (state.settings.ignore.some(selector => compareNodeToSelector(n)(selector))) {
			return ''
		}

		n = state.settings.transformNode(n)

		const Tag: TagType = state.settings.getComponent(n)
		const tag: TagInstance = new Tag(n, state)

		if (state.settings.outputType === 'jsx') usedTags.add(tag.name())

		const children = n.hasOwnProperty('children') ? n.children.join('') : ''

		return `${tag.open()}${children}${tag.close()}`
	})


	if (state.settings.outputType === 'jsx') {
		str = `import * as React from 'react'
import {${[...usedTags].join(', ')}} from '${state.settings.componentPath}'
export default (${state.settings.passProps ? 'props' : ''}) => ${str}`
	}

	return str
}

export const treeToString = (tree: TagNode, settings: SettingsConfig): string => fromTree(tree, new State(settings))

export const filterFromTree = (node: TagNode, selector: SaxTagSelector): TagNode[] => {
	const found: TagNode[] = []

	const iterate = (n: TagNode): void => {
		if (n == null) return
		if (n.hasOwnProperty('children')) n.children.forEach(iterate)
		if (compareNodeToSelector(n)(selector)) found.push(n)
	}
	iterate(node)

	return found
}

export const removeFromTree = (tree: TagNode, selector: SaxTagSelector): [TagNode, TagNode[]] => {
	if (selector == null || !Object.keys(selector).length) return [tree, []]

	const removed: TagNode[] = []

	const iterated = iterateTree(tree, (n: TagNode) => {
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

export const addToTree = (tree: TagNode, nodes: (string | TagNode)[], selector: SaxTagSelector) =>
	iterateTree(tree, (n: TagNode) => {
		if (typeof n === 'string') return n
		const found = compareNodeToSelector(n)(selector)
		const nextNode = { ... n }
		if (found) nextNode.children = nodes.concat(n.children)
		return nextNode
	})

export const moveNode = (tree: TagNode, moveSetting: { selector: SaxTagSelector, parentSelector: SaxTagSelector }) => {
	if (moveSetting == null) return tree
	const [nextTree, removedNodes] = removeFromTree(tree, moveSetting.selector)	
	return addToTree(nextTree, removedNodes, moveSetting.parentSelector)
}

export const replaceNode = (tree: TagNode, sourceNode: TagNode, targetSelector: SaxTagSelector) => {
	if (sourceNode == null || targetSelector == null) return tree

	return iterateTree(tree, (n: TagNode) => {
		if (typeof n === 'string') return n
		const isTarget = compareNodeToSelector(n)(targetSelector)
		if (isTarget) return sourceNode
		return n
	})
}

export const replaceNodes = (tree: TagNode, sourceSelector: SaxTagSelector, targetSelectorFunc: (n: TagNode) => SaxTagSelector) => {
	let [nextTree, removedNodes] = removeFromTree(tree, sourceSelector)
	for (const node of removedNodes) {
		nextTree = replaceNode(nextTree, node, targetSelectorFunc(node))
	}
	return nextTree
}

const wrapNodes = (tree: TagNode, wrapSetting: { selector: SaxTagSelector, parent: Partial<TagNode> }) => {
	if (wrapSetting == null) return tree

	return iterateTree(tree, (n: TagNode) => {
		if (typeof n === 'string') return n

		const found = compareNodeToSelector(n)(wrapSetting.selector)
		const defaultTagNode: TagNode = {
			attributes: {},
			id: null,
			isSelfClosing: false,
			name: null,
			parent: null
		}
		return (found) ? { ...defaultTagNode, ...wrapSetting.parent, children: [{...n}] } : { ...n }
	})
}