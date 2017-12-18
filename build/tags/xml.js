"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class XmlTag extends base_1.default {
    open() {
        return `<${this.name()}${this.getAttributes()}>${this.openAfter()}`;
    }
    close() {
        return `${this.closeBefore()}</${this.name()}>`;
    }
    getAttributes() {
        const attrs = this.data.attributes;
        return Object.keys(attrs)
            .map((key) => ` ${key}="${attrs[key]}"`)
            .join('');
    }
}
exports.default = XmlTag;
