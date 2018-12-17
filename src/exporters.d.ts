declare type Exporter = 'data' | 'jsx' | 'html' | 'text' | 'xml'

declare type Options = DataExporterOptions | TextExporterOptions | XmlExporterOptions

declare interface BaseOptions {
	type: Exporter
}

declare interface DataExporterOptions {
	type: 'data'
	deep?: boolean
	text?: boolean
}

declare interface TextExporterOptions {
	type: 'text'
	join?: string
}

declare interface XmlExporterOptions {
	type: 'xml'
}

declare interface DataNode {
	name: string
	attributes: { [key: string]: string }
	children: DataNode[]
}

declare type ExporterReturnValue = DataNode | DataNode[] | string | string[]
