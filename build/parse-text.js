"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state) => (text) => {
    if (!state.openTags.containsOneOf(state.tagsToSkip)) {
        state.appendHtml(text);
    }
};
