/// <reference path="./default.d.ts" />
/// <reference path="./handlers.d.ts" />
/// <reference path="./exporters.d.ts" />
/// <reference path="./transformers.d.ts" />

import handlerDefaults from './handler.defaults'
import validators from './validators'
import evaluator from './evaluator'

export { handlerDefaults }

export default class XMLio {
	protected transformers: XMLioTransformer[] = []

	constructor(protected xml: string, protected parserOptions?: DomParserOptions) {}

	export(options: DataExporter): DataNode | DataNode[]
	export(options: TextExporter): string | string[]
	export(options: XmlExporter): string | string[]
	export(options: [DataExporter, XmlExporter]): [DataNode | DataNode[], string | string[]]
	export(options: Exporter[]): ExporterReturnValue[]
	export(): string | string[]
	export(options?: Exporter | Exporter[]): ExporterReturnValue | ExporterReturnValue[] {
		if (options == null) options = handlerDefaults.xml
		else if (Array.isArray(options)) options = options.map(option => ({...handlerDefaults[option.type], ...option}))
		else options = {...handlerDefaults[options.type], ...options}

		return evaluator(
			this.xml,
			this.transformers,
			this.parserOptions,
			options
		)
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