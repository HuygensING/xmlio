// A function string is a function as a string
// (target: HTMLElement) => string
declare type FunctionString = string

declare type TransformType = 'rename' | 'select' | 'replace' | 'exclude' | 'change'

declare type Transform = ChangeTransform | ExcludeTransform | RenameTransform | ReplaceTransform | SelectTransform

declare interface BaseTransform {
	type: TransformType
}

declare interface RenameTransform extends BaseTransform {
	selector: string
	newName: string
	type: 'rename'
}

declare interface ReplaceTransform extends BaseTransform {
	removeSource?: boolean
	sourceSelectorFunc: string // (target: HTMLElement) => string 
	targetSelector: string
	type: 'replace'
}

declare interface SelectTransform extends BaseTransform {
	selector: string
	type: 'select'
}

declare interface ChangeTransform extends BaseTransform {
	selector: string
	changeFunc: string // (target: HTMLElement) => HTMLElement
	type: 'change'
}

declare interface ExcludeTransform extends BaseTransform {
	selector: string | string[]
	type: 'exclude'
}
