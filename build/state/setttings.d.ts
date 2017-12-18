import { Tag as SaxTag } from "sax";
import State from './index';
import HtmlTag from '../tags/html';
import JsxTag from '../tags/jsx';
import XmlTag from '../tags/xml';
import EmptyTag from '../tags/empty';
import { SaxTagSelector } from "../types";
export declare type OutputType = 'html' | 'jsx' | 'xml' | 'json' | 'empty';
export declare type TagType = typeof HtmlTag | typeof JsxTag | typeof XmlTag | typeof EmptyTag;
export declare type TagInstance = HtmlTag | JsxTag | XmlTag | EmptyTag;
declare class Settings {
    componentsPath: string;
    parent: SaxTagSelector;
    outputType: OutputType;
    ignore: SaxTag[];
    splitOn: SaxTagSelector;
    state: Partial<State>;
    genericTag: TagType;
    writeToOutput: boolean;
    constructor(fields: Partial<Settings>);
    getComponent: (node: SaxTag) => TagType;
    transformTextNode(text: string): string;
    private setTag();
}
export default Settings;
