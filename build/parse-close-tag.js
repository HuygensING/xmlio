"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state) => (tagName) => {
    const tag = state.openTags.remove();
    if (tag != null &&
        state.tagsToSkip.indexOf(tag.data.name) === -1 &&
        !state.openTags.containsOneOf(state.tagsToSkip)) {
        const close = tag.close();
        state.appendHtml(close);
    }
    if (state.startFromTag === tagName)
        state.writeToOutput = false;
};
