import { renameElement, replaceElement } from './utils';

export const COLON_REPLACE = '_-_-_-_'

function createProxyName(name: string) {
	return name.replace(/:/usg, COLON_REPLACE)
}

export default class ProxyHandler {
	private proxyElements: Map<Element, Element> = new Map()
	private proxyAttributeElements: Element[] = []

	constructor(private parserOptions: DomParserOptions) {}

	addProxies(el: Element): Element {
		if (!this.parserOptions.handleNamespaces) return

		const toReplace: Element[] = []

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

			if (node.nodeName.indexOf(':') > 0) {
				toReplace.push(node)
			}
		}
		toReplace.forEach(node => {
			const proxyElement = renameElement(node, createProxyName(node.nodeName))
			this.proxyElements.set(proxyElement, node)
			replaceElement(node, proxyElement)
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

		// Replace the proxy elements
		Array.from(this.proxyElements.entries()).forEach(([proxyEl, origEl]) => {
			replaceElement(proxyEl, origEl)
		})

		return el
	}
}