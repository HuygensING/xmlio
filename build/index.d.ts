import State, { CustomState } from "./state";
import { SettingsConfig } from './state/setttings';
import { TagNode } from 'sax2tree';
import { SaxTagSelector } from "./types";
import XmlTag from './tags/xml';
import EmptyTag from './tags/empty';
import HtmlTag from "./tags/html";
import JsxTag from "./tags/jsx";
export { EmptyTag, TagNode, XmlTag, HtmlTag, JsxTag };
export interface ReturnType {
    result: string | string[] | Object;
    state: State;
}
export default function xml2html(xml: string, settings?: SettingsConfig): Promise<[string[], CustomState]>;
export declare function iterateTree<T>(node: TagNode, func: (node: TagNode) => T): T;
export declare const fromTree: (node: TagNode, state: State) => string;
export declare const treeToString: (tree: TagNode, settings: SettingsConfig) => string;
export declare const filterFromTree: (node: TagNode, selector: SaxTagSelector) => TagNode[];
export declare const removeFromTree: (tree: TagNode, selector: SaxTagSelector) => [TagNode, TagNode[]];
export declare const addToTree: (tree: TagNode, nodes: (string | TagNode)[], selector: SaxTagSelector) => {
    children?: (string | TagNode)[];
    id: string;
    parent: {
        name: string;
        attributes: any;
    };
    attributes: {
        [key: string]: string;
    };
    name: string;
    isSelfClosing: boolean;
};
export declare const moveNode: (tree: TagNode, moveSetting: {
    selector: SaxTagSelector;
    parentSelector: SaxTagSelector;
}) => TagNode;
export declare const replaceNode: (tree: TagNode, sourceNode: TagNode, targetSelector: SaxTagSelector) => TagNode;
export declare const replaceNodes: (tree: TagNode, sourceSelector: SaxTagSelector, targetSelectorFunc: (n: TagNode) => SaxTagSelector) => TagNode;
