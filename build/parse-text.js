"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state, tagsToSkip) => (text) => {
    if (!state.openTags.containsOneOf(tagsToSkip)) {
        state.appendHtml(text);
    }
};
