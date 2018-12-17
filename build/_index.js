"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const xml2tree_1 = require("xml2tree");
exports.SaxTag = xml2tree_1.SaxTag;
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
        if (typeof n !== 'string' && n.hasOwnProperty('children'))
            n.children = n.children.map(iterate);
        return func(n);
    };
    return iterate(node);
}
exports.iterateTree = iterateTree;
function iterateTreePure(node, func) {
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
exports.iterateTreePure = iterateTreePure;
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
    if (utils_1.compareNodeToSelector(n)(parent)) {
        const nodes = utils_1.castArray(nodesToAdd).map((n) => {
            if (typeof n === 'string')
                return n;
            const tmp = new xml2tree_1.SaxTag(n);
            return tmp;
        });
        n.children = append ? n.children.concat(nodes) : nodes.concat(n.children);
    }
    return n;
});
exports.moveNode = (tree, selector, parentSelector, append) => {
    const [nextTree, removedNodes] = exports.removeFromTree(tree, selector);
    return exports.addToTree(nextTree, removedNodes, parentSelector, append);
};
exports.replaceNodes = (tree, targetSelector, sourceSelectorFunc, removeSourceNode = true) => {
    const pairs = exports.filterFromTree(tree, targetSelector)
        .map(target => {
        const sourceSelector = sourceSelectorFunc(target);
        let sources;
        if (removeSourceNode) {
            const removed = exports.removeFromTree(tree, sourceSelector);
            tree = removed[0];
            sources = removed[1];
        }
        else {
            sources = exports.filterFromTree(tree, sourceSelector);
        }
        if (sources.length !== 1) {
            utils_1.logError(`replaceNodes`, [`sources length: ${sources.length}`, target.name, target.attributes]);
            if (sources.length > 1)
                return [target, sources[0]];
            else
                return null;
        }
        return [target, sources[0]];
    })
        .filter(x => x != null);
    if (!pairs.length)
        return tree;
    return iterateTree(tree, (n) => {
        if (typeof n === 'string')
            return n;
        const pair = pairs.find(p => p[0].id === n.id);
        if (pair == null)
            return n;
        else
            return pair[1];
    });
};
exports.wrapNodes = (tree, selector, parent) => {
    return iterateTree(tree, (n) => {
        if (typeof n === 'string')
            return n;
        const found = utils_1.compareNodeToSelector(n)(selector);
        if (found)
            parent.children = [Object.assign({}, n)];
        return (found) ? new xml2tree_1.SaxTag(parent) : new xml2tree_1.SaxTag(n);
    });
};
