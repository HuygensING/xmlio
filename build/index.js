"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const handler_defaults_1 = tslib_1.__importDefault(require("./handler.defaults"));
exports.handlerDefaults = handler_defaults_1.default;
const validators_1 = tslib_1.__importDefault(require("./validators"));
const evaluator_1 = tslib_1.__importDefault(require("./evaluator"));
class XMLio {
    constructor(xml, parserOptions) {
        this.xml = xml;
        this.parserOptions = parserOptions;
        this.transformers = [];
    }
    export(options) {
        if (options == null)
            options = handler_defaults_1.default.xml;
        else if (Array.isArray(options))
            options = options.map(option => (Object.assign({}, handler_defaults_1.default[option.type], option)));
        else
            options = Object.assign({}, handler_defaults_1.default[options.type], options);
        return evaluator_1.default(this.xml, this.transformers, this.parserOptions, options);
    }
    addTransform(transformer) {
        transformer = Object.assign({}, handler_defaults_1.default[transformer.type], transformer);
        const validate = validators_1.default[transformer.type];
        if (validate(transformer))
            this.transformers.push(transformer);
        return this;
    }
    change(selector, changeFunc) {
        return this.addTransform({
            changeFunc: changeFunc.toString(),
            selector,
            type: 'change',
        });
    }
    rename(selector, newName) {
        return this.addTransform({
            newName,
            selector,
            type: 'rename',
        });
    }
    exclude(selector) {
        return this.addTransform({
            selector,
            type: 'exclude',
        });
    }
    replace(targetSelector, sourceSelectorFunc, removeSource = true) {
        return this.addTransform({
            removeSource,
            sourceSelectorFunc: sourceSelectorFunc.toString(),
            targetSelector,
            type: 'replace',
        });
    }
    select(selector) {
        return this.addTransform({
            selector,
            type: 'select',
        });
    }
}
exports.default = XMLio;
