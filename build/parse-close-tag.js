"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.default = (state) => (tagName) => {
    const tag = state.openTags.remove();
    if (tag != null &&
        !utils_1.ignoreNode(state.settings.ignore, tag.data) &&
        !state.openTags.containsOneOf(state.settings.ignore)) {
        const close = tag.close();
        state.appendHtml(close);
        if (state.settings.parent != null &&
            utils_1.compareNodeToSelector(tag.data)(state.settings.parent)) {
            state.settings.writeToOutput = false;
        }
        if (state.settings.splitOn != null &&
            utils_1.compareNodeToSelector(tag.data)(state.settings.splitOn)) {
            state.settings.writeToOutput = false;
        }
    }
};
