"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const base_1 = require("./base");
class JsxTag extends base_1.default {
    constructor(data, state) {
        super(data, state);
        this.tagName = utils_1.formatTagName(this.data.name);
        if (state.writeToOutput)
            state.usedTags.add(this.tagName);
    }
    open() {
        const slash = this.data.isSelfClosing ? '/' : '';
        const className = (this.className != null) ?
            ` className="${this.className}"` :
            '';
        return `<${this.tagName}${className}${this.getAttributes()}${slash}>${this.openAfter()}`;
    }
    close() {
        return this.data.isSelfClosing ?
            '' :
            `${this.closeBefore()}</${this.tagName}>`;
    }
}
exports.default = JsxTag;
