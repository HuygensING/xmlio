import { IBaseTag, IState } from "../types";
import { Tag } from "sax";
declare class BaseTag implements IBaseTag {
    data: Tag;
    state: IState;
    protected className: string;
    protected classNames: Set<string>;
    protected tagName: string;
    constructor(data: Tag, state: IState);
    protected classNamesToString(): string;
    protected getAttributes(): string;
    protected openAfter(): string;
    protected closeBefore(): string;
}
export default BaseTag;
