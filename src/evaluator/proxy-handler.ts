import { renameElement, replaceElement } from './utils';

export const COLON_REPLACE = '_-_-_-_'

function createProxyName(name: string) {
	return name.replace(/:/ug, COLON_REPLACE)
}

function revertProxyName(name: string) {
	const re = new RegExp(COLON_REPLACE, 'ug')
	return name.replace(re, ':')
}

function getDepth(node: Node, parent: Node) {
	let depth = 0
	while (node !== parent) {
		depth += 1
		node = node.parentNode
	}
	return depth
}

interface ToReplace {
	depth: number
	node: Element
}

export default class ProxyHandler {
	private proxyAttributeElements: Element[] = []

	constructor(private parserOptions: DomParserOptions) {}

	addProxies(el: Element): Element {
		if (!this.parserOptions.handleNamespaces) return

		const toReplace: ToReplace[] = []

		var treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT)
		while (treeWalker.nextNode()) {
			const node = treeWalker.currentNode as Element

			for (const attr of node.attributes) {
				const colonIndex = attr.name.indexOf(':')
				if (
					colonIndex > 0 &&
					attr.name.slice(0, colonIndex + 1) !== 'xmlns:'
				) {
					node.setAttribute(createProxyName(attr.name), node.getAttribute(attr.name))
					this.proxyAttributeElements.push(node)
				}
			}

			// Keep a list of nodes to replace and their depth. The lowest depth nodes must
			// be replaced first, otherwise the reference to these nodes is lost
			if (node.nodeName.indexOf(':') > 0) {
				toReplace.push({
					depth: getDepth(node, el),
					node 
				})
			}
		}

		toReplace
			.sort((a, b) => b.depth - a.depth)
			.forEach(rep => {
				const proxyElement = renameElement(rep.node, createProxyName(rep.node.nodeName))
				replaceElement(rep.node, proxyElement)
			})

		return el
	}


	removeProxies(el: Element): Element {
		// Remove the proxy attributes
		this.proxyAttributeElements.forEach(node => {
			for (const attr of node.attributes) {
				if (attr.name.indexOf(COLON_REPLACE) > 0) {
					node.removeAttribute(attr.name)
				}
			}
		})

		const toReplace: ToReplace[] = []
		var treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT)
		while (treeWalker.nextNode()) {
			const node = treeWalker.currentNode as Element

			// Keep a list of nodes to replace and their depth. The lowest depth nodes must
			// be replaced first, otherwise the reference to these nodes is lost
			if (node.nodeName.indexOf(COLON_REPLACE) > 0) {
				toReplace.push({
					depth: getDepth(node, el),
					node 
				})
			}
		}

		toReplace
			// Sort by lowest depth first
			.sort((a, b) => b.depth - a.depth)

			// Replace proxy elements with original elements. The elements are renamed, so the original
			// aren't placed back
			.forEach(rep => {
				const originalElement = renameElement(rep.node, revertProxyName(rep.node.nodeName))
				replaceElement(rep.node, originalElement)
			})

		return el
	}
}