import BaseTag from "./base";
declare class HtmlTag extends BaseTag {
    open(): string;
    close(): string;
    name(): string;
}
export default HtmlTag;
