import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';
import { Settings, HtmlSettings, JsxSettings } from './setttings';
import BaseTag from '../tags/base';
export interface CustomState {
    [key: string]: any;
}
declare class State {
    settings: Settings | HtmlSettings | JsxSettings;
    custom: CustomState;
    openTags: OpenTags;
    previousNodes: PreviousNodes;
    tree: BaseTag[];
    usedTags: Set<string>;
    constructor(settings: Settings | HtmlSettings | JsxSettings);
}
export default State;
