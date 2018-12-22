import BaseXmlio from './index.base'
import evaluator from './evaluator'
import handlerDefaults from './handler.defaults'

export { handlerDefaults }

export default class Xmlio extends BaseXmlio {
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
}