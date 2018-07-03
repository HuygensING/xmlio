import { SaxTag } from 'xml2tree';
import State from './index';
import HtmlTag from '../tags/html';
import JsxTag from '../tags/jsx';
import XmlTag from '../tags/xml';
import StringTag from '../tags/string';
import { SaxTagSelector } from "../types";
export declare type OutputType = 'html' | 'jsx' | 'xml' | 'string';
export declare type TagType = typeof HtmlTag | typeof JsxTag | typeof XmlTag | typeof StringTag;
export declare type TagInstance = HtmlTag | JsxTag | XmlTag | StringTag;
export declare type Convertor = (str: string) => string;
export interface RenameConfig {
    to: string | Convertor;
    selector?: SaxTagSelector;
    type: 'name' | 'attribute' | 'value';
}
export declare class Settings {
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
    wrapNodes?: {
        selector: SaxTagSelector;
        parent: Partial<SaxTag>;
    };
    constructor(config: Settings);
    getComponent?(node: SaxTag): TagType;
    transformNode?(node: SaxTag): SaxTag;
    transformTextNode?(text: string, state: State): string;
}
export declare class JsxSettings extends Settings {
    bare?: boolean;
    componentPath?: string;
    export?: string;
    genericTag?: TagType;
    outputType?: OutputType;
    passProps?: boolean;
    constructor(config: JsxSettings);
}
export declare class HtmlSettings extends Settings {
    genericTag?: TagType;
    outputType?: OutputType;
    constructor(config: HtmlSettings);
}
export declare class StringSettings extends Settings {
    genericTag?: TagType;
    outputType?: OutputType;
    join?: string;
    constructor(config: StringSettings);
}
export default Settings;
