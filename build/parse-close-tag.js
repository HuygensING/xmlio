"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state) => (tagName) => {
    const tag = state.openTags.remove();
    if (tag != null &&
        state.settings.tagsToSkip.indexOf(tag.data.name) === -1 &&
        !state.openTags.containsOneOf(state.settings.tagsToSkip)) {
        const close = tag.close();
        state.appendHtml(close);
    }
    if (state.settings.startFromTag === tagName)
        state.writeToOutput = false;
};
