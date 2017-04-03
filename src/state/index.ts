import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';
import {ICustomTag, ISettings, IState, TagClasses} from "../types";
import JsxTag from "../tags/jsx";
import HtmlTag from "../tags/html";
import EmptyTag from "../tags/empty";

class State implements IState {
	private componentsPath: string;
	public output: string = '';

	public GenericTag;
	public openTags = new OpenTags();
	public previousNodes = new PreviousNodes();
	public startFromTag;
	public tagClass: TagClasses = 'html';
	public tags;
	public tagsToSkip;
	public usedTags = new Set();
	public writeToOutput = false;

	constructor(settings: ISettings) {
		let { componentsPath, startFromTag, tagClass, tags, tagsToSkip } = settings;
		this.componentsPath = (componentsPath == null) ? 'components' : componentsPath;
		this.startFromTag = startFromTag;
		if (startFromTag == null) this.writeToOutput = true;
		this.tags = (tags == null) ? {} : tags;
		this.tagsToSkip = (tagsToSkip == null) ? [] : tagsToSkip;
		this.appendHtml(false);
		if (tagClass != null && tagClass.length) this.tagClass = tagClass;
		this.GenericTag = this.tagClass === 'html' ?
			HtmlTag :
			this.tagClass === 'jsx' ? JsxTag : EmptyTag;
	}

	public appendHtml(str) {
		if (this.writeToOutput) this.output += str;
	}
}

export default State;
