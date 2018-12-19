"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_base_1 = tslib_1.__importDefault(require("./index.base"));
const evaluator_1 = tslib_1.__importDefault(require("./evaluator"));
class Xmlio extends index_base_1.default {
    export(options) {
        return evaluator_1.default(this.xml, this.transforms, this.parserOptions, options);
    }
}
exports.default = Xmlio;
