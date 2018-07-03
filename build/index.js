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
const xml2tree_1 = require("xml2tree");
const utils_1 = require("./utils");
const setttings_1 = require("./state/setttings");
const _index_1 = require("./_index");
exports.StringTag = _index_1.StringTag;
exports.HtmlTag = _index_1.HtmlTag;
exports.JsxTag = _index_1.JsxTag;
exports.iterateTree = _index_1.iterateTree;
const state_1 = require("./state");
exports.XmlioState = state_1.default;
const analyze_1 = require("./analyze");
function xmlToTree(input, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield xml2tree_1.default(input, options);
    });
}
exports.xmlToTree = xmlToTree;
function xmlioApi(tree) {
    let _value = tree;
    return {
        analyze: function analyze() {
            return analyze_1.default(utils_1.castArray(_value));
        },
        append: function append(nodesToAdd, parent) {
            _value = utils_1.castArray(_value).map(v => _index_1.addToTree(v, nodesToAdd, parent));
            return this;
        },
        move: function move(sourceSelector, targetSelector, append) {
            _value = utils_1.castArray(_value).map(v => _index_1.moveNode(v, sourceSelector, targetSelector, append));
            return this;
        },
        prepend: function prepend(nodesToAdd, parent) {
            _value = utils_1.castArray(_value).map(v => _index_1.addToTree(v, nodesToAdd, parent, false));
            return this;
        },
        replace: function replace(sourceSelector, targetSelectorFunc) {
            _value = utils_1.castArray(_value).map(v => _index_1.replaceNodes(v, sourceSelector, targetSelectorFunc));
            return this;
        },
        split: function split(selector) {
            _value = utils_1.castArray(_value)
                .map(v => _index_1.filterFromTree(v, selector))
                .reduce((prev, curr) => prev.concat(curr), []);
            return this;
        },
        toHtml: function toHtml(settings) {
            settings = new setttings_1.HtmlSettings(settings);
            const html = utils_1.castArray(_value).map(v => _index_1.fromTree(v, new state_1.default(settings)));
            if (html.length === 1)
                return html[0];
            return html;
        },
        toJsx: function toJsx(settings) {
            settings = new setttings_1.JsxSettings(settings);
            const state = new state_1.default(settings);
            const jsx = utils_1.castArray(_value).map(v => {
                let str = _index_1.fromTree(v, state);
                if (settings.bare)
                    return str;
                const props = settings.passProps ? 'props' : '';
                return [
                    `import * as React from 'react'`,
                    `import {${[...state.usedTags].join(', ')}} from '${settings.componentPath}'`,
                    `${settings.export} (${props}) => ${str}`
                ].join('\n');
            });
            return (jsx.length === 1) ? [jsx[0], state] : [jsx, state];
        },
        toString: function toString(settings) {
            settings = new setttings_1.StringSettings(settings);
            const strArr = utils_1.castArray(_value).map(v => {
                let str = _index_1.fromTree(v, new state_1.default(settings));
                const joinIndex = str.length - settings.join.length;
                if (str.slice(joinIndex) === settings.join) {
                    str = str.slice(0, joinIndex);
                }
                return str;
            });
            if (!strArr.length)
                return '';
            if (strArr.length === 1)
                return strArr[0];
            return strArr;
        },
        toXml: function toXml(settings) {
            settings = new setttings_1.Settings(settings);
            const xml = utils_1.castArray(_value).map(v => _index_1.fromTree(v, new state_1.default(settings)));
            if (xml.length === 1)
                return xml[0];
            return xml;
        },
        transformNode: function transformNode(func) {
            _value = utils_1.castArray(_value).map((node) => _index_1.iterateTree(node, func));
            return this;
        },
        value: function value() {
            if (Array.isArray(_value)) {
                if (_value.length === 1)
                    return _value[0];
                else
                    console.error('Cannot return a value from an array with size > 1');
            }
            else {
                return _value;
            }
        },
        values: function values() {
            if (!Array.isArray(_value))
                return [_value];
            return _value;
        },
        wrap: function wrap(selector, parent) {
            _value = utils_1.castArray(_value).map(v => _index_1.wrapNodes(v, selector, parent));
            return this;
        }
    };
}
exports.default = xmlioApi;
