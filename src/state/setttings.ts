import { SaxTag } from 'xml2tree'
import State from './index'
import HtmlTag from '../tags/html'
import JsxTag from '../tags/jsx'
import XmlTag from '../tags/xml'
import StringTag from '../tags/string'
import { SaxTagSelector } from "../types"

export type OutputType = 'html' | 'jsx' | 'xml' | 'string'
export type TagType = typeof HtmlTag | typeof JsxTag | typeof XmlTag | typeof StringTag
export type TagInstance = HtmlTag | JsxTag | XmlTag | StringTag

export type Convertor = (str: string) => string
export interface RenameConfig {
	to: string | Convertor
	selector?: SaxTagSelector
	type: 'name' | 'attribute' | 'value'
}

export class Settings {
	customState?: {
		[key: string]: any
	} = null

	genericTag?: TagType = XmlTag

	ignore?: SaxTagSelector[] = []

	move?: {
		selector: SaxTagSelector
		parentSelector: SaxTagSelector
	} = null

	outputType?: OutputType = 'xml'

	parent?: SaxTagSelector = null

	wrapNodes?: {
		selector: SaxTagSelector
		parent: Partial<SaxTag>
	} = null

	constructor(config: Settings) {
		for (const property in config) {
			(this as any)[property] = (config as any)[property]
		}
	}

	// Maps a tag name (key) to a tag class (value). The tag class may extend
	// BaseTag. If a tag is not in the map, BaseTag is used to generate output.
	getComponent?(node: SaxTag): TagType {
		return this.genericTag
	}

	// Called on all nodes to transform a node (change the name, add an attribute, etc)
	transformNode?(node: SaxTag): SaxTag {
		return node
	}

	// Called on all text nodes to transform the text
	transformTextNode?(text: string, state: State): string {
		return text
	}
}

export class JsxSettings extends Settings {
	bare?: boolean = false
	componentPath?: string = './components'
	export?: string = 'export default'
	genericTag?: TagType = JsxTag
	outputType?: OutputType = 'jsx'
	passProps?: boolean = false

	constructor(config: JsxSettings) {
		super(config)

		for (const property in config) {
			(this as any)[property] = (config as any)[property]
		}
	}
}

export class HtmlSettings extends Settings {
	genericTag?: TagType = HtmlTag
	outputType?: OutputType = 'html'

	constructor(config: HtmlSettings) {
		super(config)

		for (const property in config) {
			(this as any)[property] = (config as any)[property]
		}
	}
}

export class StringSettings extends Settings {
	genericTag?: TagType = StringTag
	outputType?: OutputType = 'string'
	join?: string = ''

	constructor(config: StringSettings) {
		super(config)

		for (const property in config) {
			(this as any)[property] = (config as any)[property]
		}
	}
}
export default Settings
