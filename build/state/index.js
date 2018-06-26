"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const open_tags_1 = require("./open-tags");
const previous_nodes_1 = require("./previous-nodes");
class State {
    constructor(settings) {
        this.settings = settings;
        this.custom = {};
        this.openTags = new open_tags_1.default();
        this.previousNodes = new previous_nodes_1.default();
        this.usedTags = new Set();
        if (settings != null && settings.customState != null) {
            this.custom = Object.assign({}, settings.customState);
        }
    }
}
exports.default = State;
