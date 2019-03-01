"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.COLON_REPLACE = '_-_-_-_';
function addProxies(doc) {
    const toReplace = [];
    var treeWalker = doc.createTreeWalker(doc, NodeFilter.SHOW_ELEMENT);
    while (treeWalker.nextNode()) {
        const node = treeWalker.currentNode;
        for (const attr of node.attributes) {
            const colonIndex = attr.name.indexOf(':');
            if (colonIndex > 0 &&
                attr.name.slice(0, colonIndex + 1) !== 'xmlns:') {
                node.setAttribute(utils_1.createProxyName(attr.name), node.getAttribute(attr.name));
            }
        }
        if (node.nodeName.indexOf(':') > 0) {
            toReplace.push({
                depth: utils_1.getDepth(node, doc),
                node
            });
        }
    }
    toReplace
        .sort((a, b) => b.depth - a.depth)
        .forEach(rep => {
        const proxyElement = utils_1.renameElement(doc, rep.node, utils_1.createProxyName(rep.node.nodeName));
        utils_1.replaceElement(rep.node, proxyElement);
    });
    return doc;
}
exports.addProxies = addProxies;
function removeProxies(doc) {
    const toReplace = [];
    var treeWalker = doc.createTreeWalker(doc, NodeFilter.SHOW_ELEMENT);
    while (treeWalker.nextNode()) {
        const node = treeWalker.currentNode;
        for (const attr of node.attributes) {
            if (attr.name.indexOf(exports.COLON_REPLACE) > 0) {
                node.removeAttribute(attr.name);
            }
        }
        if (node.nodeName.indexOf(exports.COLON_REPLACE) > 0) {
            toReplace.push({
                depth: utils_1.getDepth(node, doc),
                node
            });
        }
    }
    toReplace
        .sort((a, b) => b.depth - a.depth)
        .forEach(rep => {
        const originalElement = utils_1.renameElement(doc, rep.node, utils_1.revertProxyName(rep.node.nodeName));
        utils_1.replaceElement(rep.node, originalElement);
    });
    return doc;
}
exports.removeProxies = removeProxies;
