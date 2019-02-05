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
    constructor(doc, parserOptions) {
        this.doc = doc;
        this.parserOptions = parserOptions;
        this.transformers = [];
        this.trees = [];
        this.createOutput = (exporter) => {
            const output = this.trees
                .map((tree) => this.proxyHandler.removeProxies(tree))
                .map(utils_1.unwrap)
                .map(tree => {
                if (exporter.type === 'xml')
                    return exporters_1.exportAsXml(tree, exporter, this.parserOptions);
                if (exporter.type === 'data')
                    return exporters_1.exportAsData(tree, exporter);
                if (exporter.type === 'text')
                    return exporters_1.exportAsText(tree, exporter);
                if (exporter.type === 'dom')
                    return exporters_1.exportAsDOM(tree, exporter);
            });
            if (!output.length)
                return null;
            return (output.length === 1) ? output[0] : output;
        };
        this.parserOptions = Object.assign({ handleNamespaces: true, namespaces: [] }, parserOptions);
        this.proxyHandler = new proxy_handler_1.default(doc, this.parserOptions);
        let root = doc.createElement('root');
        root.appendChild(doc.documentElement);
        root = this.proxyHandler.addProxies(root);
        this.root = [root.cloneNode(true)];
        this.trees = [root];
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
        let output = options.map(this.createOutput);
        output = output.length === 1 ? output[0] : output;
        this.reset();
        return output;
    }
    persist() {
        this.applyTransformers();
        this.root = this.trees.map(tree => tree.cloneNode(true));
        this.reset();
        return this;
    }
    reset() {
        this.transformers = [];
        this.trees = this.root.map(el => el.cloneNode(true));
    }
    renameTransformer(trees, data) {
        return trees.map(tree => {
            const oldEls = utils_1.selectElements(tree, data.selector);
            oldEls.forEach(oldEl => {
                const newEl = utils_1.renameElement(this.doc, oldEl, data.newName);
                utils_1.replaceElement(oldEl, newEl);
            });
            return tree;
        });
    }
    selectTransformer(trees, data, parserOptions) {
        return trees
            .map(tree => {
            const found = utils_1.selectElements(tree, data.selector);
            return found.map(utils_1.wrapTree(this.doc, parserOptions));
        })
            .reduce((prev, curr) => prev.concat(curr), []);
    }
    applyTransformers() {
        this.transformers.forEach((transformer) => {
            if (transformer.type === 'exclude')
                this.trees = transformers_1.exclude(this.trees, transformer);
            if (transformer.type === 'replace')
                this.trees = transformers_1.replace(this.trees, transformer);
            if (transformer.type === 'select')
                this.trees = this.selectTransformer(this.trees, transformer, this.parserOptions);
            if (transformer.type === 'change')
                this.trees = transformers_1.change(this.trees, transformer);
            if (transformer.type === 'rename')
                this.trees = this.renameTransformer(this.trees, transformer);
        });
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
}
exports.default = XMLio;
