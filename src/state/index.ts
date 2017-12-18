import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';
import Settings from './setttings'

class State {
	public custom = {}
	public openTags = new OpenTags()
	public output: string = ''
	public previousNodes = new PreviousNodes()
	public usedTags = new Set()
	// public writeToOutput = false;

	constructor(public settings: Partial<Settings>) {

		// if (this.settings.componentsPath == null) this.settings.componentsPath = 'components';
		// if (this.settings.parent == null) this.writeToOutput = true;
		// if (this.settings.ignore == null) this.settings.ignore = [];
		// if (this.settings.outputType == null) this.settings.outputType = 'html';
		// if (this.settings.transformTextNode == null) this.settings.transformTextNode = (t) => t;
		if (this.settings.state != null) {
			this.custom = { ...this.settings.state };
			delete this.settings.state;
		}

		this.settings = new Settings(settings)
	}

	// ToDo rename to appendString
	public appendHtml(str: string) {
		if (this.settings.writeToOutput) this.output += str;
	}
}

export default State;
