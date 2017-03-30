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
}

