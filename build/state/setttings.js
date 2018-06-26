"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const html_1 = require("../tags/html");
const jsx_1 = require("../tags/jsx");
const xml_1 = require("../tags/xml");
class Settings {
    constructor(config) {
        this.customState = null;
        this.genericTag = xml_1.default;
        this.ignore = [];
        this.move = null;
        this.outputType = 'xml';
        this.parent = null;
        this.wrapNodes = null;
        for (const property in config) {
            this[property] = config[property];
        }
    }
    getComponent(node) {
        return this.genericTag;
    }
    transformNode(node) {
        return node;
    }
    transformTextNode(text, state) {
        return text;
    }
}
exports.Settings = Settings;
class JsxSettings extends Settings {
    constructor(config) {
        super(config);
        this.bare = false;
        this.componentPath = './components';
        this.concat = true;
        this.export = 'export default';
        this.genericTag = jsx_1.default;
        this.outputType = 'jsx';
        this.passProps = false;
        for (const property in config) {
            this[property] = config[property];
        }
    }
}
exports.JsxSettings = JsxSettings;
class HtmlSettings extends Settings {
    constructor(config) {
        super(config);
        this.genericTag = html_1.default;
        this.outputType = 'html';
        for (const property in config) {
            this[property] = config[property];
        }
    }
}
exports.HtmlSettings = HtmlSettings;
exports.default = Settings;
