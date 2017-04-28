"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.default = (state) => (node) => {
    const { getComponent, parent, ignore } = state.settings;
    if (parent != null &&
        utils_1.compareNodeToSelector(node)(parent)) {
        state.writeToOutput = true;
    }
    let Comp;
    if (getComponent != null)
        Comp = getComponent(node);
    if (Comp == null)
        Comp = state.GenericTag;
    const tag = new Comp(node, state);
    const open = tag.open();
    if (!utils_1.ignoreNode(state.settings.ignore, node) &&
        !state.openTags.containsOneOf(state.settings.ignore)) {
        state.appendHtml(open);
    }
    state.openTags.add(tag);
    state.previousNodes.add(node);
};
