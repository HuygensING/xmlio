"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const html_1 = require("../tags/html");
const jsx_1 = require("../tags/jsx");
const xml_1 = require("../tags/xml");
const empty_1 = require("../tags/empty");
class Settings {
    constructor(fields) {
        this.componentsPath = 'components';
        this.outputType = 'xml';
        this.ignore = [];
        this.genericTag = xml_1.default;
        this.writeToOutput = false;
        this.getComponent = (node) => {
            return this.genericTag;
        };
        Object.assign(this, fields);
        if (this.parent == null && this.splitOn == null)
            this.writeToOutput = true;
        this.setTag();
    }
    transformTextNode(text) {
        return text;
    }
    setTag() {
        switch (this.outputType) {
            case 'html':
                this.genericTag = html_1.default;
                break;
            case 'jsx':
                this.genericTag = jsx_1.default;
                break;
            case 'empty':
                this.genericTag = empty_1.default;
                break;
            default:
                this.genericTag = xml_1.default;
                break;
        }
    }
}
exports.default = Settings;
