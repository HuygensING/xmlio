"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class EmptyTag extends base_1.default {
    open() {
        return ' ';
    }
    close() {
        return ' ';
    }
}
exports.default = EmptyTag;
