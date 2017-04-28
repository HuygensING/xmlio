import { IBaseTag, IState } from "../types";
import { Tag as SaxTag } from "sax";
declare class BaseTag implements IBaseTag {
    data: SaxTag;
    state: IState;
    protected className: string;
    protected classNames: Set<string>;
    constructor(data: SaxTag, state: IState);
    protected classNamesToString(): string;
    protected getAttributes(): string;
    protected openAfter(): string;
    protected closeBefore(): string;
    name(): string;
}
export default BaseTag;
