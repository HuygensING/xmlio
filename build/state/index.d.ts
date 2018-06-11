import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';
import Settings, { SettingsConfig } from './setttings';
import BaseTag from '../tags/base';
export interface CustomState {
    [key: string]: any;
}
declare class State {
    custom: CustomState;
    openTags: OpenTags;
    output: string;
    previousNodes: PreviousNodes;
    settings: Settings;
    tree: BaseTag[];
    usedTags: Set<string>;
    constructor(settingsConfig: SettingsConfig);
}
export default State;
