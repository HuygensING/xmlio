import { Tag as SaxTag } from "sax";
import HtmlTag from '../tags/html';
import JsxTag from '../tags/jsx';
import XmlTag from '../tags/xml';
import EmptyTag from '../tags/empty';
import { SaxTagSelector } from "../types";
import { TagNode } from "../index";
export declare type OutputType = 'html' | 'jsx' | 'xml' | 'empty';
export declare type TagType = typeof HtmlTag | typeof JsxTag | typeof XmlTag | typeof EmptyTag;
export declare type TagInstance = HtmlTag | JsxTag | XmlTag | EmptyTag;
export declare type Convertor = (str: string) => string;
export interface RenameConfig {
    to: string | Convertor;
    selector?: SaxTagSelector;
    type: 'name' | 'attribute' | 'value';
}
export declare class SettingsConfig {
    componentPath?: string;
    customState?: {
        [key: string]: any;
    };
    genericTag?: TagType;
    ignore?: SaxTagSelector[];
    move?: {
        selector: SaxTagSelector;
        parentSelector: SaxTagSelector;
    };
    outputType?: OutputType;
    parent?: SaxTagSelector;
    passProps?: boolean;
    wrapNodes?: {
        selector: SaxTagSelector;
        parent: Partial<TagNode>;
    };
    constructor(config: SettingsConfig);
    getComponent?(node: SaxTag): TagType;
    transformNode?(node: TagNode): TagNode;
    transformTextNode?(text: string): string;
}
declare class Settings extends SettingsConfig {
    constructor(config: SettingsConfig);
    private setTag;
}
export default Settings;
