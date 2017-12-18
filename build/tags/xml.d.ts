import BaseTag from "./base";
declare class XmlTag extends BaseTag {
    open(): string;
    close(): string;
    protected getAttributes(): string;
}
export default XmlTag;
