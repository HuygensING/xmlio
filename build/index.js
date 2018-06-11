"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const utils_1 = require("./utils");
const sax2tree_1 = require("sax2tree");
const xml_1 = require("./tags/xml");
exports.XmlTag = xml_1.default;
const empty_1 = require("./tags/empty");
exports.EmptyTag = empty_1.default;
const html_1 = require("./tags/html");
exports.HtmlTag = html_1.default;
const jsx_1 = require("./tags/jsx");
exports.JsxTag = jsx_1.default;
const cloneNode = (node) => JSON.parse(JSON.stringify(node));
function xml2html(xml, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        const state = new state_1.default(settings);
        let tree = yield sax2tree_1.default(xml);
        let [nextTree, parts] = exports.removeFromTree(tree, state.settings.parent);
        if (!parts.length)
            parts.push(nextTree);
        const outputString = parts
            .map(t => wrapNodes(t, state.settings.wrapNodes))
            .map(t => exports.moveNode(t, state.settings.move))
            .map(t => exports.fromTree(t, state));
        return [outputString, state.custom];
    });
}
exports.default = xml2html;
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
exports.treeToString = (tree, settings) => exports.fromTree(tree, new state_1.default(settings));
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
exports.addToTree = (tree, nodes, selector) => iterateTree(tree, (n) => {
    if (typeof n === 'string')
        return n;
    const found = utils_1.compareNodeToSelector(n)(selector);
    const nextNode = Object.assign({}, n);
    if (found)
        nextNode.children = nodes.concat(n.children);
    return nextNode;
});
exports.moveNode = (tree, moveSetting) => {
    if (moveSetting == null)
        return tree;
    const [nextTree, removedNodes] = exports.removeFromTree(tree, moveSetting.selector);
    return exports.addToTree(nextTree, removedNodes, moveSetting.parentSelector);
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
const wrapNodes = (tree, wrapSetting) => {
    if (wrapSetting == null)
        return tree;
    return iterateTree(tree, (n) => {
        if (typeof n === 'string')
            return n;
        const found = utils_1.compareNodeToSelector(n)(wrapSetting.selector);
        const defaultTagNode = {
            attributes: {},
            id: null,
            isSelfClosing: false,
            name: null,
            parent: null
        };
        return (found) ? Object.assign({}, defaultTagNode, wrapSetting.parent, { children: [Object.assign({}, n)] }) : Object.assign({}, n);
    });
};
