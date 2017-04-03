"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const open_tags_1 = require("./open-tags");
const previous_nodes_1 = require("./previous-nodes");
const jsx_1 = require("../tags/jsx");
const html_1 = require("../tags/html");
const empty_1 = require("../tags/empty");
class State {
    constructor(settings) {
        this.output = '';
        this.openTags = new open_tags_1.default();
        this.previousNodes = new previous_nodes_1.default();
        this.tagClass = 'html';
        this.usedTags = new Set();
        this.writeToOutput = false;
        let { componentsPath, startFromTag, tagClass, tags, tagsToSkip } = settings;
        this.componentsPath = (componentsPath == null) ? 'components' : componentsPath;
        this.startFromTag = startFromTag;
        if (startFromTag == null)
            this.writeToOutput = true;
        this.tags = (tags == null) ? {} : tags;
        this.tagsToSkip = (tagsToSkip == null) ? [] : tagsToSkip;
        this.appendHtml(false);
        if (tagClass != null && tagClass.length)
            this.tagClass = tagClass;
        this.GenericTag = this.tagClass === 'html' ?
            html_1.default :
            this.tagClass === 'jsx' ? jsx_1.default : empty_1.default;
    }
    appendHtml(str) {
        if (this.writeToOutput)
            this.output += str;
    }
}
exports.default = State;
