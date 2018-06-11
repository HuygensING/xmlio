"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const rename_node_1 = require("./rename-node");
exports.default = (state) => (node) => {
    node = rename_node_1.default(node, state.settings.rename);
    if (state.settings.parent != null &&
        utils_1.compareNodeToSelector(node)(state.settings.parent)) {
        state.settings.writeToOutput = true;
    }
    if (state.settings.splitOn != null &&
        utils_1.compareNodeToSelector(node)(state.settings.splitOn)) {
        state.settings.writeToOutput = true;
        state.output += constants_1.SPLIT_ON_DIVIDER;
    }
    const Tag = state.settings.getComponent(node);
    const tag = new Tag(node, state);
    const open = tag.open();
    if (!utils_1.ignoreNode(state.settings.ignore, node) &&
        !state.openTags.containsOneOf(state.settings.ignore)) {
        state.appendHtml(open);
    }
    state.openTags.add(tag);
    state.previousNodes.add(node);
};
