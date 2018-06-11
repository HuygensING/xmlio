import {Tag as SaxTag} from "sax"
import HtmlTag from '../tags/html'
import JsxTag from '../tags/jsx'
import XmlTag from '../tags/xml'
import EmptyTag from '../tags/empty'
import { SaxTagSelector } from "../types";
import { TagNode } from "../index";

export type OutputType = 'html' | 'jsx' | 'xml' | 'empty'
export type TagType = typeof HtmlTag | typeof JsxTag | typeof XmlTag | typeof EmptyTag
export type TagInstance = HtmlTag | JsxTag | XmlTag | EmptyTag

export type Convertor = (str: string) => string
export interface RenameConfig {
	to: string | Convertor
	selector?: SaxTagSelector
	type: 'name' | 'attribute' | 'value'
}

export class SettingsConfig {
	componentPath?: string
	customState?: {
		[key: string]: any
	}
	genericTag?: TagType
	ignore?: SaxTagSelector[]
	move?: {
		selector: SaxTagSelector
		parentSelector: SaxTagSelector
	}
	outputType?: OutputType
	parent?: SaxTagSelector
	passProps?: boolean
	wrapNodes?: {
		selector: SaxTagSelector
		parent: Partial<TagNode>
	}

	constructor(config: SettingsConfig) {
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
	transformNode?(node: TagNode): TagNode {
		return node
	} 

	// Called on all text nodes to transform the text
	transformTextNode?(text: string): string {
		return text
	}
}

const defaultConfig: SettingsConfig = {
	componentPath: './components',
	customState: null,
	genericTag: XmlTag,
	ignore: [],
	move: null,
	outputType: 'xml',
	parent: null,
	passProps: false,
	wrapNodes: null
}

class Settings extends SettingsConfig {
	constructor(config: SettingsConfig) {
		super({ ...defaultConfig, ...config })
		this.setTag()
	}

	private setTag() {
		switch (this.outputType) {
			case 'html':
				this.genericTag = HtmlTag	
				break

			case 'jsx':
				this.genericTag = JsxTag	
				break

			case 'empty':
				this.genericTag = EmptyTag
				break

			// Case 'xml' and 'json' default to XmlTag
			default:
				this.genericTag = XmlTag
				break;
		}
	}
}

export default Settings
