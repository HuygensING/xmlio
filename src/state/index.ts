import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';
import {ISettings, IState} from "../types";
import HtmlTag from "../tags/html";
import JsxTag from "../tags/jsx";
import EmptyTag from "../tags/empty";

class State implements IState {
	public custom = {};
	public GenericTag;
	public openTags = new OpenTags();
	public output: string = '';
	public previousNodes = new PreviousNodes();
	public usedTags = new Set();
	public writeToOutput = false;

	constructor(public settings: ISettings) {
		if (this.settings.componentsPath == null) this.settings.componentsPath = 'components';
		if (this.settings.parent == null) this.writeToOutput = true;
		if (this.settings.tagsToSkip == null) this.settings.tagsToSkip = [];
		if (this.settings.tagClass == null) this.settings.tagClass = 'html';
		if (this.settings.transformTextNode == null) this.settings.transformTextNode = (t) => t;
		this.GenericTag = this.settings.tagClass === 'html' ?
			HtmlTag :
			this.settings.tagClass === 'jsx' ? JsxTag : EmptyTag;
	}

	public appendHtml(str) {
		if (this.writeToOutput) this.output += str;
	}
}

export default State;
