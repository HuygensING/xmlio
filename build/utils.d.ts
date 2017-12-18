import { SaxTagSelector } from "./types";
import { Tag as SaxTag } from "sax";
export declare const convertColon: (str: string) => string;
export declare const formatTagName: (str: string) => string;
export declare const compareNodeToSelector: (node: SaxTag) => (selector: SaxTagSelector) => boolean;
export declare const ignoreNode: (ignore: SaxTagSelector[], node: SaxTag) => boolean;
export declare const xml2json: (xml: string) => Promise<Object>;
