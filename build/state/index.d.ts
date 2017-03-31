import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';
import { ISettings, IState } from "../types";
declare class State implements IState {
    private componentsPath;
    private output;
    jsx: boolean;
    openTags: OpenTags;
    previousNodes: PreviousNodes;
    startFromTag: any;
    tags: any;
    tagsToSkip: any;
    usedTags: Set<any>;
    writeToOutput: boolean;
    constructor(settings: ISettings);
    appendHtml(str: any): void;
    wrapOutput(): string;
    private wrapJsx();
}
export default State;
