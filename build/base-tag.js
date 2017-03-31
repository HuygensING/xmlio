"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class BaseTag {
    constructor(data, state) {
        this.data = data;
        this.state = state;
        this.classNames = new Set();
        this.tagName = 'div';
        this.open = state.jsx ? this.openJSX : this.openHTML;
        this.close = state.jsx ? this.closeJSX : this.closeHTML;
        if (state.jsx) {
            this.tagName = utils_1.formatTagName(this.data.name);
        }
        if (state.writeToOutput)
            state.usedTags.add(this.tagName);
    }
    classNamesToString() {
        const className = (this.className == null) ?
            this.data.name.replace(':', '').toLowerCase() :
            this.className;
        if (className.length)
            this.classNames.add(className);
        return (this.classNames.size) ?
            ` class="${[...this.classNames].join(' ')}"` :
            '';
    }
    getAttributes() {
        const attrs = this.data.attributes;
        const keys = Object.keys(attrs);
        return keys
            .map((key) => {
            const value = attrs[key];
            key = key.replace(':', '-');
            return ` data-${key}="${value}"`;
        })
            .join('');
    }
    openHTML() {
        return `<${this.tagName}${this.classNamesToString()}${this.getAttributes()}>${this.openAfter()}`;
    }
    openJSX() {
        const slash = this.data.isSelfClosing ? '/' : '';
        return `<${this.tagName}${this.getAttributes()}${slash}>${this.openAfter()}`;
    }
    openAfter() {
        return '';
    }
    closeBefore() {
        return '';
    }
    closeHTML() {
        return `${this.closeBefore()}</${this.tagName}>`;
    }
    closeJSX() {
        return this.data.isSelfClosing ?
            '' :
            `${this.closeBefore()}</${this.tagName}>`;
    }
}
exports.default = BaseTag;
