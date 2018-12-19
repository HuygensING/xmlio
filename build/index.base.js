"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseXmlio {
    constructor(xml, parserOptions) {
        this.xml = xml;
        this.parserOptions = parserOptions;
        this.transforms = [];
    }
    addTransform(transform) {
        this.transforms.push(transform);
        return this;
    }
    change(selector, changeFunc) {
        this.transforms.push({
            selector,
            changeFunc: changeFunc.toString(),
            type: 'change',
        });
        return this;
    }
    rename(selector, newName) {
        this.transforms.push({
            selector,
            newName,
            type: 'rename',
        });
        return this;
    }
    exclude(selector) {
        this.transforms.push({
            selector,
            type: 'exclude'
        });
        return this;
    }
    replace(targetSelector, sourceSelectorFunc, removeSource = true) {
        this.transforms.push({
            removeSource,
            sourceSelectorFunc: sourceSelectorFunc.toString(),
            targetSelector,
            type: 'replace',
        });
        return this;
    }
    select(selector) {
        this.transforms.push({
            selector,
            type: 'select',
        });
        return this;
    }
}
exports.default = BaseXmlio;
