/// <reference path="./default.d.ts" />
/// <reference path="./handlers.d.ts" />
/// <reference path="./exporters.d.ts" />
/// <reference path="./transformers.d.ts" />

import handlerDefaults from './handler.defaults'
import validators from './validators'
import { exclude, replace, change } from './evaluator/transformers'
import { exportAsData, exportAsXml, exportAsText, exportAsDOM } from './evaluator/exporters'
import { unwrap, selectElements, renameElement, replaceElement, wrapTree } from './evaluator/utils'
import ProxyHandler from './evaluator/proxy-handler'

export { handlerDefaults }

export default class XMLio {
	private root: Element[]
	private transformers: XMLioTransformer[] = []
	private trees: Element[] = []
	private proxyHandler: ProxyHandler

	constructor(private doc: XMLDocument, private parserOptions?: DomParserOptions) {
		this.parserOptions = { handleNamespaces: true, namespaces: [], ...parserOptions }

		this.proxyHandler = new ProxyHandler(doc, this.parserOptions)

		let root = doc.createElement('root') as Element
		root.appendChild(doc.documentElement)
		root = this.proxyHandler.addProxies(root)
		this.root = [root.cloneNode(true) as Element]
		this.trees = [root]
	}

	export(options: DataExporter): DataNode | DataNode[]
	export(options: TextExporter): string | string[]
	export(options: XmlExporter): string | string[]
	export(options: DomExporter): Element | Element[]
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

	persist(): XMLio {
		this.applyTransformers()
		this.root = this.trees.map(tree => tree.cloneNode(true) as Element)
		this.reset()
		return this
	}

	private reset() {
		this.transformers = []
		this.trees = this.root.map(el => el.cloneNode(true) as Element)
	}

	private createOutput = (exporter: Exporter): any[] => {
		const output: any[] = this.trees
			.map((tree) => this.proxyHandler.removeProxies(tree))
			.map(unwrap)
			.map(tree => {
				if (exporter.type === 'xml') return exportAsXml(tree, exporter, this.parserOptions)
				if (exporter.type === 'data') return exportAsData(tree, exporter)
				if (exporter.type === 'text') return exportAsText(tree, exporter)
				if (exporter.type === 'dom') return exportAsDOM(tree, exporter)
			})

		if (!output.length) return null
		return (output.length === 1) ? output[0] : output
	}

	private renameTransformer(trees: Element[], data: RenameTransformer): Element[] {
		return trees.map(tree => {
			const oldEls = selectElements(tree, data.selector)
			oldEls.forEach(oldEl => {
				const newEl = renameElement(this.doc, oldEl, data.newName)
				replaceElement(oldEl, newEl)
			})
			return tree
		})
	}

	private selectTransformer(trees: Element[], data: SelectTransformer, parserOptions: DomParserOptions): Element[] {
		return trees
			.map(tree => {
				const found = selectElements(tree, data.selector)
				// If the selector does not match any elements, return the original tree
				// if (!found.length) return [tree]
				return found.map(wrapTree(this.doc, parserOptions))
			})
			.reduce((prev, curr) => prev.concat(curr), [])
	}

	private applyTransformers(): void {
		this.transformers.forEach((transformer: XMLioTransformer) => {
			if (transformer.type === 'exclude') this.trees = exclude(this.trees, transformer)
			if (transformer.type === 'replace') this.trees = replace(this.trees, transformer)
			if (transformer.type === 'select') this.trees = this.selectTransformer(this.trees, transformer, this.parserOptions)
			if (transformer.type === 'change') this.trees = change(this.trees, transformer)
			if (transformer.type === 'rename') this.trees = this.renameTransformer(this.trees, transformer)
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
			changeFunc,
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
			sourceSelectorFunc,
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