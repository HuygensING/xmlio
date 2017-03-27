"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_tag_1 = require("./base-tag");
exports.default = (state) => (node) => {
    if (state.startFromTag === node.name)
        state.writeToOutput = true;
    const Tag = Object.keys(state.tags).indexOf(node.name) > -1 ?
        state.tags[node.name] :
        base_tag_1.default;
    const tag = new Tag(node, state);
    const open = tag.open();
    if (state.tagsToSkip.indexOf(node.name) === -1 &&
        !state.openTags.containsOneOf(state.tagsToSkip)) {
        state.appendHtml(open);
    }
    state.openTags.add(tag);
    state.previousNodes.add(node);
};
