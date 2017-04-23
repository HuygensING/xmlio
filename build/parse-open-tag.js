"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state) => (node) => {
    const { getComponent, parent, tagsToSkip } = state.settings;
    if (parent != null && parent.tag === node.name)
        state.writeToOutput = true;
    let Comp;
    if (getComponent != null)
        Comp = getComponent(node);
    if (Comp == null)
        Comp = state.GenericTag;
    const tag = new Comp(node, state);
    const open = tag.open();
    if (tagsToSkip.indexOf(node.name) === -1 &&
        !state.openTags.containsOneOf(tagsToSkip)) {
        state.appendHtml(open);
    }
    state.openTags.add(tag);
    state.previousNodes.add(node);
};
