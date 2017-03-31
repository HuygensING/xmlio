import { IBaseTag, IOpenTags } from "../types";
declare class OpenTags implements IOpenTags {
    private tags;
    add(tag: IBaseTag): void;
    remove(): any;
    contains(tagName: any): boolean;
    containsBy(tagName: any, attributeKey: any, attributeValue: any): boolean;
    containsOneOf(tagNames: any): any;
    count(): number;
    countType(tagName: any): number;
    lastOfType(tagName: any): any;
    log(): string;
}
export default OpenTags;
