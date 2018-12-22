"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const puppeteer_1 = tslib_1.__importDefault(require("puppeteer"));
const evaluator_1 = tslib_1.__importDefault(require("./evaluator"));
const index_base_1 = tslib_1.__importDefault(require("./index.base"));
const handler_defaults_1 = tslib_1.__importDefault(require("./handler.defaults"));
function logWarning(warning) {
    console.log(`[WARNING] ${warning}`);
}
class Xmlio extends index_base_1.default {
    export(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (options == null)
                options = handler_defaults_1.default.xml;
            else if (Array.isArray(options))
                options = options.map(option => (Object.assign({}, handler_defaults_1.default[option.type], option)));
            else
                options = Object.assign({}, handler_defaults_1.default[options.type], options);
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
            const output = yield page.evaluate(evaluator_1.default, this.xml, this.transformers, this.parserOptions, options);
            browser.close();
            return output;
        });
    }
}
exports.default = Xmlio;
