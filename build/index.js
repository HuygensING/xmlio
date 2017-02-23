"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sax = require("sax");
const state_1 = require("./state");
const parse_close_tag_1 = require("./parse-close-tag");
const parse_open_tag_1 = require("./parse-open-tag");
const parse_text_1 = require("./parse-text");
exports.default = (xmlString, tags = [], tagsToSkip = []) => new Promise((resolve, reject) => {
    const state = new state_1.default();
    const parser = sax.parser(true, {});
    parser.onopentag = parse_open_tag_1.default(state, tags, tagsToSkip);
    parser.ontext = parse_text_1.default(state, tagsToSkip);
    parser.onclosetag = parse_close_tag_1.default(state, tagsToSkip);
    parser.onerror = (e) => reject(e);
    parser.onend = () => resolve(state.html);
    parser.write(xmlString).close();
});
