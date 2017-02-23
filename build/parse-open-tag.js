"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_tag_1 = require("./base-tag");
exports.default = (state, tags, tagsToSkip) => (node) => {
    const Tag = Object.keys(tags).indexOf(node.name) > -1 ? tags[node.name] : base_tag_1.default;
    const tag = new Tag(node, state);
    const open = tag.open();
    if (tagsToSkip.indexOf(node.name) === -1 &&
        !state.openTags.containsOneOf(tagsToSkip)) {
        state.appendHtml(open);
    }
    state.openTags.add(tag);
    state.previousNodes.add(node);
};
