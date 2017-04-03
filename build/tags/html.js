"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class HtmlTag extends base_1.default {
    open() {
        return `<${this.tagName}${this.classNamesToString()}${this.getAttributes()}>${this.openAfter()}`;
    }
    close() {
        return `${this.closeBefore()}</${this.tagName}>`;
    }
}
exports.default = HtmlTag;
