"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const puppeteer_1 = tslib_1.__importDefault(require("puppeteer"));
const evaluator_1 = tslib_1.__importDefault(require("./evaluator"));
const index_base_1 = tslib_1.__importDefault(require("./index.base"));
function logWarning(warning) {
    console.log(`[WARNING] ${warning}`);
}
class Xmlio extends index_base_1.default {
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
}
exports.default = Xmlio;
