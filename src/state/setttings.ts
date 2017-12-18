import {Tag as SaxTag} from "sax"
import State from './index'
import HtmlTag from '../tags/html'
import JsxTag from '../tags/jsx'
import XmlTag from '../tags/xml'
import EmptyTag from '../tags/empty'
import { SaxTagSelector } from "../types";

export type OutputType = 'html' | 'jsx' | 'xml' | 'json' | 'empty'
export type TagType = typeof HtmlTag | typeof JsxTag | typeof XmlTag | typeof EmptyTag
export type TagInstance = HtmlTag | JsxTag | XmlTag | EmptyTag

class Settings {
	// Path where JSX components can be found.
	public componentsPath: string = 'components'

	// When the parser encouters this tag, the parser starts writing
	// to this.output. The tag should be unique (like <body> or <div type="unique-type" />),
	// if the tag is not unique, the first encountered will be used.
	// ToDo is this correct? Prob all parents will be parsed
	public parent: SaxTagSelector

	public outputType: OutputType = 'xml'

	// List of tags to skip (and their children!)
	public ignore: SaxTag[] = []

	public splitOn: SaxTagSelector

	public state: Partial<State>

	public genericTag: TagType = XmlTag

	public writeToOutput: boolean = false

	constructor(fields: Partial<Settings>) {
		Object.assign(this, fields)	
		// if (this.splitOn != null && this.parent == null) this.parent = this.splitOn
		if (this.parent == null && this.splitOn == null) this.writeToOutput = true
		this.setTag()
	}

	// Maps a tag name (key) to a tag class (value). The tag class may extend
	// BaseTag. If a tag is not in the map, BaseTag is used to generate output.
	public getComponent = (node: SaxTag): TagType => {
		return this.genericTag
	}

	// Called on all text nodes.
	public transformTextNode(text: string): string {
		return text
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
