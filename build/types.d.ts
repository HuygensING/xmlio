import { Tag as SaxTag } from "sax";
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
export declare type TagClassNames = 'html' | 'jsx' | 'empty';
export declare type TagClass = typeof HtmlTag | typeof JsxTag | typeof EmptyTag;
export interface ISettings {
    componentsPath?: string;
    parent?: {
        attribute?: string;
        tag: string;
        value?: string;
    };
    tagClass?: TagClassNames;
    getComponent?(node: SaxTag): TagClass;
    tagsToSkip?: any[];
    transformTextNode?: (text: string) => string;
}
export interface IState {
    appendHtml(str: string): void;
    custom: {
        [prop: string]: any;
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
