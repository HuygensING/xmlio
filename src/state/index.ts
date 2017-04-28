import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';
import {ISettings, IState} from "../types";
import HtmlTag from "../tags/html";
import JsxTag from "../tags/jsx";
import EmptyTag from "../tags/empty";
import XmlTag from "../tags/xml";

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
		if (this.settings.ignore == null) this.settings.ignore = [];
		if (this.settings.outputType == null) this.settings.outputType = 'html';
		if (this.settings.transformTextNode == null) this.settings.transformTextNode = (t) => t;
		if (this.settings.state != null) {
			this.custom = this.settings.state;
			delete this.settings.state;
		}

		const { outputType } = this.settings;
		this.GenericTag = outputType === 'html' ?
			HtmlTag :
			outputType === 'jsx' ?
				JsxTag :
				outputType === 'xml' || outputType === 'json' ?
					XmlTag :
					EmptyTag;
	}

	// ToDo rename to appendString
	public appendHtml(str) {
		if (this.writeToOutput) this.output += str;
	}
}

export default State;
