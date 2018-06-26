import { SaxTag, SaxNode } from 'xml2tree';
import { SaxTagSelector } from './types';
import { Settings, JsxSettings, HtmlSettings } from './state/setttings';
import { EmptyTag, HtmlTag, JsxTag, NodesToAdd, TargetSelectorFunc, iterateTree } from './_index';
import State from './state';
import { Stats } from './analyze';
export { EmptyTag, HtmlTag, iterateTree, JsxTag, SaxTag, SaxNode, State as XmlioState };
export declare type Value = SaxTag | SaxTag[];
interface XmlioApi {
    analyze: () => Stats;
    append: (nodesToAdd: NodesToAdd, selector: SaxTagSelector) => XmlioApi;
    prepend: (nodesToAdd: NodesToAdd, selector: SaxTagSelector) => XmlioApi;
    move: (sourceSelector: SaxTagSelector, targetSelector: SaxTagSelector) => XmlioApi;
    replace: (sourceSelector: SaxTagSelector, targetSelectorFunc: TargetSelectorFunc) => XmlioApi;
    split: (selector: SaxTagSelector) => XmlioApi;
    toHtml: (settings?: HtmlSettings) => string | string[];
    toJsx: (settings?: JsxSettings) => [string, State] | [string[], State];
    toXml: (settings?: Settings) => string | string[];
    value: () => SaxTag;
    values: () => SaxTag[];
    wrap: (selector: SaxTagSelector, parent: Partial<SaxTag>) => XmlioApi;
}
export declare function fromString(input: string): Promise<XmlioApi>;
export default function xmlioApi(tree: SaxTag | SaxTag[]): XmlioApi;
