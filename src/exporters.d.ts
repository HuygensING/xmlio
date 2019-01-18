declare type ExporterType = 'data' | 'jsx' | 'html' | 'text' | 'xml' | 'dom'

declare type Exporter = DataExporter | TextExporter | XmlExporter | DomExporter

declare interface DataExporter extends BaseHandler<ExporterType> {
	type: 'data'
	deep?: boolean
	text?: boolean
}

declare interface TextExporter extends BaseHandler<ExporterType> {
	type: 'text'
	join?: string
}

declare interface XmlExporter extends BaseHandler<ExporterType> {
	type: 'xml'
}

declare interface DomExporter extends BaseHandler<ExporterType> {
	type: 'dom'
}
