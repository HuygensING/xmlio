import State from '../state';
import { SaxTag } from 'xml2tree';
declare abstract class BaseTag {
    data: SaxTag;
    state: State;
    protected className: string;
    protected classNames: Set<string>;
    children: BaseTag[];
    abstract close(): string;
    abstract open(): string;
    constructor(data: SaxTag, state: State);
    protected classNamesToString(): string;
    protected getAttributes(): string;
    protected openAfter(): string;
    protected closeBefore(): string;
    name(): string;
}
export default BaseTag;
