import BaseTag from "./base";
import { ICustomTag } from "../types";
declare class EmptyTag extends BaseTag implements ICustomTag {
    open(): string;
    close(): string;
}
export default EmptyTag;
