import { SaxTagSelector } from "./types";
import { Tag as SaxTag } from "sax";
export declare const convertColon: (str: string) => string;
export declare const formatTagName: (str: string) => string;
export declare const compareNodeToSelector: (node: SaxTag) => (selector: SaxTagSelector) => boolean;
