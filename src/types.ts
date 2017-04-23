import {Tag as SaxTag} from "sax";
import JsxTag from "./tags/jsx";
import HtmlTag from "./tags/html";
import EmptyTag from "./tags/empty";

export interface IBaseTag {
	data: SaxTag;
	state: IState;
}

export interface ICustomTag extends IBaseTag {
	close(): string;
	open(): string;
}

export type TagClassNames = 'html' | 'jsx' | 'empty';
export type TagClass = typeof HtmlTag | typeof JsxTag | typeof EmptyTag;
export interface ISettings {
	// Path where JSX components can be found.
	componentsPath?: string;

	// When the parser encouters this tag name, the parser starts writing
	// to this.output. The tag name should be a unique tag (like <body>).
	parent?: {
		attribute?: string;
		tag: string;
		value?: string;
	};

	tagClass?: TagClassNames;

	// Maps a tag name (key) to a tag class (value). The tag class may extend
	// BaseTag. If a tag is not in the map, BaseTag is used to generate output.
	getComponent?(node: SaxTag): TagClass;

	// List of tag names to skip (and their children!)
	// ToDo make more flexibel: [{name: 'hi', rend: 'super'}]
	tagsToSkip?: any[];

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
	containsBy(tagName: string, attributeKey: string, attributeValue: string): boolean;
	containsOneOf(tagNames: string[]): void;
	count(): number;
	countType(tagName: string): number;
	lastOfType(tagName: string): IBaseTag;
	log(): string;
}

