"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_base_1 = tslib_1.__importDefault(require("./index.base"));
const evaluator_1 = tslib_1.__importDefault(require("./evaluator"));
const handler_defaults_1 = tslib_1.__importDefault(require("./handler.defaults"));
exports.handlerDefaults = handler_defaults_1.default;
class Xmlio extends index_base_1.default {
    export(options) {
        if (options == null)
            options = handler_defaults_1.default.xml;
        else if (Array.isArray(options))
            options = options.map(option => (Object.assign({}, handler_defaults_1.default[option.type], option)));
        else
            options = Object.assign({}, handler_defaults_1.default[options.type], options);
        return evaluator_1.default(this.xml, this.transformers, this.parserOptions, options);
    }
}
exports.default = Xmlio;
