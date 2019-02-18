export function exportAsXml(tree: XMLDocument, _xmlOptions: XmlExporter): string {
	if (tree == null) return ''
	const xml = new XMLSerializer().serializeToString(tree)
	return xml
	// return (
	// 	parserOptions.namespaces.length ||
	// 	(
	// 		tree.attributes != null &&
	// 		!Array.from(tree.attributes).some(attr => /^xmlns/.test(attr.name))
	// 	)
	// ) ?
	// 	xml.replace(/\sxmlns(:.*?)?="(.*?)"/ug, '') :
	// 	xml
}

export function exportAsData(tree: XMLDocument, dataOptions: DataExporter): DataNode {
	function elementToDataElement(el: Element) {
		const attributes = Array.from(el.attributes)
			.reduce((prev, curr) => {
				prev[curr.name] = el.getAttribute(curr.name)
				return prev
			}, {} as { [key: string]: string })
		return { name: el.nodeName.toLowerCase(), attributes, children: [] as any[] }
	}


	if (!dataOptions.deep) {
		return elementToDataElement(tree.documentElement)
	}

	const nodeByData: Map<Element, DataNode> = new Map()
	const whatToShow = dataOptions.text ? NodeFilter.SHOW_ALL : NodeFilter.SHOW_ELEMENT
	var treeWalker = tree.createTreeWalker(tree.documentElement, whatToShow)
	const output = elementToDataElement(treeWalker.currentNode as Element)
	nodeByData.set(treeWalker.currentNode as Element, output)

	while (treeWalker.nextNode()) {
		let dataNode: DataNode | string
		if (treeWalker.currentNode.nodeType === 1) {
			dataNode = elementToDataElement(treeWalker.currentNode as Element)
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

export function exportAsText(tree: XMLDocument, textOptions: TextExporter): string {
	var treeWalker = tree.createTreeWalker(tree, NodeFilter.SHOW_TEXT)
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

export function exportAsDOM(tree: XMLDocument, _domOptions: DomExporter): XMLDocument {
	return tree
}