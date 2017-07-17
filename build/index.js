"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sax = require("sax");
const state_1 = require("./state");
const parse_close_tag_1 = require("./parse-close-tag");
const parse_open_tag_1 = require("./parse-open-tag");
const parse_text_1 = require("./parse-text");
const utils_1 = require("./utils");
const empty_1 = require("./tags/empty");
exports.EmptyTag = empty_1.default;
const html_1 = require("./tags/html");
exports.HtmlTag = html_1.default;
const jsx_1 = require("./tags/jsx");
exports.JsxTag = jsx_1.default;
const xml_1 = require("./tags/xml");
exports.XmlTag = xml_1.default;
exports.default = (xmlString, settings = {}) => new Promise((resolve, reject) => {
    const state = new state_1.default(settings);
    const parser = sax.parser(true, {});
    parser.onopentag = parse_open_tag_1.default(state);
    parser.ontext = parse_text_1.default(state);
    parser.onclosetag = parse_close_tag_1.default(state);
    parser.onerror = (e) => reject(e);
    parser.onend = () => __awaiter(this, void 0, void 0, function* () {
        if (state.settings.outputType === 'json') {
            if (state.settings.parent != null) {
                state.output = `<root>${state.output}</root>`;
            }
            state.output = yield utils_1.xml2json(state.output);
        }
        resolve(state);
    });
    parser.write(xmlString).close();
});
