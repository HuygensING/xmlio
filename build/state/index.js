"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const open_tags_1 = require("./open-tags");
const previous_nodes_1 = require("./previous-nodes");
const setttings_1 = require("./setttings");
class State {
    constructor(settingsConfig) {
        this.custom = {};
        this.openTags = new open_tags_1.default();
        this.output = '';
        this.previousNodes = new previous_nodes_1.default();
        this.usedTags = new Set();
        if (settingsConfig != null && settingsConfig.customState != null) {
            this.custom = Object.assign({}, settingsConfig.customState);
            delete settingsConfig.customState;
        }
        this.settings = new setttings_1.default(settingsConfig);
    }
}
exports.default = State;
