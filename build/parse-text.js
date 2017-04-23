"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state) => (text) => {
    if (!state.openTags.containsOneOf(state.settings.tagsToSkip)) {
        if (text.trim().length > 0) {
            text = state.settings.transformTextNode(text);
        }
        state.appendHtml(text);
    }
};
