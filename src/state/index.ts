import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';
import Settings, { SettingsConfig } from './setttings'
import BaseTag from '../tags/base'

export interface CustomState {
	[key: string]: any
}

class State {
	public custom: CustomState = {}
	public openTags = new OpenTags()
	public output: string = ''
	public previousNodes = new PreviousNodes()
	public settings: Settings
	public tree: BaseTag[]
	public usedTags: Set<string> = new Set()

	constructor(settingsConfig: SettingsConfig) {
		if (settingsConfig != null && settingsConfig.customState != null) {
			this.custom = { ...settingsConfig.customState };
			delete settingsConfig.customState;
		}

		this.settings = new Settings(settingsConfig)
	}
}

export default State;
