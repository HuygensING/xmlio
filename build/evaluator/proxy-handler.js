"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.COLON_REPLACE = '_-_-_-_';
function createProxyName(name) {
    return name.replace(/:/usg, exports.COLON_REPLACE);
}
class ProxyHandler {
    constructor(parserOptions) {
        this.parserOptions = parserOptions;
        this.proxyElements = new Map();
        this.proxyAttributeElements = [];
    }
    addProxies(el) {
        if (!this.parserOptions.handleNamespaces)
            return;
        const toReplace = [];
        var treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
        while (treeWalker.nextNode()) {
            const node = treeWalker.currentNode;
            for (const attr of node.attributes) {
                const colonIndex = attr.name.indexOf(':');
                if (colonIndex > 0 &&
                    attr.name.slice(0, colonIndex + 1) !== 'xmlns:') {
                    node.setAttribute(createProxyName(attr.name), node.getAttribute(attr.name));
                    this.proxyAttributeElements.push(node);
                }
            }
            if (node.nodeName.indexOf(':') > 0) {
                toReplace.push(node);
            }
        }
        toReplace.forEach(node => {
            const proxyElement = utils_1.renameElement(node, createProxyName(node.nodeName));
            this.proxyElements.set(proxyElement, node);
            utils_1.replaceElement(node, proxyElement);
        });
        return el;
    }
    removeProxies(el) {
        this.proxyAttributeElements.forEach(node => {
            for (const attr of node.attributes) {
                if (attr.name.indexOf(exports.COLON_REPLACE) > 0) {
                    node.removeAttribute(attr.name);
                }
            }
        });
        Array.from(this.proxyElements.entries()).forEach(([proxyEl, origEl]) => {
            utils_1.replaceElement(proxyEl, origEl);
        });
        return el;
    }
}
exports.default = ProxyHandler;
