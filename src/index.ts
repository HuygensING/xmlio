/// <reference path="./default.d.ts" />
/// <reference path="./handlers.d.ts" />
/// <reference path="./exporters.d.ts" />
/// <reference path="./transformers.d.ts" />

import handlerDefaults from './handler.defaults'
import validators from './validators'
import { exclude, replace, select, change, rename } from './evaluator/transformers'
import { exportAsData, exportAsXml, exportAsText } from './evaluator/exporters'
import { wrapXml, unwrap } from './evaluator/utils';
import ProxyHandler from './evaluator/proxy-handler'

export { handlerDefaults }

export default class XMLio {
	private readonly root: Element
	private transformers: XMLioTransformer[] = []
	private trees: Element[] = []
	private proxyHandler: ProxyHandler

	constructor(protected xml: string, private parserOptions?: DomParserOptions) {
		this.parserOptions = { handleNamespaces: true, namespaces: [], ...parserOptions }

		this.proxyHandler = new ProxyHandler(this.parserOptions)

		// Create the DOMParser and create the trees array. The trees array is initialized with the parsed tree.
		// An array is used, because the select transform can create multiple trees.
		const parser = new DOMParser()
		const doc = parser.parseFromString(wrapXml(xml, this.parserOptions), 'application/xml')
		const root = this.proxyHandler.addProxies(doc.documentElement)
		let firstChild = root.firstChild
		while (firstChild != null && !firstChild.childNodes.length) {
			const nextChild = firstChild.nextSibling as ChildNode
			firstChild.parentNode.removeChild(firstChild)
			firstChild = nextChild
		}
		this.root = root.cloneNode(true) as Element
		this.trees = [root]
	}

	export(options: DataExporter): DataNode | DataNode[]
	export(options: TextExporter): string | string[]
	export(options: XmlExporter): string | string[]
	export(options: [DataExporter, XmlExporter]): [DataNode | DataNode[], string | string[]]
	export(options: Exporter[]): ExporterReturnValue[]
	export(): string | string[]
	export(options?: Exporter | Exporter[]): ExporterReturnValue | ExporterReturnValue[] {
		if (options == null) options = [handlerDefaults.xml]
		else {
			if (!Array.isArray(options)) options = [options]
			options = options.map(option => ({...handlerDefaults[option.type], ...option}))
		}
		this.applyTransformers()
		let output = options.map(this.createOutput)
		output = output.length === 1 ? output[0] : output

		this.reset()

		return output
	}

	private reset() {
		this.transformers = []
		this.trees = [this.root.cloneNode(true) as Element]
	}

	createOutput = (exporter: Exporter): any[] => {
		const output: any[] = this.trees
			.map((tree) => this.proxyHandler.removeProxies(tree))
			.map(unwrap)
			.map(tree => {
				if (exporter.type === 'xml') return exportAsXml(tree, exporter, this.parserOptions)
				if (exporter.type === 'data') return exportAsData(tree, exporter)
				if (exporter.type === 'text') return exportAsText(tree, exporter)
			})

		if (!output.length) return null
		return (output.length === 1) ? output[0] : output
	}

	private applyTransformers(): void {
		this.transformers.forEach((transformer: XMLioTransformer) => {
			if (transformer.type === 'exclude') this.trees = exclude(this.trees, transformer)
			if (transformer.type === 'replace') this.trees = replace(this.trees, transformer)
			if (transformer.type === 'select') this.trees = select(this.trees, transformer, this.parserOptions)
			if (transformer.type === 'change') this.trees = change(this.trees, transformer)
			if (transformer.type === 'rename') this.trees = rename(this.trees, transformer)
		})	
	}

	addTransform(transformer: XMLioTransformer) {
		// Extend transformer with default values
		transformer = {
			...handlerDefaults[transformer.type],
			...transformer,
		}

		// Validate the passed key-values
		const validate = validators[transformer.type]
		if (validate(transformer)) this.transformers.push(transformer)

		// Return this for chaining
		return this
	}

	change(selector: string, changeFunc: (target: HTMLElement) => HTMLElement): XMLio {
		return this.addTransform({
			changeFunc: changeFunc.toString(),
			selector,
			type: 'change',
		})
	}

	rename(selector: string, newName: string): XMLio {
		return this.addTransform({
			newName,
			selector,
			type: 'rename',
		})
	}

	exclude(selector: string | string[]): XMLio {
		return this.addTransform({
			selector,
			type: 'exclude',
		})
	}

	replace(targetSelector: string, sourceSelectorFunc: (target: HTMLElement) => string, removeSource: boolean = true): XMLio {
		return this.addTransform({
			removeSource,
			sourceSelectorFunc: sourceSelectorFunc.toString(),
			targetSelector,
			type: 'replace',
		})
	}

	select(selector: string): XMLio {
		return this.addTransform({
			selector,
			type: 'select',
		})
	}
}