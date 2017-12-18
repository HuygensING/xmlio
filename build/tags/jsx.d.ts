import { Tag as SaxTag } from 'sax';
import State from '../state';
import BaseTag from "./base";
declare class JsxTag extends BaseTag {
    protected passProps: boolean;
    constructor(data: SaxTag, state: State);
    open(): string;
    close(): string;
    name(): string;
    protected getAttributes(): string;
}
export default JsxTag;
