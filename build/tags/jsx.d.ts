import BaseTag from "./base";
import { ICustomTag } from "../types";
declare class JsxTag extends BaseTag implements ICustomTag {
    constructor(data: any, state: any);
    open(): string;
    close(): string;
}
export default JsxTag;
