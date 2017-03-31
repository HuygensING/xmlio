import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';
import {ISettings, IState} from "../types";

class State implements IState {
	private componentsPath: string;
	private output: string = '';

	public jsx = false;
	public openTags = new OpenTags();
	public previousNodes = new PreviousNodes();
	public startFromTag;
	public tags;
	public tagsToSkip;
	public usedTags = new Set();
	public writeToOutput = false;

	constructor(settings: ISettings) {
		let { componentsPath, jsx, startFromTag, tags, tagsToSkip } = settings;
		this.componentsPath = (componentsPath == null) ? 'components' : componentsPath;
		if (jsx) this.jsx = true;
		this.startFromTag = startFromTag;
		if (startFromTag == null) this.writeToOutput = true;
		this.tags = (tags == null) ? {} : tags;
		this.tagsToSkip = (tagsToSkip == null) ? [] : tagsToSkip;
		this.appendHtml(false)
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
