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

export function	addProxies(doc: XMLDocument): XMLDocument {
	const toReplace: ToReplace[] = []

	var treeWalker = doc.createTreeWalker(doc, NodeFilter.SHOW_ELEMENT)
	while (treeWalker.nextNode()) {
		const node = treeWalker.currentNode as Element

		for (const attr of node.attributes) {
			const colonIndex = attr.name.indexOf(':')
			if (
				colonIndex > 0 &&
				attr.name.slice(0, colonIndex + 1) !== 'xmlns:'
			) {
				node.setAttribute(createProxyName(attr.name), node.getAttribute(attr.name))
			}
		}

		// Keep a list of nodes to replace and their depth. The lowest depth nodes must
		// be replaced first, otherwise the reference to these nodes is lost
		if (node.nodeName.indexOf(':') > 0) {
			toReplace.push({
				depth: getDepth(node, doc),
				node 
			})
		}
	}

	toReplace
		.sort((a, b) => b.depth - a.depth)
		.forEach(rep => {
			const proxyElement = renameElement(doc, rep.node, createProxyName(rep.node.nodeName))
			replaceElement(rep.node, proxyElement)
		})

	return doc
}


export function removeProxies(doc: XMLDocument): XMLDocument {
	const toReplace: ToReplace[] = []
	var treeWalker = doc.createTreeWalker(doc, NodeFilter.SHOW_ELEMENT)
	while (treeWalker.nextNode()) {
		const node = treeWalker.currentNode as Element

		for (const attr of node.attributes) {
			if (attr.name.indexOf(COLON_REPLACE) > 0) {
				node.removeAttribute(attr.name)
			}
		}

		// Keep a list of nodes to replace and their depth. The lowest depth nodes must
		// be replaced first, otherwise the reference to these nodes is lost
		if (node.nodeName.indexOf(COLON_REPLACE) > 0) {
			toReplace.push({
				depth: getDepth(node, doc),
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
			const originalElement = renameElement(doc, rep.node, revertProxyName(rep.node.nodeName))
			replaceElement(rep.node, originalElement)
		})

	return doc
}
