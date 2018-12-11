import { SaxTag, SaxNode, XMLToTreeOptions } from 'xml2tree';
import { SaxTagSelector } from './types';
import { Settings, JsxSettings, HtmlSettings, StringSettings } from './state/setttings';
import { HtmlTag, JsxTag, NodesToAdd, SourceSelectorFunc, StringTag, iterateTree } from './_index';
import State from './state';
import { Stats } from './analyze';
import { JSON_PREFIX } from './tags/jsx';
declare type Value = SaxTag | SaxTag[];
interface XmlioApi {
    analyze: () => Stats;
    append: (nodesToAdd: NodesToAdd, selector: SaxTagSelector) => XmlioApi;
    prepend: (nodesToAdd: NodesToAdd, selector: SaxTagSelector) => XmlioApi;
    move: (sourceSelector: SaxTagSelector, targetSelector: SaxTagSelector, append?: boolean) => XmlioApi;
    replace: (sourceSelector: SaxTagSelector, targetSelectorFunc: SourceSelectorFunc, removeSourceNode?: boolean) => XmlioApi;
    split: (selector: SaxTagSelector) => XmlioApi;
    toHtml: (settings?: HtmlSettings) => string | string[];
    toJsx: (settings?: JsxSettings) => [string, State] | [string[], State];
    toString: (settings?: StringSettings) => string | string[];
    toXml: (settings?: Settings) => string | string[];
    transformNode: (func: (node: SaxNode) => SaxNode) => XmlioApi;
    value: () => SaxTag;
    values: () => SaxTag[];
    wrap: (selector: SaxTagSelector, parent: Partial<SaxTag>) => XmlioApi;
}
declare function xmlToTree(input: string, options?: XMLToTreeOptions): Promise<SaxTag>;
export { HtmlTag, JSON_PREFIX, JsxTag, JsxSettings, SaxNode, SaxTag, State as XmlioState, StringTag, XmlioApi, xmlToTree, iterateTree, };
export default function xmlioApi(tree: Value): XmlioApi;
