"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const base_1 = require("./base");
class JsxTag extends base_1.default {
    constructor(data, state) {
        super(data, state);
        this.passProps = false;
        if (state.writeToOutput)
            state.usedTags.add(this.name());
    }
    open() {
        const slash = this.data.isSelfClosing ? '/' : '';
        const className = (this.className != null) ?
            ` className="${this.className}"` :
            '';
        const props = this.passProps ? ' {...props}' : '';
        return `<${this.name()}${className}${this.getAttributes()}${props}${slash}>${this.openAfter()}`;
    }
    close() {
        return this.data.isSelfClosing ?
            '' :
            `${this.closeBefore()}</${this.name()}>`;
    }
    name() {
        return utils_1.formatTagName(this.data.name);
    }
    getAttributes() {
        const attrs = this.data.attributes;
        const keys = Object.keys(attrs);
        return keys
            .map((key) => {
            const value = attrs[key];
            key = utils_1.convertColon(key);
            return ` ${key}="${value}"`;
        })
            .join('');
    }
}
exports.default = JsxTag;
