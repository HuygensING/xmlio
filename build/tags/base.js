"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseTag {
    constructor(data, state) {
        this.data = data;
        this.state = state;
        this.classNames = new Set();
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
    openAfter() {
        return '';
    }
    closeBefore() {
        return '';
    }
    name() {
        return this.data.name;
    }
}
exports.default = BaseTag;
