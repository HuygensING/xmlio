import { Tag } from "sax";
export interface IBaseTag {
    state: IState;
    close(): string;
    open(): string;
}
export interface IState {
    jsx: boolean;
    openTags: any;
    previousNodes: any;
    startFromTag: string;
    tags: any;
    tagsToSkip: string[];
    usedTags: Set<string>;
    writeToOutput: boolean;
    appendHtml(str: string): void;
    wrapOutput(): string;
    [prop: string]: any;
}
export interface ISettings {
    componentsPath?: string;
    jsx?: boolean;
    startFromTag?: string;
    tags?: Object;
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
