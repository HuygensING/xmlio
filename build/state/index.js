"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const open_tags_1 = require("./open-tags");
const previous_nodes_1 = require("./previous-nodes");
class State {
    constructor() {
        this.html = '';
        this.openTags = new open_tags_1.default();
        this.previousNodes = new previous_nodes_1.default();
    }
    appendHtml(str) {
        this.html += str;
    }
}
exports.default = State;
