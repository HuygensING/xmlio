import {Tag} from "sax";

export interface IBaseTag {
	state: IState;
}

export interface ICustomTag extends IBaseTag {
	close(): string;
	open(): string;
}

export type TagClasses = 'html' | 'jsx' | 'empty';

export interface IState {
	openTags;
	previousNodes;
	startFromTag: string;
	tagClass: TagClasses;
	tags;
	// ToDo make more flexibel: [{name: 'hi', rend: 'super'}]
	tagsToSkip: string[];
	usedTags: Set<string>;
	writeToOutput: boolean;
	appendHtml(str: string): void;
	[prop: string]: any;
}

export interface ISettings {
	// Path where JSX components can be found.
	componentsPath?: string;

	// When the parser encouters this tag name, the parser starts writing
	// to this.output. The tag name should be a unique tag (like <body>).
	startFromTag?: string;

	tagClass?: TagClasses;
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

