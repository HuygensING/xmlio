"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state, tagsToSkip) => (tagName) => {
    const tag = state.openTags.remove();
    if (tag != null &&
        tagsToSkip.indexOf(tag.data.name) === -1 &&
        !state.openTags.containsOneOf(tagsToSkip)) {
        const close = tag.close();
        state.appendHtml(close);
    }
};
