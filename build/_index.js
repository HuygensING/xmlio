"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const xml_1 = require("./tags/xml");
exports.XmlTag = xml_1.default;
const empty_1 = require("./tags/empty");
exports.EmptyTag = empty_1.default;
const html_1 = require("./tags/html");
exports.HtmlTag = html_1.default;
const jsx_1 = require("./tags/jsx");
exports.JsxTag = jsx_1.default;
const cloneNode = (node) => JSON.parse(JSON.stringify(node));
function iterateTree(node, func) {
    const iterate = (n) => {
        if (n == null)
            return;
        if (typeof n !== 'string')
            n = cloneNode(n);
        if (n.hasOwnProperty('children'))
            n.children = n.children.map(iterate);
        return func(n);
    };
    return iterate(node);
}
exports.iterateTree = iterateTree;
exports.fromTree = (node, state) => {
    const usedTags = new Set();
    let str = iterateTree(node, (n) => {
        if (typeof n === 'string')
            return state.settings.transformTextNode(n);
        if (state.settings.ignore.some(selector => utils_1.compareNodeToSelector(n)(selector))) {
            return '';
        }
        n = state.settings.transformNode(n);
        const Tag = state.settings.getComponent(n);
        const tag = new Tag(n, state);
        if (state.settings.outputType === 'jsx')
            usedTags.add(tag.name());
        const children = n.hasOwnProperty('children') ? n.children.join('') : '';
        return `${tag.open()}${children}${tag.close()}`;
    });
    if (state.settings.outputType === 'jsx') {
        str = `import * as React from 'react'
import {${[...usedTags].join(', ')}} from '${state.settings.componentPath}'
export default (${state.settings.passProps ? 'props' : ''}) => ${str}`;
    }
    return str;
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
    const nextNode = cloneNode(n);
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
        isSelfClosing: false,
        name: null,
        parent: null
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
