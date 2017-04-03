import BaseTag from "./base";
import { ICustomTag } from "../types";
declare class HtmlTag extends BaseTag implements ICustomTag {
    open(): string;
    close(): string;
}
export default HtmlTag;
