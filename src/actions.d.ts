// A function string is a function as a string
// (target: HTMLElement) => string
declare type FunctionString = string

declare type Transform = ChangeTransform | ExcludeTransform | RenameTransform | ReplaceTransform | SelectTransform

declare interface BaseTransform {
	type: string
}

declare interface RenameTransform extends BaseTransform {
	selector: string
	newName: string
	type: 'rename'
}

declare interface ReplaceTransform extends BaseTransform {
	removeSource: boolean
	sourceSelectorFunc: FunctionString 
	targetSelector: string
	type: 'replace'
}

declare interface SelectTransform extends BaseTransform {
	selector: string
	type: 'select'
}

declare interface ChangeTransform extends BaseTransform {
	selector: string
	changeFunc: FunctionString
	type: 'change'
}

declare interface ExcludeTransform extends BaseTransform {
	selector: string | string[]
	type: 'exclude'
}
