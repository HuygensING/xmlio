"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base {
    constructor(data, state) {
        this.className = null;
        this.classNames = new Set();
        this.data = null;
        this.state = null;
        this.tagName = 'div';
        this.data = data;
        this.state = state;
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
    open() {
        return `<${this.tagName}${this.classNamesToString()}${this.getAttributes()}>${this.openAfter()}`;
    }
    openAfter() {
        return '';
    }
    closeBefore() {
        return '';
    }
    close() {
        return `${this.closeBefore()}</${this.tagName}>`;
    }
}
exports.default = Base;
