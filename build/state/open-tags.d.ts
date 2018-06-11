import { SaxTagSelector } from "../types";
import { TagInstance } from "./setttings";
declare class OpenTags {
    private tags;
    add(tag: TagInstance): void;
    remove(): TagInstance;
    contains(tagName: string): boolean;
    containsBy(selector: SaxTagSelector): boolean;
    containsOneOf(selectors: SaxTagSelector[]): boolean;
    count(): number;
    countType(tagName: string): number;
    last(): TagInstance;
    lastOfType(tagName: string): TagInstance;
    log(): string;
}
export default OpenTags;
