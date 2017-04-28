import { IBaseTag, IOpenTags, ITagSelector } from "../types";
declare class OpenTags implements IOpenTags {
    private tags;
    add(tag: IBaseTag): void;
    remove(): any;
    contains(tagName: any): boolean;
    containsBy(selector: ITagSelector): any;
    containsOneOf(selectors: ITagSelector[]): boolean;
    count(): number;
    countType(tagName: any): number;
    lastOfType(tagName: any): any;
    log(): string;
}
export default OpenTags;
