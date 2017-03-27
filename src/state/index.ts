import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';

export interface ISettings {
	// Path where JSX components can be found.
	componentsPath?: string;

	// Output JSX instead of HTML.
	jsx?: boolean;

	// When the parser encouters this tag name, the parser starts writing
	// to this.output. The tag name should be a unique tag (like <body>).
	startFromTag?: string;

	// Maps a tag name (key) to a tag class (value). The tag class may extend
	// BaseTag. If a tag is not in the map, BaseTag is used to generate output.
	tags?: Object;

	// List of tag names to skip (and their children!)
	tagsToSkip?: any[];
}

class State {
	private componentsPath: string;
	private output: string = '';

	public jsx: boolean = false;
	public openTags = new OpenTags();
	public previousNodes = new PreviousNodes();
	public startFromTag: string;
	public tags;
	public tagsToSkip;
	public usedTags = new Set();
	public writeToOutput: boolean = false;

	constructor(settings: ISettings) {
		let { componentsPath, jsx, startFromTag, tags, tagsToSkip } = settings;
		this.componentsPath = (componentsPath == null) ? 'components' : componentsPath;
		if (jsx) this.jsx = true;
		this.startFromTag = startFromTag;
		if (startFromTag == null) this.writeToOutput = true;
		this.tags = (tags == null) ? {} : tags;
		this.tagsToSkip = (tagsToSkip == null) ? [] : tagsToSkip;
	}

	public appendHtml(str) {
		if (this.writeToOutput) this.output += str;
	}

	public wrapOutput() {
		return (this.jsx) ? this.wrapJsx() : this.output;
	}

	private wrapJsx(): string {
		const tags = [...this.usedTags].join(', ');

		return (
// Do not indent!
`import * as React from 'react';
import { ${tags} } from '${this.componentsPath}';

export default () => (
	<div className="wrapper">
		${this.output}
	</div>
);`
		);
	}
}

export default State;
