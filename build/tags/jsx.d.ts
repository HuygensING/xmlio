import BaseTag from "./base";
declare class JsxTag extends BaseTag {
    open(): string;
    close(): string;
    name(): string;
    protected getAttributes(): string;
}
export default JsxTag;
