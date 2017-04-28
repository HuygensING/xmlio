import BaseTag from "./base";
import { ICustomTag } from "../types";
declare class JsxTag extends BaseTag implements ICustomTag {
    protected passProps: boolean;
    constructor(data: any, state: any);
    open(): string;
    close(): string;
    name(): string;
    protected getAttributes(): string;
}
export default JsxTag;
