export default function evaluator(
	xml: string,
	transforms: Transform[],
	parserOptions: DomParserOptions,
	options: Options | Options[]
): ExporterReturnValue | ExporterReturnValue[] {
	const COLON_REPLACE = '_-_-_-_'
	const proxyElements: Map<Element, Element> = new Map()
	const proxyAttributeElements: Element[] = []
	const pseudos = [':empty', ':not(', ':first-child', ':last-child', ':nth-child(', ':nth-last-child', ':nth-of-type', ':first-of-type', ':last-of-type', ':only-child']

	parserOptions = { handleNamespaces: true, namespaces: [], ...parserOptions }

	//###### TRANSFORMS ######\\
	function exclude(data: ExcludeTransform) {
		trees = trees.map(tree => {
			const selector = (Array.isArray(data.selector)) ? data.selector : [data.selector]

			selector.forEach(s => {
				selectElements(tree, s)
					.forEach(el => el.parentNode.removeChild(el))
			})

			return tree
		})
	}

	function change(data: ChangeTransform) {
		trees = trees.map(tree => {
			const changeFunc = unwrapStringFunction(data.changeFunc)
			const targets = selectElements(tree, data.selector)
			Array.from(targets).forEach(changeFunc)
			return tree
		})
	}

	function rename(data: RenameTransform) {
		trees = trees.map(tree => {
			const oldEls = selectElements(tree, data.selector)
			oldEls.forEach(oldEl => {
				const newEl = renameElement(oldEl, data.newName)
				replaceElement(oldEl, newEl)
			})
			return tree
		})
	}

	function replace(data: ReplaceTransform) {
		trees = trees.map(tree => replaceInTree(tree, data))
	}
	function replaceInTree(tree: Element, data: ReplaceTransform) {
		const sourceSelectorFunc = unwrapStringFunction(data.sourceSelectorFunc)

		// Retrieve the targets from the document
		const targets = selectElements(tree, data.targetSelector)
		if (!targets.length) console.log('WARNING', `No targets found for ${data.targetSelector}`)

		// Keep a list of used elements, otherwise a replaced target or moved source can be
		// replaced or moved again
		const used: Element[] = []

		Array.from(targets)
			.forEach(target => {
				// Add the target to the used elements
				used.push(target)

				// Retrieve the sources, but subtract the already used sources
				const sourceSelector = sourceSelectorFunc(target)
				const sourceElements = selectElements(tree, sourceSelector)
				const sources = Array.from(sourceElements).filter(source => used.indexOf(source) === -1)

				// Split the sources in the first source and the other sources. The first sources replaces
				// the target
				if (!sources.length) {
					console.log('WARNING', `No sources (${sourceSelector}) found for target: ${data.targetSelector}`)
					return
				}
				let [firstSource, ...otherSources] = sources
				if (!data.removeSource) firstSource = firstSource.cloneNode(true) as Element
				used.push(firstSource)
				replaceElement(target, firstSource)

				// The other sources are inserted after the first source
				if (!otherSources.length) return
				otherSources
					.filter(source => used.indexOf(source) === -1)
					.forEach(source => {
						if (!data.removeSource) source = source.cloneNode(true) as Element
						used.push(source)
						firstSource.parentNode.insertBefore(source, firstSource.nextSibling) // Insert the next source after the first source
					})
			})

		return tree
	}

	function select(data: SelectTransform): void {
		trees = trees
			.map(tree => {
				const found = selectElements(tree, data.selector)
				// If the selector does not match any elements, return the original tree
				if (!found.length) return [tree]
				return found.map(wrapTree)
			})
			.reduce((prev, curr) => prev.concat(curr), [])
	}
	//###### /TRANSFORMS ######\\


	//###### EXPORTERS ######\\
	function exportAsXml(tree: Element, _xmlOptions: XmlExporterOptions): string {
		if (tree == null) return ''
		const xml = new XMLSerializer().serializeToString(tree)
		return (parserOptions.namespaces.length || !Array.from(tree.attributes).some(attr => /^xmlns/.test(attr.name))) ?
			xml.replace(/\sxmlns(:.*?)?="(.*?)"/usg, '') :
			xml
	}

	function exportAsData(tree: Element, dataOptions: DataExporterOptions): DataNode {
		function elementToDataElement(el: Node) {
			const node = el as Element
			const attributes = Array.from(node.attributes)
				.reduce((prev, curr) => {
					prev[curr.name] = node.getAttribute(curr.name)
					return prev
				}, {} as { [key: string]: string })
			return { name: node.nodeName.toLowerCase(), attributes, children: [] as any[] }
		}

		const nodeByData: Map<Element, DataNode> = new Map()

		const whatToShow = dataOptions.text ? NodeFilter.SHOW_ALL : NodeFilter.SHOW_ELEMENT
		var treeWalker = document.createTreeWalker(tree, whatToShow)
		const output = elementToDataElement(treeWalker.currentNode)
		if (!dataOptions.deep) return output
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

	function exportAsText(tree: Element, textOptions: TextExporterOptions): string {
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
	//###### /EXPORTERS ######\\


	//###### UTILS ######\\
	function addProxyAttributes(el: HTMLElement): HTMLElement {
		if (!parserOptions.handleNamespaces) return

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
					node.setAttribute(attr.name.replace(/:/usg, COLON_REPLACE), node.getAttribute(attr.name))
					proxyAttributeElements.push(node)
				}
			}

			if (node.nodeName.indexOf(':') > 0) {
				toReplace.push(node)
			}
		}
		toReplace.forEach(node => {
			const proxyElement = renameElement(node, node.nodeName.replace(/:/usg, COLON_REPLACE))
			proxyElements.set(proxyElement, node)
			replaceElement(node, proxyElement)
		})
		return el
	}

	function removeProxies(el: HTMLElement): HTMLElement {
		// Remove the proxy attributes
		proxyAttributeElements.forEach(node => {
			for (const attr of node.attributes) {
				if (attr.name.indexOf(COLON_REPLACE) > 0) {
					node.removeAttribute(attr.name)
				}
			}
		})

		// Replace the proxy elements
		Array.from(proxyElements.entries()).forEach(([proxyEl, origEl]) => {
			replaceElement(proxyEl, origEl)
		})

		return el
	}

	// To match the root node when querySelector(All) is used,
	// a wrapper node is used, because querySelector(All) only
	// searches children.
	function wrapXml(xml: string): string {
		const namespaces = parserOptions.namespaces.reduce((prev, ns) => {
			prev += ` xmlns:${ns}="http://example.com"`
			return prev
		}, '')
		return `<section${namespaces}>${xml}</section>`
	}

	// Same as wrapXml, but for a node tree. This is used after a
	// select transform, wrapXml is used when the XML string is converted
	// to a node tree. Don't seperate them, because they need to be in sync.
	function wrapTree(el: Element): Element {
		const wrapper = document.createElement('section')
		parserOptions.namespaces.forEach(ns => {
			el.setAttribute(`xmlns:${ns}`, 'http://example.com')
		})
		wrapper.appendChild(el)
		return wrapper
	}

	// Remove the wrapper node from the tree (see: wrapXml() and wrapTree())
	function unwrap(wrapper: HTMLElement): HTMLElement {
		return wrapper.firstChild as HTMLElement
	}

	// The data holds a string representation of a function (because it needs to be serializable).
	// The function is restored to a real function by using the Function constructor,
	// but because the Function constructor only takes the function body, the function created
	// by the Function constructor (outerFunc) returns the function that is needed (sourceSelectorFunc)
	function unwrapStringFunction(func: FunctionString) {
		const outerFunc = new Function(`return ${func}`)
		return outerFunc() // Return the inner function, because that is what the user passed
	}

	function createOutput(exporterOptions: Options): any[] {
		// Extend the options with default values
		if (exporterOptions == null || exporterOptions.type === 'xml') {
			exporterOptions = { type: 'xml', ...exporterOptions } as XmlExporterOptions
		}
		if (exporterOptions.type === 'data') {
			exporterOptions = { deep: true, text: true, ...exporterOptions } as DataExporterOptions
		}
		if (exporterOptions.type === 'text') {
			exporterOptions = { join: ' ', ...exporterOptions } as TextExporterOptions
		}

		const output: any[] = trees
			.map(removeProxies)
			.map(unwrap)
			.map(tree => {
				if (exporterOptions.type === 'xml') return exportAsXml(tree, exporterOptions)
				if (exporterOptions.type === 'data') return exportAsData(tree, exporterOptions)
				if (exporterOptions.type === 'text') return exportAsText(tree, exporterOptions)
			})

		if (!output.length) return null
		if (output.length === 1) return output[0]
		return output
	}

	function selectElements(el: Element, selector: string): Element[] {
		const colonIndex = selector.indexOf(':')

		if (
			colonIndex > 0 &&
			pseudos.every(pseudo => selector.slice(colonIndex, colonIndex + pseudo.length) !== pseudo)
		) {
			selector = selector.replace(/:/usg, COLON_REPLACE)
		}

		const elements = el.querySelectorAll(selector)
		return Array.from(elements)
	}

	function renameElement(el: Element, newName: string): Element {
		// Create a new element, because old.nodeName is read only
		const newEl = document.createElement(newName)

		// Transfer attributes
		Array.from(el.attributes).forEach(attr => newEl.setAttribute(attr.name, el.getAttribute(attr.name)))
		newEl.className = el.className

		// Transfer children
		let nextNode = el.firstChild as Node
		while (nextNode) {
			newEl.appendChild(nextNode.cloneNode(true))
			nextNode = nextNode.nextSibling
		}

		return newEl
	}

	function replaceElement(oldEl: Element, newEl: Element) {
		if (oldEl.parentElement == null) return
		oldEl.parentElement.replaceChild(newEl, oldEl)
	}
	//###### /UTILS ######\\

	// Create the DOMParser and create the trees array. The trees array is initialized with the parsed tree.
	// An array is used, because the select transform can create multiple trees.
	const parser = new DOMParser()
	const doc = parser.parseFromString(wrapXml(xml), 'application/xml') // Parse as HTML, otherwise selectors won't work correctly
	const preparedXml = addProxyAttributes(doc.documentElement)
	let trees: Element[] = [preparedXml]

	// Apply the transforms
	transforms.forEach((transform: Transform) => {
		if (transform.type === 'exclude') exclude(transform)
		if (transform.type === 'replace') replace(transform)
		if (transform.type === 'select') select(transform)
		if (transform.type === 'change') change(transform)
		if (transform.type === 'rename') rename(transform)
	})	

	// Export the trees as configured by the user
	return Array.isArray(options) ?
		options.map(createOutput) :
		createOutput(options)
}
