import xml2tree, { SaxTag } from 'xml2tree'
import { SaxTagSelector } from './types'
import { castArray } from './utils'
import { SettingsConfig } from './state/setttings'
import { fromTree, wrapNodes, filterFromTree, NodesToAdd, addToTree, JsxTag, TargetSelectorFunc, replaceNodes, moveNode } from './_index';
import State from './state';
import analyzer, { Stats } from './analyze'

export { JsxTag, SaxTag }

export type Value = SaxTag | SaxTag[]
interface XmlioApi {
	analyze: () => Stats
	append: (nodesToAdd: NodesToAdd, selector: SaxTagSelector) => XmlioApi
	prepend: (nodesToAdd: NodesToAdd, selector: SaxTagSelector) => XmlioApi
	move: (sourceSelector: SaxTagSelector, targetSelector: SaxTagSelector) => XmlioApi
	replace: (sourceSelector: SaxTagSelector, targetSelectorFunc: TargetSelectorFunc) => XmlioApi
	split: (selector: SaxTagSelector) => XmlioApi
	toHtml: (settings?: SettingsConfig) => string | string[]
	toJsx: (settings?: SettingsConfig) => string | string[]
	toXml: (settings?: SettingsConfig) => string | string[]
	value: () => SaxTag
	values: () => SaxTag[]
	wrap: (selector: SaxTagSelector, parent: Partial<SaxTag>) => XmlioApi
}

export async function fromString(input: string): Promise<XmlioApi> {
	const tree = await xml2tree(input)
	return xmlioApi(tree)
}

export default function xmlioApi(tree: SaxTag): XmlioApi {
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
			if (Array.isArray(_value) && _value.length !== 1) {
				if (_value.length > 1) console.error('Cannot split splitted tree')
				return this
			}

			if (Array.isArray(_value)) _value = _value[0]

			_value = filterFromTree(_value, selector)

			return this
		},
		toHtml: function toHtml(settings: SettingsConfig = {}): string | string[] {
			settings = { ...settings, outputType: 'html' }
			const html = castArray(_value).map(v => fromTree(v, new State(settings)))
			if (html.length === 1) return html[0]
			return html
		},
		toJsx: function toJsx(settings: SettingsConfig = {}): string | string[] {
			settings = { ...settings, outputType: 'jsx' }
			const jsx = castArray(_value).map(v => fromTree(v, new State(settings)))
			if (jsx.length === 1) return jsx[0]
			return jsx
		},
		toXml: function toXml(settings: SettingsConfig = {}): string | string[] {
			settings = { ...settings, outputType: 'xml' }
			const xml = castArray(_value).map(v => fromTree(v, new State(settings)))
			if (xml.length === 1) return xml[0]
			return xml
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