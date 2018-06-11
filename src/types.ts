
// export interface IBaseTag {
// 	data: SaxTag;
// 	state: IState;
// }

// ToDo rename ICustomTag to ITag
export interface ICustomTag {
}

export interface SaxTagSelector {
	// attribute?: string;
	name?: string;
	// value?: string;
	attributes?: {
		[key: string]: string
	}
	notAttributes?: {
		[key: string]: string
	}
}
// export interface IState {
// 	appendHtml(str: string): void;
// 	custom: {
// 		[prop: string]: any
// 	};GenericTag
// 	GenericTag: TagClass;
// 	openTags: IOpenTags;
// 	output: string;
// 	previousNodes: IPreviousNodes;
// 	settings: ISettings;
// 	usedTags: Set<string>;
// 	writeToOutput: boolean;
// }

// export interface IOpenTags {
// 	add(tag: ICustomTag): void;
// 	remove(): ICustomTag;
// 	contains(name: string): boolean;
// 	containsBy(selector: ITagSelector): boolean;
// 	containsOneOf(selectors: ITagSelector[]): void;
// 	count(): number;
// 	countType(tagName: string): number;
// 	lastOfType(tagName: string): ICustomTag;
// 	log(): string;
// }

