"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml2js_1 = require("xml2js");
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
exports.convertColon = (str) => str.replace(/:([a-zA-Z]{1})/g, (match, p1) => p1.toUpperCase());
exports.formatTagName = (str) => {
    if (str === 'date')
        str = `${str}_`;
    return capitalize(exports.convertColon(str));
};
exports.compareNodeToSelector = (node) => (selector) => {
    const name = selector.name === node.name;
    const attribute = selector.attribute == null || Object.keys(node.attributes).indexOf(selector.attribute) > -1;
    const value = selector.value == null || (attribute && selector.value === node.attributes[selector.attribute]);
    return name && attribute && value;
};
exports.ignoreNode = (ignore, node) => ignore.some(exports.compareNodeToSelector(node));
exports.xml2json = (xml) => new Promise((resolve, reject) => {
    xml2js_1.parseString(xml, (err, result) => {
        if (err)
            return reject(err);
        resolve(result);
    });
});
