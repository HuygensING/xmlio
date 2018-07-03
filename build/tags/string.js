"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class StringTag extends base_1.default {
    open() {
        return '';
    }
    close() {
        return (this.data.hasOwnProperty('children') && this.data.children.some(child => typeof child === 'string')) ?
            this.state.settings.join :
            '';
    }
}
exports.default = StringTag;
