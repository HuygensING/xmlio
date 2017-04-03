import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';
import { ISettings, IState, TagClasses } from "../types";
declare class State implements IState {
    private componentsPath;
    output: string;
    GenericTag: any;
    openTags: OpenTags;
    previousNodes: PreviousNodes;
    startFromTag: any;
    tagClass: TagClasses;
    tags: any;
    tagsToSkip: any;
    usedTags: Set<any>;
    writeToOutput: boolean;
    constructor(settings: ISettings);
    appendHtml(str: any): void;
}
export default State;
