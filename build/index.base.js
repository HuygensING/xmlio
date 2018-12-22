"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const handler_defaults_1 = tslib_1.__importDefault(require("./handler.defaults"));
const validators_1 = tslib_1.__importDefault(require("./validators"));
class BaseXmlio {
    constructor(xml, parserOptions) {
        this.xml = xml;
        this.parserOptions = parserOptions;
        this.transformers = [];
    }
    addTransform(transform) {
        const validate = validators_1.default[transform.type];
        if (validate(transform))
            this.transformers.push(transform);
        return this;
    }
    change(selector, changeFunc) {
        const transformer = Object.assign({}, handler_defaults_1.default.change, { selector, changeFunc: changeFunc.toString() });
        return this.addTransform(transformer);
    }
    rename(selector, newName) {
        const transformer = Object.assign({}, handler_defaults_1.default.rename, { selector,
            newName });
        return this.addTransform(transformer);
    }
    exclude(selector) {
        const transformer = Object.assign({}, handler_defaults_1.default.exclude, { selector });
        return this.addTransform(transformer);
    }
    replace(targetSelector, sourceSelectorFunc, removeSource = true) {
        const transformer = Object.assign({}, handler_defaults_1.default.change, { removeSource, sourceSelectorFunc: sourceSelectorFunc.toString(), targetSelector });
        return this.addTransform(transformer);
    }
    select(selector) {
        const transformer = Object.assign({}, handler_defaults_1.default.select, { selector });
        return this.addTransform(transformer);
    }
}
exports.default = BaseXmlio;
