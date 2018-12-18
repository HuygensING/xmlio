"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const puppeteer_1 = tslib_1.__importDefault(require("puppeteer"));
const evaluator_1 = tslib_1.__importDefault(require("./evaluator"));
function logWarning(warning) {
    console.log(`[WARNING] ${warning}`);
}
exports.logWarning = logWarning;
class Xmlio {
    constructor(xml, parserOptions) {
        this.xml = xml;
        this.parserOptions = parserOptions;
        this.transforms = [];
    }
    export(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch({
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]
            });
            const page = yield browser.newPage();
            page.on('console', (msg) => {
                msg = msg.text();
                if (msg.slice(0, 7) === 'WARNING')
                    logWarning(msg.slice(7));
                else
                    console.log('From page: ', msg);
            });
            const output = yield page.evaluate(evaluator_1.default, this.xml, this.transforms, this.parserOptions, options);
            browser.close();
            return output;
        });
    }
    addTransform(transform) {
        this.transforms.push(transform);
        return this;
    }
    change(selector, changeFunc) {
        this.transforms.push({
            selector,
            changeFunc: changeFunc.toString(),
            type: 'change',
        });
        return this;
    }
    rename(selector, newName) {
        this.transforms.push({
            selector,
            newName,
            type: 'rename',
        });
        return this;
    }
    exclude(selector) {
        this.transforms.push({
            selector,
            type: 'exclude'
        });
        return this;
    }
    replace(targetSelector, sourceSelectorFunc, removeSource = true) {
        this.transforms.push({
            removeSource,
            sourceSelectorFunc: sourceSelectorFunc.toString(),
            targetSelector,
            type: 'replace',
        });
        return this;
    }
    select(selector) {
        this.transforms.push({
            selector,
            type: 'select',
        });
        return this;
    }
}
exports.default = Xmlio;
