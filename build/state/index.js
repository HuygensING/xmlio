"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const open_tags_1 = require("./open-tags");
const previous_nodes_1 = require("./previous-nodes");
const html_1 = require("../tags/html");
const jsx_1 = require("../tags/jsx");
const empty_1 = require("../tags/empty");
class State {
    constructor(settings) {
        this.settings = settings;
        this.custom = {};
        this.openTags = new open_tags_1.default();
        this.output = '';
        this.previousNodes = new previous_nodes_1.default();
        this.usedTags = new Set();
        this.writeToOutput = false;
        if (this.settings.componentsPath == null)
            this.settings.componentsPath = 'components';
        if (this.settings.parent == null)
            this.writeToOutput = true;
        if (this.settings.tagsToSkip == null)
            this.settings.tagsToSkip = [];
        if (this.settings.tagClass == null)
            this.settings.tagClass = 'html';
        if (this.settings.transformTextNode == null)
            this.settings.transformTextNode = (t) => t;
        this.GenericTag = this.settings.tagClass === 'html' ?
            html_1.default :
            this.settings.tagClass === 'jsx' ? jsx_1.default : empty_1.default;
    }
    appendHtml(str) {
        if (this.writeToOutput)
            this.output += str;
    }
}
exports.default = State;
