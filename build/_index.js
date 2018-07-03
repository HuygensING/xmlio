"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const xml_1 = require("./tags/xml");
exports.XmlTag = xml_1.default;
const string_1 = require("./tags/string");
exports.StringTag = string_1.default;
const html_1 = require("./tags/html");
exports.HtmlTag = html_1.default;
const jsx_1 = require("./tags/jsx");
exports.JsxTag = jsx_1.default;
exports.cloneNode = (node) => JSON.parse(JSON.stringify(node));
function iterateTree(node, func) {
    const iterate = (n) => {
        if (n == null)
            return;
        if (typeof n !== 'string')
            n = exports.cloneNode(n);
        if (typeof n !== 'string' && n.hasOwnProperty('children'))
            n.children = n.children.map(iterate);
        return func(n);
    };
    return iterate(node);
}
exports.iterateTree = iterateTree;
exports.fromTree = (node, state) => {
    const convertSaxTag = (n) => {
        if (typeof n === 'string')
            return state.settings.transformTextNode(n, state);
        if (state.settings.ignore.some(selector => utils_1.compareNodeToSelector(n)(selector))) {
            return '';
        }
        n = exports.cloneNode(n);
        n = state.settings.transformNode(n);
        const Tag = state.settings.getComponent(n);
        const tag = new Tag(n, state);
        state.openTags.add(tag);
        const open = tag.open();
        const children = n.hasOwnProperty('children') ? n.children.map(convertSaxTag).join('') : '';
        const close = tag.close();
        state.openTags.remove();
        return `${open}${children}${close}`;
    };
    return convertSaxTag(node);
};
exports.filterFromTree = (node, selector) => {
    const found = [];
    const iterate = (n) => {
        if (n == null)
            return;
        if (n.hasOwnProperty('children'))
            n.children.forEach(iterate);
        if (utils_1.compareNodeToSelector(n)(selector))
            found.push(n);
    };
    iterate(node);
    return found;
};
exports.removeFromTree = (tree, selector) => {
    if (selector == null || !Object.keys(selector).length)
        return [tree, []];
    const removed = [];
    const iterated = iterateTree(tree, (n) => {
        if (typeof n === 'string')
            return n;
        const found = utils_1.compareNodeToSelector(n)(selector);
        if (!found) {
            if (n.hasOwnProperty('children'))
                n.children = n.children.filter((x) => x != null);
            return n;
        }
        else {
            removed.push(n);
        }
    });
    return [iterated, removed];
};
exports.addToTree = (tree, nodesToAdd, parent, append = true) => iterateTree(tree, (n) => {
    if (typeof n === 'string')
        return n;
    const found = utils_1.compareNodeToSelector(n)(parent);
    const nextNode = exports.cloneNode(n);
    if (!Array.isArray(nodesToAdd))
        nodesToAdd = [nodesToAdd];
    const nodes = nodesToAdd.map((n) => {
        if (typeof n === 'string')
            return n;
        return createSaxTag(n);
    });
    if (found)
        nextNode.children = append ? nextNode.children.concat(nodes) : nodes.concat(nextNode.children);
    return nextNode;
});
exports.moveNode = (tree, selector, parentSelector, append) => {
    const [nextTree, removedNodes] = exports.removeFromTree(tree, selector);
    return exports.addToTree(nextTree, removedNodes, parentSelector, append);
};
exports.replaceNode = (tree, sourceNode, targetSelector) => {
    if (sourceNode == null || targetSelector == null)
        return tree;
    return iterateTree(tree, (n) => {
        if (typeof n === 'string')
            return n;
        const isTarget = utils_1.compareNodeToSelector(n)(targetSelector);
        if (isTarget)
            return sourceNode;
        return n;
    });
};
exports.replaceNodes = (tree, sourceSelector, targetSelectorFunc) => {
    let [nextTree, removedNodes] = exports.removeFromTree(tree, sourceSelector);
    for (const node of removedNodes) {
        nextTree = exports.replaceNode(nextTree, node, targetSelectorFunc(node));
    }
    return nextTree;
};
exports.wrapNodes = (tree, selector, parent) => {
    return iterateTree(tree, (n) => {
        if (typeof n === 'string')
            return n;
        const found = utils_1.compareNodeToSelector(n)(selector);
        return (found) ? Object.assign({}, createSaxTag(parent), { children: [Object.assign({}, n)] }) : Object.assign({}, n);
    });
};
function createSaxTag(tag) {
    const defaultTagNode = {
        attributes: {},
        id: 'some-id',
        isSelfClosing: false,
        name: null,
        parents: []
    };
    if (tag.hasOwnProperty('children')) {
        tag.children = tag.children.map((child) => {
            if (typeof child === 'string')
                return child;
            return createSaxTag(child);
        });
    }
    return Object.assign({}, defaultTagNode, tag);
}
