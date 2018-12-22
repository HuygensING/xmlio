/// <reference path="./default.d.ts" />
/// <reference path="./handlers.d.ts" />
/// <reference path="./exporters.d.ts" />
/// <reference path="./transformers.d.ts" />

import BrowserXmlio from './index.browser'
import NodeXmlio from './index.node'
import handlerDefaults from './handler.defaults'
import validators from './validators'

type Api = BrowserXmlio | NodeXmlio

export default abstract class BaseXmlio {
	protected transformers: XMLioTransformer[] = []

	constructor(protected xml: string, protected parserOptions?: DomParserOptions) {}

	abstract export(options?: any): any

	addTransform(transform: XMLioTransformer) {
		const validate = validators[transform.type]
		if (validate(transform)) this.transformers.push(transform)
		return this
	}

	change(selector: string, changeFunc: (target: HTMLElement) => HTMLElement): Api {
		const transformer = {
			...handlerDefaults.change,
			selector,
			changeFunc: changeFunc.toString(),
		}

		return this.addTransform(transformer)
	}

	rename(selector: string, newName: string): Api {
		const transformer = {
			...handlerDefaults.rename,
			selector,
			newName,
		}

		return this.addTransform(transformer)
	}

	exclude(selector: string | string[]): Api {
		const transformer = {
			...handlerDefaults.exclude,
			selector,
		}

		return this.addTransform(transformer)
	}

	replace(targetSelector: string, sourceSelectorFunc: (target: HTMLElement) => string, removeSource: boolean = true): Api {
		const transformer = {
			...handlerDefaults.change,
			removeSource,
			sourceSelectorFunc: sourceSelectorFunc.toString(),
			targetSelector,
		}

		return this.addTransform(transformer)
	}

	select(selector: string): Api {
		const transformer = {
			...handlerDefaults.select,
			selector,
		}

		return this.addTransform(transformer)
	}
}