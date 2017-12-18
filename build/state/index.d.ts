import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';
import Settings from './setttings';
declare class State {
    settings: Partial<Settings>;
    custom: {};
    openTags: OpenTags;
    output: string;
    previousNodes: PreviousNodes;
    usedTags: Set<any>;
    constructor(settings: Partial<Settings>);
    appendHtml(str: string): void;
}
export default State;
