import { ITagSelector } from "./types";
import { Tag as SaxTag } from "sax";
export declare const convertColon: (str: string) => string;
export declare const formatTagName: (str: string) => string;
export declare const compareNodeToSelector: (node: SaxTag) => (selector: ITagSelector) => boolean;
export declare const ignoreNode: (ignore: ITagSelector[], node: SaxTag) => boolean;
export declare const xml2json: (xml: any) => Promise<string>;
