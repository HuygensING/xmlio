"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_defaults_1 = require("./handler.defaults");
exports.handlerDefaults = handler_defaults_1.default;
const validators_1 = require("./validators");
const transformers_1 = require("./evaluator/transformers");
const exporters_1 = require("./evaluator/exporters");
const utils_1 = require("./evaluator/utils");
const proxy_handler_1 = require("./evaluator/proxy-handler");
class XMLio {
    constructor(doc) {
        this.transformers = [];
        this.docs = [];
        this.createOutput = (exporters) => {
            const hasSelect = this.transformers.some(t => t.type === 'select');
            const output = this.docs
                .map((tree) => proxy_handler_1.removeProxies(tree))
                .map(tree => {
                let outputPart = exporters.map(exporter => {
                    if (exporter.type === 'xml')
                        return exporters_1.exportAsXml(tree, exporter);
                    if (exporter.type === 'data')
                        return exporters_1.exportAsData(tree, exporter);
                    if (exporter.type === 'text')
                        return exporters_1.exportAsText(tree, exporter);
                    if (exporter.type === 'dom')
                        return exporters_1.exportAsDOM(tree, exporter);
                });
                return outputPart.length === 1 ? outputPart[0] : outputPart;
            });
            if (!hasSelect && output.length !== 1)
                console.error('Output should contain one element!');
            return hasSelect ? output : output[0];
        };
        doc = proxy_handler_1.addProxies(doc);
        this.root = [doc.cloneNode(true)];
        this.docs = [doc];
    }
    export(options) {
        if (options == null)
            options = [handler_defaults_1.default.xml];
        else {
            if (!Array.isArray(options))
                options = [options];
            options = options.map(option => (Object.assign({}, handler_defaults_1.default[option.type], option)));
        }
        this.applyTransformers();
        const output = this.createOutput(options);
        this.reset();
        return output;
    }
    persist() {
        this.applyTransformers();
        this.root = this.docs.map(tree => tree.cloneNode(true));
        this.reset();
        return this;
    }
    addTransform(transformer) {
        transformer = Object.assign({}, handler_defaults_1.default[transformer.type], transformer);
        const validate = validators_1.default[transformer.type];
        if (validate(transformer))
            this.transformers.push(transformer);
        return this;
    }
    change(selector, changeFunc) {
        return this.addTransform({
            changeFunc,
            selector,
            type: 'change',
        });
    }
    rename(selector, newName) {
        return this.addTransform({
            newName,
            selector,
            type: 'rename',
        });
    }
    exclude(selector) {
        return this.addTransform({
            selector,
            type: 'exclude',
        });
    }
    replace(targetSelector, sourceSelectorFunc, removeSource = true) {
        return this.addTransform({
            removeSource,
            sourceSelectorFunc,
            targetSelector,
            type: 'replace',
        });
    }
    select(selector) {
        return this.addTransform({
            selector,
            type: 'select',
        });
    }
    reset() {
        this.transformers = [];
        this.docs = this.root.map(el => el.cloneNode(true));
    }
    applyTransformers() {
        this.transformers.forEach((transformer) => {
            if (transformer.type === 'exclude')
                this.docs = transformers_1.exclude(this.docs, transformer);
            if (transformer.type === 'replace')
                this.docs = transformers_1.replace(this.docs, transformer);
            if (transformer.type === 'select')
                this.docs = this.selectTransformer(this.docs, transformer);
            if (transformer.type === 'change')
                this.docs = transformers_1.change(this.docs, transformer);
            if (transformer.type === 'rename')
                this.docs = this.renameTransformer(this.docs, transformer);
        });
    }
    renameTransformer(docs, data) {
        return docs.map(doc => {
            const oldEls = utils_1.selectElements(doc, data.selector);
            oldEls.forEach(oldEl => {
                const newEl = utils_1.renameElement(doc, oldEl, data.newName);
                utils_1.replaceElement(oldEl, newEl);
            });
            return doc;
        });
    }
    selectTransformer(docs, data) {
        return docs
            .map(doc => utils_1.selectElements(doc, data.selector)
            .map(el => {
            const docCopy = doc.cloneNode(true);
            docCopy.replaceChild(el, docCopy.documentElement);
            return docCopy;
        }))
            .reduce((prev, curr) => prev.concat(curr), []);
    }
}
exports.default = XMLio;
