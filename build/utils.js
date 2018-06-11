"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
exports.convertColon = (str) => str.replace(/:([a-zA-Z]{1})/g, (match, p1) => p1.toUpperCase());
exports.formatTagName = (str) => {
    if (str === 'date')
        str = `${str}_`;
    return capitalize(exports.convertColon(str));
};
exports.compareNodeToSelector = (node) => (selector) => {
    const nameMatched = selector.name == null || selector.name === node.name;
    if (selector.attributes == null)
        return nameMatched;
    const attributesMatched = (attrs) => {
        if (attrs == null)
            return false;
        return Object.keys(attrs).some(key => {
            const value = attrs[key];
            if (key == '__' && value == null)
                return true;
            if (value == null && Object.keys(node.attributes).indexOf(key) > -1)
                return true;
            if (key == '__' && Object.keys(node.attributes).map(k => node.attributes[k]).indexOf(value) > -1)
                return true;
            if (node.hasOwnProperty('attributes')) {
                return Object.keys(node.attributes)
                    .reduce((prev, currKey) => {
                    const currValue = node.attributes[currKey];
                    const curr = attrs[currKey] === currValue;
                    return prev || curr;
                }, false);
            }
            return false;
        });
    };
    return nameMatched && (attributesMatched(selector.attributes) && !attributesMatched(selector.notAttributes));
};
