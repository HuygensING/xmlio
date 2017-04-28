import { Tag as SaxTag } from "sax";
import JsxTag from "./tags/jsx";
import HtmlTag from "./tags/html";
import EmptyTag from "./tags/empty";
import XmlTag from "./tags/xml";
export interface IBaseTag {
    data: SaxTag;
    state: IState;
}
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
export declare type OutputType = 'html' | 'jsx' | 'xml' | 'json' | 'empty';
export declare type TagClass = typeof HtmlTag | typeof JsxTag | typeof XmlTag | typeof EmptyTag;
export interface ISettings {
    componentsPath?: string;
    parent?: ITagSelector;
    outputType?: OutputType;
    getComponent?(node: SaxTag): TagClass;
    ignore?: ITagSelector[];
    state?: {
        [prop: string]: any;
    };
    transformTextNode?: (text: string) => string;
}
export interface IState {
    appendHtml(str: string): void;
    custom: {
        [prop: string]: any;
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
