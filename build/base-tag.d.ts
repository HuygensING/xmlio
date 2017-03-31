import { IBaseTag, IState } from "./types";
import { Tag } from "sax";
declare class BaseTag implements IBaseTag {
    private data;
    state: IState;
    private className;
    private classNames;
    private tagName;
    close: any;
    open: any;
    constructor(data: Tag, state: IState);
    private classNamesToString();
    private getAttributes();
    private openHTML();
    private openJSX();
    protected openAfter(): string;
    protected closeBefore(): string;
    private closeHTML();
    private closeJSX();
}
export default BaseTag;
