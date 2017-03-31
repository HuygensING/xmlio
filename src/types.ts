import {Tag} from "sax";

export interface IBaseTag {
	state: IState;
	close(): string;
	open(): string;
}

export interface IState {
	jsx: boolean;
	openTags;
	previousNodes;
	startFromTag: string;
	tags;
	tagsToSkip: string[];
	usedTags: Set<string>;
	writeToOutput: boolean;
	appendHtml(str: string): void;
	wrapOutput(): string;
	[prop: string]: any;
}

export interface ISettings {
	// Path where JSX components can be found.
	componentsPath?: string;

	// Output JSX instead of HTML.
	jsx?: boolean;

	// When the parser encouters this tag name, the parser starts writing
	// to this.output. The tag name should be a unique tag (like <body>).
	startFromTag?: string;

	// Maps a tag name (key) to a tag class (value). The tag class may extend
	// BaseTag. If a tag is not in the map, BaseTag is used to generate output.
	tags?: Object;

	// List of tag names to skip (and their children!)
	tagsToSkip?: any[];
}

export interface IPreviousNodes {
	add(node: Tag): void;
	last(): Tag;
	lastButOne(): Tag;
	lastButTwo(): Tag;
}

export interface IOpenTags {
	add(tag: IBaseTag): void;
	remove(): void;
	contains(name: string): boolean;
	containsBy(tagName: string, attributeKey: string, attributeValue: string): boolean;
	containsOneOf(tagNames: string[]): void;
	count(): number;
	countType(tagName: string): number;
	lastOfType(tagName: string): IBaseTag;
	log(): string;
}

