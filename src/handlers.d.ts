declare interface HandlerDefaults {
	change: ChangeTransformer
	exclude: ExcludeTransformer
	rename: RenameTransformer
	replace: ReplaceTransformer
	select: SelectTransformer
	xml: XmlExporter
	data: DataExporter
	text: TextExporter
} 

declare type HandlerType = TransformerType | ExporterType

declare type Handler = Exporter | XMLioTransformer

declare interface BaseHandler<T> {
	active: boolean
	type: T
}