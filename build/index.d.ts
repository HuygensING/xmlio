import { SaxTag, SaxNode } from 'xml2tree';
import { SaxTagSelector } from './types';
import { SettingsConfig } from './state/setttings';
import { JsxTag, NodesToAdd, TargetSelectorFunc, iterateTree } from './_index';
import { Stats } from './analyze';
export { iterateTree, JsxTag, SaxTag, SaxNode };
export declare type Value = SaxTag | SaxTag[];
interface XmlioApi {
    analyze: () => Stats;
    append: (nodesToAdd: NodesToAdd, selector: SaxTagSelector) => XmlioApi;
    prepend: (nodesToAdd: NodesToAdd, selector: SaxTagSelector) => XmlioApi;
    move: (sourceSelector: SaxTagSelector, targetSelector: SaxTagSelector) => XmlioApi;
    replace: (sourceSelector: SaxTagSelector, targetSelectorFunc: TargetSelectorFunc) => XmlioApi;
    split: (selector: SaxTagSelector) => XmlioApi;
    toHtml: (settings?: SettingsConfig) => string | string[];
    toJsx: (settings?: SettingsConfig) => string | string[];
    toXml: (settings?: SettingsConfig) => string | string[];
    value: () => SaxTag;
    values: () => SaxTag[];
    wrap: (selector: SaxTagSelector, parent: Partial<SaxTag>) => XmlioApi;
}
export declare function fromString(input: string): Promise<XmlioApi>;
export default function xmlioApi(tree: SaxTag | SaxTag[]): XmlioApi;
