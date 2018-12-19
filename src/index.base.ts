/// <reference path="./default.d.ts" />
/// <reference path="./exporters.d.ts" />
/// <reference path="./actions.d.ts" />

import BrowserXmlio from './index.browser'
import NodeXmlio from './index.browser'
type Api = BrowserXmlio | NodeXmlio

export default abstract class BaseXmlio {
	protected transforms: Transform[] = []

	constructor(protected xml: string, protected parserOptions?: DomParserOptions) {}

	abstract export(options?: any): any

	addTransform(transform: Transform) {
		this.transforms.push(transform)
		return this
	}

	change(selector: string, changeFunc: (target: HTMLElement) => HTMLElement): Api {
		this.transforms.push({
			selector,
			changeFunc: changeFunc.toString(),
			type: 'change',
		})
		return this
	}

	rename(selector: string, newName: string): Api {
		this.transforms.push({
			selector,
			newName,
			type: 'rename',
		})
		return this
	}

	exclude(selector: string | string[]): Api {
		this.transforms.push({
			selector,
			type: 'exclude'
		})
		return this
	}

	replace(targetSelector: string, sourceSelectorFunc: (target: HTMLElement) => string, removeSource: boolean = true): Api {
		this.transforms.push({
			removeSource,
			sourceSelectorFunc: sourceSelectorFunc.toString(),
			targetSelector,
			type: 'replace',
		})	
		return this
	}

	select(selector: string): Api {
		this.transforms.push({
			selector,
			type: 'select',
		})
		return this
	}
}