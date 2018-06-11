"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const html_1 = require("../tags/html");
const jsx_1 = require("../tags/jsx");
const xml_1 = require("../tags/xml");
const empty_1 = require("../tags/empty");
class SettingsConfig {
    constructor(config) {
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
    transformTextNode(text) {
        return text;
    }
}
exports.SettingsConfig = SettingsConfig;
const defaultConfig = {
    componentPath: './components',
    customState: null,
    genericTag: xml_1.default,
    ignore: [],
    move: null,
    outputType: 'xml',
    parent: null,
    passProps: false,
    wrapNodes: null
};
class Settings extends SettingsConfig {
    constructor(config) {
        super(Object.assign({}, defaultConfig, config));
        this.setTag();
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
