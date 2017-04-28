import BaseTag from "./base";
import { ICustomTag } from "../types";
declare class XmlTag extends BaseTag implements ICustomTag {
    open(): string;
    close(): string;
    protected getAttributes(): string;
}
export default XmlTag;
