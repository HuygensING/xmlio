"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const proxy_handler_1 = require("./proxy-handler");
function exclude(trees, data) {
    return trees.map(tree => {
        const selector = (Array.isArray(data.selector)) ? data.selector : [data.selector];
        selector.forEach(s => {
            utils_1.selectElements(tree, s)
                .forEach(el => el.parentNode.removeChild(el));
        });
        return tree;
    });
}
exports.exclude = exclude;
function change(trees, data) {
    return trees.map(tree => {
        const targets = utils_1.selectElements(tree, data.selector);
        Array.from(targets).forEach(data.changeFunc);
        return tree;
    });
}
exports.change = change;
function rename(trees, data) {
    return trees.map(tree => {
        const oldEls = utils_1.selectElements(tree, data.selector);
        oldEls.forEach(oldEl => {
            const newEl = utils_1.renameElement(oldEl, data.newName);
            utils_1.replaceElement(oldEl, newEl);
        });
        return tree;
    });
}
exports.rename = rename;
function replace(trees, data) {
    return trees.map(tree => replaceInTree(tree, data));
}
exports.replace = replace;
function replaceInTree(tree, data) {
    const targets = utils_1.selectElements(tree, data.targetSelector);
    if (!targets.length)
        console.log('WARNING', `No targets found for ${data.targetSelector}`);
    const used = [];
    Array.from(targets)
        .forEach(target => {
        used.push(target);
        const sourceSelector = data.sourceSelectorFunc(target);
        let sources = [];
        if (sourceSelector instanceof Node) {
            sources.push(sourceSelector);
        }
        else {
            const sourceElements = utils_1.selectElements(tree, sourceSelector);
            sources = Array.from(sourceElements).filter(source => used.indexOf(source) === -1);
        }
        if (!sources.length) {
            const attrs = Array.from(target.attributes).reduce((prev, curr) => {
                if (curr.name.indexOf(proxy_handler_1.COLON_REPLACE) > -1)
                    return prev;
                if (curr.name === 'class' && curr.value === '')
                    return prev;
                prev += `[${curr.name}=${curr.value}]`;
                return prev;
            }, '');
            console.log('WARNING', `No sources (${sourceSelector}) found for target: ${data.targetSelector}${attrs}`);
            return;
        }
        let [firstSource, ...otherSources] = sources;
        if (!data.removeSource)
            firstSource = firstSource.cloneNode(true);
        used.push(firstSource);
        utils_1.replaceElement(target, firstSource);
        if (!otherSources.length)
            return;
        otherSources
            .filter(source => used.indexOf(source) === -1)
            .forEach(source => {
            if (!data.removeSource)
                source = source.cloneNode(true);
            used.push(source);
            firstSource.parentNode.insertBefore(source, firstSource.nextSibling);
        });
    });
    return tree;
}
function select(trees, data, parserOptions) {
    return trees
        .map(tree => {
        const found = utils_1.selectElements(tree, data.selector);
        return found.map(utils_1.wrapTree(parserOptions));
    })
        .reduce((prev, curr) => prev.concat(curr), []);
}
exports.select = select;
