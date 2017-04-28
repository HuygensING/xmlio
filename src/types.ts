import {Tag as SaxTag} from "sax";
import JsxTag from "./tags/jsx";
import HtmlTag from "./tags/html";
import EmptyTag from "./tags/empty";
import XmlTag from "./tags/xml";

export interface IBaseTag {
	data: SaxTag;
	state: IState;
}

// ToDo rename ICustomTag to ITag
export interface ICustomTag extends IBaseTag {
	close(): string;
	name?(): string;
	open(): string;
}

export interface ITagSelector {
	attribute?: string;
	name: string;
	value?: string;
}

export type OutputType = 'html' | 'jsx' | 'xml' | 'json' | 'empty';
export type TagClass = typeof HtmlTag | typeof JsxTag | typeof XmlTag | typeof EmptyTag;
export interface ISettings {
	// Path where JSX components can be found.
	componentsPath?: string;

	// When the parser encouters this tag, the parser starts writing
	// to this.output. The tag should be unique (like <body> or <div type="unique-type" />),
	// if the tag is not unique, the first encountered will be used.
	// ToDo is this correct? Prob all parents will be parsed
	parent?: ITagSelector;

	outputType?: OutputType;

	// Maps a tag name (key) to a tag class (value). The tag class may extend
	// BaseTag. If a tag is not in the map, BaseTag is used to generate output.
	getComponent?(node: SaxTag): TagClass;

	// List of tags to skip (and their children!)
	ignore?: ITagSelector[];

	state?: {
		[prop: string]: any,
	}

	// Called on all text nodes.
	transformTextNode?: (text: string) => string;
}

export interface IState {
	appendHtml(str: string): void;
	custom: {
		[prop: string]: any
	};
	GenericTag: TagClass;
	openTags: IOpenTags;
	output: string;
	previousNodes: IPreviousNodes;
	settings: ISettings;
	usedTags: Set<string>;
	writeToOutput: boolean;
}

export interface IPreviousNodes {
	add(node: SaxTag): void;
	last(): SaxTag;
	lastButOne(): SaxTag;
	lastButTwo(): SaxTag;
}

export interface IOpenTags {
	add(tag: ICustomTag): void;
	remove(): ICustomTag;
	contains(name: string): boolean;
	containsBy(selector: ITagSelector): boolean;
	containsOneOf(selectors: ITagSelector[]): void;
	count(): number;
	countType(tagName: string): number;
	lastOfType(tagName: string): ICustomTag;
	log(): string;
}

