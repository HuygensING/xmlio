import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';
import { ISettings, IState } from "../types";
declare class State implements IState {
    settings: ISettings;
    custom: {};
    GenericTag: any;
    openTags: OpenTags;
    output: string;
    previousNodes: PreviousNodes;
    usedTags: Set<any>;
    writeToOutput: boolean;
    constructor(settings: ISettings);
    appendHtml(str: any): void;
}
export default State;
