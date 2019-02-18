"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proxy_handler_1 = require("./proxy-handler");
const pseudos = [':empty', ':not(', ':first-child', ':last-child', ':nth-child(', ':nth-last-child', ':nth-of-type', ':first-of-type', ':last-of-type', ':only-child'];
function unwrap(wrapper) {
    return wrapper.firstChild;
}
exports.unwrap = unwrap;
function unwrapStringFunction(func) {
    const outerFunc = new Function(`return ${func}`);
    return outerFunc();
}
exports.unwrapStringFunction = unwrapStringFunction;
function replacer(match, offset, string) {
    if (pseudos.some(pseudo => string.slice(offset, offset + pseudo.length) === pseudo))
        return match;
    return proxy_handler_1.COLON_REPLACE;
}
function selectElements(doc, selector) {
    if (selector.indexOf(':') > 0) {
        selector = selector.replace(/:/ug, replacer);
    }
    const elements = doc.querySelectorAll(selector);
    return Array.from(elements);
}
exports.selectElements = selectElements;
function renameElement(doc, el, newName) {
    const newEl = doc.createElement(newName);
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
    if (oldEl.parentNode == null)
        return;
    oldEl.parentNode.replaceChild(newEl, oldEl);
}
exports.replaceElement = replaceElement;
