"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const renameNode = (node, config) => {
    config.forEach(conf => {
        const getTo = (value) => (typeof conf.to === 'function') ? conf.to(value) : conf.to;
        const selector = conf.selector == null ? {} : conf.selector;
        if (utils_1.compareNodeToSelector(node)(selector)) {
            if (conf.type === 'name') {
                node = Object.assign({}, node, { name: getTo(node.name) });
            }
            else if (conf.type === 'attribute') {
                node = Object.assign({}, node, { attributes: Object.keys(node.attributes).reduce((prev, curr) => {
                        if (selector.attribute == null || selector.attribute === curr) {
                            prev[getTo(curr)] = node.attributes[curr];
                        }
                        else {
                            prev[curr] = node.attributes[curr];
                        }
                        return prev;
                    }, {}) });
            }
            else if (conf.type === 'value') {
                node = Object.assign({}, node, { attributes: Object.keys(node.attributes).reduce((prev, curr) => {
                        const value = node.attributes[curr];
                        prev[curr] = ((selector.attribute == null || selector.attribute === curr) ||
                            ((selector.attribute == null && selector.value == null) || selector.value === value)) ? getTo(value) : value;
                        return prev;
                    }, {}) });
            }
        }
    });
    return node;
};
exports.default = renameNode;
