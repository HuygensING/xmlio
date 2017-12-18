"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class OpenTags {
    constructor() {
        this.tags = [];
    }
    add(tag) {
        this.tags.push(tag);
    }
    remove() {
        return this.tags.pop();
    }
    contains(tagName) {
        return this.tags.find((tag) => tag.data.name === tagName) != null;
    }
    containsBy(selector) {
        return this.tags.find((t) => utils_1.compareNodeToSelector(t.data)(selector)) != null;
    }
    containsOneOf(selectors) {
        return selectors.some((selector) => this.containsBy(selector));
    }
    count() {
        return this.tags.length;
    }
    countType(tagName) {
        return this.tags.filter((tag) => tag.data.name === tagName).length;
    }
    lastOfType(tagName) {
        return [...this.tags].reverse().find((tag) => tag.data.name === tagName);
    }
    log() {
        return this.tags.map((t) => t.data.name).join(', ');
    }
}
exports.default = OpenTags;
