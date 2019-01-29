export function exportAsXml(tree: Element, _xmlOptions: XmlExporter, parserOptions: DomParserOptions): string {
	if (tree == null) return ''
	const xml = new XMLSerializer().serializeToString(tree)
	return (
		parserOptions.namespaces.length ||
		(
			tree.attributes != null &&
			!Array.from(tree.attributes).some(attr => /^xmlns/.test(attr.name))
		)
	) ?
		xml.replace(/\sxmlns(:.*?)?="(.*?)"/ug, '') :
		xml
}

export function exportAsData(tree: Element, dataOptions: DataExporter): DataNode {
	function elementToDataElement(el: Node) {
		const node = el as Element
		const attributes = Array.from(node.attributes)
			.reduce((prev, curr) => {
				prev[curr.name] = node.getAttribute(curr.name)
				return prev
			}, {} as { [key: string]: string })
		return { name: node.nodeName.toLowerCase(), attributes, children: [] as any[] }
	}


	if (!dataOptions.deep) {
		// let root = tree
		// console.log(root)
		// while (root != null && !root.childNodes.length) {
		// 	root = root.nextElementSibling
		// }

		return elementToDataElement(tree)
	}

	const nodeByData: Map<Element, DataNode> = new Map()
	const whatToShow = dataOptions.text ? NodeFilter.SHOW_ALL : NodeFilter.SHOW_ELEMENT
	var treeWalker = document.createTreeWalker(tree, whatToShow)
	const output = elementToDataElement(treeWalker.currentNode)
	nodeByData.set(treeWalker.currentNode as Element, output)

	while (treeWalker.nextNode()) {
		let dataNode: DataNode | string
		if (treeWalker.currentNode.nodeType === 1) {
			dataNode = elementToDataElement(treeWalker.currentNode)
			nodeByData.set(treeWalker.currentNode as Element, dataNode)
		} else if (treeWalker.currentNode.nodeType === 3) {
			if (!treeWalker.currentNode.textContent.trim().length) continue
			dataNode = treeWalker.currentNode.textContent
		}

		const parentDataNode = nodeByData.get(treeWalker.currentNode.parentElement)
		parentDataNode.children.push(dataNode as DataNode)
	}

	return output
}

export function exportAsText(tree: Element, textOptions: TextExporter): string {
	var treeWalker = document.createTreeWalker(tree, NodeFilter.SHOW_TEXT)
	const text: string[] = []
	const firstText = treeWalker.currentNode.nodeValue != null ? treeWalker.currentNode.nodeValue.trim() : ''
	text.push(firstText)
	while (treeWalker.nextNode()) {
		text.push(treeWalker.currentNode.nodeValue.trim())
	}
	return text
		.filter(t => t != null && t.length)
		.join(textOptions.join)
}

export function exportAsDOM(tree: Element, _domOptions: DomExporter): Element {
	return tree
}