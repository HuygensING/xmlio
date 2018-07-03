import xml2tree, { SaxTag, SaxNode, XMLToTreeOptions } from 'xml2tree'
import { SaxTagSelector } from './types'
import { castArray } from './utils'
import { Settings, JsxSettings, HtmlSettings, StringSettings } from './state/setttings'
import {
	StringTag,
	HtmlTag,
	JsxTag,
	NodesToAdd,
	TargetSelectorFunc,
	addToTree,
	filterFromTree,
	fromTree,
	iterateTree,
	moveNode,
	replaceNodes,
	wrapNodes,
} from './_index';
import State from './state';
import analyzer, { Stats } from './analyze'

type Value = SaxTag | SaxTag[]
interface XmlioApi {
	analyze: () => Stats
	append: (nodesToAdd: NodesToAdd, selector: SaxTagSelector) => XmlioApi
	prepend: (nodesToAdd: NodesToAdd, selector: SaxTagSelector) => XmlioApi
	move: (sourceSelector: SaxTagSelector, targetSelector: SaxTagSelector) => XmlioApi
	replace: (sourceSelector: SaxTagSelector, targetSelectorFunc: TargetSelectorFunc) => XmlioApi
	split: (selector: SaxTagSelector) => XmlioApi
	toHtml: (settings?: HtmlSettings) => string | string[]
	toJsx: (settings?: JsxSettings) => [string, State] | [string[], State]
	toString: (settings?: StringSettings) => string | string[]
	toXml: (settings?: Settings) => string | string[]
	transformNode: (func: (node: SaxNode) => SaxNode) => XmlioApi
	value: () => SaxTag
	values: () => SaxTag[]
	wrap: (selector: SaxTagSelector, parent: Partial<SaxTag>) => XmlioApi
}

async function xmlToTree(input: string, options?: XMLToTreeOptions): Promise<SaxTag> {
	return await xml2tree(input, options)
}

export {
	HtmlTag,
	JsxTag,
	SaxNode,
	SaxTag,
	State as XmlioState,
	StringTag,
	XmlioApi,
	xmlToTree,
	iterateTree,
}

export default function xmlioApi(tree: Value): XmlioApi {
	let _value: Value = tree

	return {
		analyze: function analyze() {
			return analyzer(castArray(_value))
		},
		append: function append(nodesToAdd: NodesToAdd, parent: SaxTagSelector) {
			_value = castArray(_value).map(v => addToTree(v, nodesToAdd, parent))
			return this
		},
		move: function move(sourceSelector: SaxTagSelector, targetSelector: SaxTagSelector, append?: boolean) {
			_value = castArray(_value).map(v => moveNode(v, sourceSelector, targetSelector, append))
			return this
		},
		prepend: function prepend(nodesToAdd: NodesToAdd, parent: SaxTagSelector) {
			_value = castArray(_value).map(v => addToTree(v, nodesToAdd, parent, false))
			return this
		},
		replace: function replace(sourceSelector: SaxTagSelector, targetSelectorFunc: TargetSelectorFunc) {
			_value = castArray(_value).map(v => replaceNodes(v, sourceSelector, targetSelectorFunc))
			return this
		},
		split: function split(selector: SaxTagSelector): XmlioApi {
			_value = castArray(_value)
				.map(v => filterFromTree(v, selector))
				.reduce((prev, curr) => prev.concat(curr), [])
			return this
		},
		toHtml: function toHtml(settings: HtmlSettings): string | string[] {
			settings = new HtmlSettings(settings)
			const html = castArray(_value).map(v => fromTree(v, new State(settings)))
			if (html.length === 1) return html[0]
			return html
		},
		toJsx: function toJsx(settings: JsxSettings): [string, State] | [string[], State] {
			settings = new JsxSettings(settings)
			const state = new State(settings)
			const jsx = castArray(_value).map(v => {
				let str = fromTree(v, state)
				if (settings.bare) return str

				const props = settings.passProps ? 'props' : ''
				return [
					`import * as React from 'react'`,
					`import {${[...state.usedTags].join(', ')}} from '${settings.componentPath}'`,
					`${settings.export} (${props}) => ${str}`
				].join('\n')
			})
			return (jsx.length === 1) ? [jsx[0], state] : [jsx, state]
		},
		toString: function toString(settings: StringSettings): string | string[] {
			settings = new StringSettings(settings)
			const strArr = castArray(_value).map(v => {
				let str = fromTree(v, new State(settings))

				const joinIndex = str.length - settings.join.length
				if (str.slice(joinIndex) === settings.join) {
					str = str.slice(0, joinIndex)
				}

				return str
			})

			if (!strArr.length) return ''
			if (strArr.length === 1) return strArr[0]
			return strArr
		},
		toXml: function toXml(settings: Settings): string | string[] {
			settings = new Settings(settings)
			const xml = castArray(_value).map(v => fromTree(v, new State(settings)))
			if (xml.length === 1) return xml[0]
			return xml
		},
		transformNode: function transformNode(func: (node: SaxNode) => SaxNode): XmlioApi {
			_value = castArray(_value).map((node) => iterateTree(node, func))
			return this
		},
		value: function value(): SaxTag {
			if (Array.isArray(_value)) {
				if (_value.length === 1) return _value[0]
				else console.error('Cannot return a value from an array with size > 1')
			} else {
				return _value
			}
		},
		values: function values(): SaxTag[] {
			if (!Array.isArray(_value)) return [_value]
			return _value
		},
		wrap: function wrap(selector: SaxTagSelector, parent: Partial<SaxTag>): XmlioApi {
			_value = castArray(_value).map(v => wrapNodes(v, selector, parent))
			return this
		}
	}
}
