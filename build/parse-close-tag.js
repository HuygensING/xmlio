"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.default = (state) => (tagName) => {
    const { ignore, parent } = state.settings;
    const tag = state.openTags.remove();
    if (tag != null &&
        !utils_1.ignoreNode(ignore, tag.data) &&
        !state.openTags.containsOneOf(ignore)) {
        const close = tag.close();
        state.appendHtml(close);
        if (parent != null &&
            utils_1.compareNodeToSelector(tag.data)(parent)) {
            state.writeToOutput = false;
        }
    }
};
