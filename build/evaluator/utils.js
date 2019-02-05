"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proxy_handler_1 = require("./proxy-handler");
const pseudos = [':empty', ':not(', ':first-child', ':last-child', ':nth-child(', ':nth-last-child', ':nth-of-type', ':first-of-type', ':last-of-type', ':only-child'];
function wrapTree(parserOptions) {
    return function (el) {
        const wrapper = document.createElement('section');
        parserOptions.namespaces.forEach(ns => {
            el.setAttribute(`xmlns:${ns}`, 'http://example.com');
        });
        wrapper.appendChild(el);
        return wrapper;
    };
}
exports.wrapTree = wrapTree;
function unwrap(wrapper) {
    return wrapper.firstChild;
}
exports.unwrap = unwrap;
function unwrapStringFunction(func) {
    const outerFunc = new Function(`return ${func}`);
    return outerFunc();
}
exports.unwrapStringFunction = unwrapStringFunction;
function selectElements(el, selector) {
    const colonIndex = selector.indexOf(':');
    if (colonIndex > 0 &&
        pseudos.every(pseudo => selector.slice(colonIndex, colonIndex + pseudo.length) !== pseudo)) {
        selector = selector.replace(/:/ug, proxy_handler_1.COLON_REPLACE).toLowerCase();
    }
    const elements = el.querySelectorAll(selector);
    return Array.from(elements);
}
exports.selectElements = selectElements;
function renameElement(el, newName) {
    const newEl = document.createElement(newName);
    Array.from(el.attributes).forEach(attr => newEl.setAttribute(attr.name, el.getAttribute(attr.name)));
    if (el.className.length) {
        newEl.className = el.className;
    }
    let nextNode = el.firstChild;
    while (nextNode) {
        newEl.appendChild(nextNode.cloneNode(true));
        nextNode = nextNode.nextSibling;
    }
    return newEl;
}
exports.renameElement = renameElement;
function replaceElement(oldEl, newEl) {
    if (oldEl.parentElement == null)
        return;
    oldEl.parentElement.replaceChild(newEl, oldEl);
}
exports.replaceElement = replaceElement;
