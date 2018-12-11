import BaseTag from "./base";
export declare const JSON_PREFIX = "__json__";
declare class JsxTag extends BaseTag {
    open(): string;
    close(): string;
    name(): string;
    protected getAttributes(): string;
}
export default JsxTag;
