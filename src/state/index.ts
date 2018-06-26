import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';
import { Settings, HtmlSettings, JsxSettings } from './setttings'
import BaseTag from '../tags/base'

export interface CustomState {
	[key: string]: any
}

class State {
	public custom: CustomState = {}
	public openTags = new OpenTags()
	public previousNodes = new PreviousNodes()
	// public settings: Settings | JsxSettings | HtmlSettings
	public tree: BaseTag[]
	public usedTags: Set<string> = new Set()


	constructor(public settings: Settings | HtmlSettings | JsxSettings) {
		if (settings != null && settings.customState != null) {
			this.custom = { ...settings.customState };
			// delete settings.customState;
		}
	}
}

export default State;
