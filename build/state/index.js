"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const open_tags_1 = require("./open-tags");
const previous_nodes_1 = require("./previous-nodes");
class State {
    constructor(settings) {
        this.output = '';
        this.jsx = false;
        this.openTags = new open_tags_1.default();
        this.previousNodes = new previous_nodes_1.default();
        this.usedTags = new Set();
        this.writeToOutput = false;
        let { componentsPath, jsx, startFromTag, tags, tagsToSkip } = settings;
        this.componentsPath = (componentsPath == null) ? 'components' : componentsPath;
        if (jsx)
            this.jsx = true;
        this.startFromTag = startFromTag;
        if (startFromTag == null)
            this.writeToOutput = true;
        this.tags = (tags == null) ? {} : tags;
        this.tagsToSkip = (tagsToSkip == null) ? [] : tagsToSkip;
    }
    appendHtml(str) {
        if (this.writeToOutput)
            this.output += str;
    }
    wrapOutput() {
        return (this.jsx) ? this.wrapJsx() : this.output;
    }
    wrapJsx() {
        const tags = [...this.usedTags].join(', ');
        return (`import * as React from 'react';
import { ${tags} } from '${this.componentsPath}';

export default () => (
	<div className="wrapper">
		${this.output}
	</div>
);`);
    }
}
exports.default = State;
