import State from "./state";
import { SaxTag, SaxNode } from 'xml2tree';
import { SaxTagSelector } from "./types";
import XmlTag from './tags/xml';
import StringTag from './tags/string';
import HtmlTag from "./tags/html";
import JsxTag from "./tags/jsx";
export { StringTag, SaxTag, XmlTag, HtmlTag, JsxTag };
export declare const cloneNode: (node: SaxTag) => SaxTag;
export interface ReturnType {
    result: string | string[] | Object;
    state: State;
}
export declare function iterateTree<T>(node: SaxTag, func: (node: SaxNode) => T): any;
export declare function iterateTreePure<T>(node: SaxTag, func: (node: SaxNode) => T): any;
export declare const fromTree: (node: SaxTag, state: State) => string;
export declare const filterFromTree: (node: SaxTag, selector: SaxTagSelector) => SaxTag[];
export declare const removeFromTree: (tree: SaxTag, selector: SaxTagSelector) => [SaxTag, SaxTag[]];
export declare type PartialSaxNode = Partial<SaxTag> | string;
export declare type NodesToAdd = PartialSaxNode | PartialSaxNode[];
export declare const addToTree: (tree: SaxTag, nodesToAdd: NodesToAdd, parent: SaxTagSelector, append?: boolean) => any;
export declare const moveNode: (tree: SaxTag, selector: SaxTagSelector, parentSelector: SaxTagSelector, append?: boolean) => any;
export declare type SourceSelectorFunc = (targetNode: SaxTag) => SaxTagSelector;
export declare const replaceNodes: (tree: SaxTag, targetSelector: SaxTagSelector, sourceSelectorFunc: SourceSelectorFunc, removeSourceNode?: boolean) => SaxTag;
export declare const wrapNodes: (tree: SaxTag, selector: SaxTagSelector, parent: Partial<SaxTag>) => any;
