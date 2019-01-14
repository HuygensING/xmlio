declare type TransformerType = 'rename' | 'select' | 'replace' | 'exclude' | 'change'

declare type XMLioTransformer = ChangeTransformer | ExcludeTransformer | RenameTransformer | ReplaceTransformer | SelectTransformer

declare interface RenameTransformer extends BaseHandler<TransformerType> {
	selector: string
	newName: string
	type: 'rename'
}

declare interface ReplaceTransformer extends BaseHandler<TransformerType> {
	removeSource?: boolean
	sourceSelectorFunc: (target: Element) => string | Node
	targetSelector: string
	type: 'replace'
}

declare interface SelectTransformer extends BaseHandler<TransformerType> {
	selector: string
	type: 'select'
}

declare interface ChangeTransformer extends BaseHandler<TransformerType> {
	selector: string
	changeFunc: (target: Element) => Element
	type: 'change'
}

declare interface ExcludeTransformer extends BaseHandler<TransformerType> {
	selector: string | string[]
	type: 'exclude'
}
