"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    containsBy(tagName, attributeKey, attributeValue) {
        return this.tags.find((t) => t.data.name === tagName &&
            t.data.attributes.hasOwnProperty(attributeKey) &&
            t.data.attributes[attributeKey] === attributeValue) != null;
    }
    containsOneOf(tagNames) {
        return tagNames.some((tagName) => this.contains(tagName));
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
