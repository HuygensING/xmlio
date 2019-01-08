(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["XMLio"] = factory();
	else
		root["XMLio"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__extends\", function() { return __extends; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__assign\", function() { return __assign; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__rest\", function() { return __rest; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__decorate\", function() { return __decorate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__param\", function() { return __param; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__metadata\", function() { return __metadata; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__awaiter\", function() { return __awaiter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__generator\", function() { return __generator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__exportStar\", function() { return __exportStar; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__values\", function() { return __values; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__read\", function() { return __read; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__spread\", function() { return __spread; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__await\", function() { return __await; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__asyncGenerator\", function() { return __asyncGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__asyncDelegator\", function() { return __asyncDelegator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__asyncValues\", function() { return __asyncValues; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__makeTemplateObject\", function() { return __makeTemplateObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__importStar\", function() { return __importStar; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__importDefault\", function() { return __importDefault; });\n/*! *****************************************************************************\r\nCopyright (c) Microsoft Corporation. All rights reserved.\r\nLicensed under the Apache License, Version 2.0 (the \"License\"); you may not use\r\nthis file except in compliance with the License. You may obtain a copy of the\r\nLicense at http://www.apache.org/licenses/LICENSE-2.0\r\n\r\nTHIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\r\nKIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED\r\nWARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,\r\nMERCHANTABLITY OR NON-INFRINGEMENT.\r\n\r\nSee the Apache Version 2.0 License for specific language governing permissions\r\nand limitations under the License.\r\n***************************************************************************** */\r\n/* global Reflect, Promise */\r\n\r\nvar extendStatics = function(d, b) {\r\n    extendStatics = Object.setPrototypeOf ||\r\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n    return extendStatics(d, b);\r\n};\r\n\r\nfunction __extends(d, b) {\r\n    extendStatics(d, b);\r\n    function __() { this.constructor = d; }\r\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n}\r\n\r\nvar __assign = function() {\r\n    __assign = Object.assign || function __assign(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\r\n        }\r\n        return t;\r\n    }\r\n    return __assign.apply(this, arguments);\r\n}\r\n\r\nfunction __rest(s, e) {\r\n    var t = {};\r\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\r\n        t[p] = s[p];\r\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\r\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)\r\n            t[p[i]] = s[p[i]];\r\n    return t;\r\n}\r\n\r\nfunction __decorate(decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n}\r\n\r\nfunction __param(paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n}\r\n\r\nfunction __metadata(metadataKey, metadataValue) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(metadataKey, metadataValue);\r\n}\r\n\r\nfunction __awaiter(thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n}\r\n\r\nfunction __generator(thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n}\r\n\r\nfunction __exportStar(m, exports) {\r\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\r\n}\r\n\r\nfunction __values(o) {\r\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator], i = 0;\r\n    if (m) return m.call(o);\r\n    return {\r\n        next: function () {\r\n            if (o && i >= o.length) o = void 0;\r\n            return { value: o && o[i++], done: !o };\r\n        }\r\n    };\r\n}\r\n\r\nfunction __read(o, n) {\r\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\r\n    if (!m) return o;\r\n    var i = m.call(o), r, ar = [], e;\r\n    try {\r\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\r\n    }\r\n    catch (error) { e = { error: error }; }\r\n    finally {\r\n        try {\r\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\r\n        }\r\n        finally { if (e) throw e.error; }\r\n    }\r\n    return ar;\r\n}\r\n\r\nfunction __spread() {\r\n    for (var ar = [], i = 0; i < arguments.length; i++)\r\n        ar = ar.concat(__read(arguments[i]));\r\n    return ar;\r\n}\r\n\r\nfunction __await(v) {\r\n    return this instanceof __await ? (this.v = v, this) : new __await(v);\r\n}\r\n\r\nfunction __asyncGenerator(thisArg, _arguments, generator) {\r\n    if (!Symbol.asyncIterator) throw new TypeError(\"Symbol.asyncIterator is not defined.\");\r\n    var g = generator.apply(thisArg, _arguments || []), i, q = [];\r\n    return i = {}, verb(\"next\"), verb(\"throw\"), verb(\"return\"), i[Symbol.asyncIterator] = function () { return this; }, i;\r\n    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }\r\n    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }\r\n    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }\r\n    function fulfill(value) { resume(\"next\", value); }\r\n    function reject(value) { resume(\"throw\", value); }\r\n    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }\r\n}\r\n\r\nfunction __asyncDelegator(o) {\r\n    var i, p;\r\n    return i = {}, verb(\"next\"), verb(\"throw\", function (e) { throw e; }), verb(\"return\"), i[Symbol.iterator] = function () { return this; }, i;\r\n    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === \"return\" } : f ? f(v) : v; } : f; }\r\n}\r\n\r\nfunction __asyncValues(o) {\r\n    if (!Symbol.asyncIterator) throw new TypeError(\"Symbol.asyncIterator is not defined.\");\r\n    var m = o[Symbol.asyncIterator], i;\r\n    return m ? m.call(o) : (o = typeof __values === \"function\" ? __values(o) : o[Symbol.iterator](), i = {}, verb(\"next\"), verb(\"throw\"), verb(\"return\"), i[Symbol.asyncIterator] = function () { return this; }, i);\r\n    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }\r\n    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }\r\n}\r\n\r\nfunction __makeTemplateObject(cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\n\r\nfunction __importStar(mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result.default = mod;\r\n    return result;\r\n}\r\n\r\nfunction __importDefault(mod) {\r\n    return (mod && mod.__esModule) ? mod : { default: mod };\r\n}\r\n\n\n//# sourceURL=webpack://XMLio/./node_modules/tslib/tslib.es6.js?");

/***/ }),

/***/ "./src/evaluator/exporters.ts":
/*!************************************!*\
  !*** ./src/evaluator/exporters.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction exportAsXml(tree, _xmlOptions, parserOptions) {\n    if (tree == null)\n        return '';\n    const xml = new XMLSerializer().serializeToString(tree);\n    return (parserOptions.namespaces.length ||\n        (tree.attributes != null &&\n            !Array.from(tree.attributes).some(attr => /^xmlns/.test(attr.name)))) ?\n        xml.replace(/\\sxmlns(:.*?)?=\"(.*?)\"/usg, '') :\n        xml;\n}\nexports.exportAsXml = exportAsXml;\nfunction exportAsData(tree, dataOptions) {\n    function elementToDataElement(el) {\n        const node = el;\n        const attributes = Array.from(node.attributes)\n            .reduce((prev, curr) => {\n            prev[curr.name] = node.getAttribute(curr.name);\n            return prev;\n        }, {});\n        return { name: node.nodeName.toLowerCase(), attributes, children: [] };\n    }\n    if (!dataOptions.deep) {\n        let root = tree;\n        while (!root.childNodes.length) {\n            root = root.nextElementSibling;\n        }\n        return elementToDataElement(root);\n    }\n    const nodeByData = new Map();\n    const whatToShow = dataOptions.text ? NodeFilter.SHOW_ALL : NodeFilter.SHOW_ELEMENT;\n    var treeWalker = document.createTreeWalker(tree, whatToShow);\n    const output = elementToDataElement(treeWalker.currentNode);\n    nodeByData.set(treeWalker.currentNode, output);\n    while (treeWalker.nextNode()) {\n        let dataNode;\n        if (treeWalker.currentNode.nodeType === 1) {\n            dataNode = elementToDataElement(treeWalker.currentNode);\n            nodeByData.set(treeWalker.currentNode, dataNode);\n        }\n        else if (treeWalker.currentNode.nodeType === 3) {\n            if (!treeWalker.currentNode.textContent.trim().length)\n                continue;\n            dataNode = treeWalker.currentNode.textContent;\n        }\n        const parentDataNode = nodeByData.get(treeWalker.currentNode.parentElement);\n        parentDataNode.children.push(dataNode);\n    }\n    return output;\n}\nexports.exportAsData = exportAsData;\nfunction exportAsText(tree, textOptions) {\n    var treeWalker = document.createTreeWalker(tree, NodeFilter.SHOW_TEXT);\n    const text = [];\n    const firstText = treeWalker.currentNode.nodeValue != null ? treeWalker.currentNode.nodeValue.trim() : '';\n    text.push(firstText);\n    while (treeWalker.nextNode()) {\n        text.push(treeWalker.currentNode.nodeValue.trim());\n    }\n    return text\n        .filter(t => t != null && t.length)\n        .join(textOptions.join);\n}\nexports.exportAsText = exportAsText;\n\n\n//# sourceURL=webpack://XMLio/./src/evaluator/exporters.ts?");

/***/ }),

/***/ "./src/evaluator/proxy-handler.ts":
/*!****************************************!*\
  !*** ./src/evaluator/proxy-handler.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/evaluator/utils.ts\");\nexports.COLON_REPLACE = '_-_-_-_';\nfunction createProxyName(name) {\n    return name.replace(/:/usg, exports.COLON_REPLACE);\n}\nclass ProxyHandler {\n    constructor(parserOptions) {\n        this.parserOptions = parserOptions;\n        this.proxyElements = new Map();\n        this.proxyAttributeElements = [];\n    }\n    addProxies(el) {\n        if (!this.parserOptions.handleNamespaces)\n            return;\n        const toReplace = [];\n        var treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);\n        while (treeWalker.nextNode()) {\n            const node = treeWalker.currentNode;\n            for (const attr of node.attributes) {\n                const colonIndex = attr.name.indexOf(':');\n                if (colonIndex > 0 &&\n                    attr.name.slice(0, colonIndex + 1) !== 'xmlns:') {\n                    node.setAttribute(createProxyName(attr.name), node.getAttribute(attr.name));\n                    this.proxyAttributeElements.push(node);\n                }\n            }\n            if (node.nodeName.indexOf(':') > 0) {\n                toReplace.push(node);\n            }\n        }\n        toReplace.forEach(node => {\n            const proxyElement = utils_1.renameElement(node, createProxyName(node.nodeName));\n            this.proxyElements.set(proxyElement, node);\n            utils_1.replaceElement(node, proxyElement);\n        });\n        return el;\n    }\n    removeProxies(el) {\n        this.proxyAttributeElements.forEach(node => {\n            for (const attr of node.attributes) {\n                if (attr.name.indexOf(exports.COLON_REPLACE) > 0) {\n                    node.removeAttribute(attr.name);\n                }\n            }\n        });\n        Array.from(this.proxyElements.entries()).forEach(([proxyEl, origEl]) => {\n            utils_1.replaceElement(proxyEl, origEl);\n        });\n        return el;\n    }\n}\nexports.default = ProxyHandler;\n\n\n//# sourceURL=webpack://XMLio/./src/evaluator/proxy-handler.ts?");

/***/ }),

/***/ "./src/evaluator/transformers.ts":
/*!***************************************!*\
  !*** ./src/evaluator/transformers.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/evaluator/utils.ts\");\nconst proxy_handler_1 = __webpack_require__(/*! ./proxy-handler */ \"./src/evaluator/proxy-handler.ts\");\nfunction exclude(trees, data) {\n    return trees.map(tree => {\n        const selector = (Array.isArray(data.selector)) ? data.selector : [data.selector];\n        selector.forEach(s => {\n            utils_1.selectElements(tree, s)\n                .forEach(el => el.parentNode.removeChild(el));\n        });\n        return tree;\n    });\n}\nexports.exclude = exclude;\nfunction change(trees, data) {\n    return trees.map(tree => {\n        const changeFunc = utils_1.unwrapStringFunction(data.changeFunc);\n        const targets = utils_1.selectElements(tree, data.selector);\n        Array.from(targets).forEach(changeFunc);\n        return tree;\n    });\n}\nexports.change = change;\nfunction rename(trees, data) {\n    return trees.map(tree => {\n        const oldEls = utils_1.selectElements(tree, data.selector);\n        oldEls.forEach(oldEl => {\n            const newEl = utils_1.renameElement(oldEl, data.newName);\n            utils_1.replaceElement(oldEl, newEl);\n        });\n        return tree;\n    });\n}\nexports.rename = rename;\nfunction replace(trees, data) {\n    return trees.map(tree => replaceInTree(tree, data));\n}\nexports.replace = replace;\nfunction replaceInTree(tree, data) {\n    const sourceSelectorFunc = utils_1.unwrapStringFunction(data.sourceSelectorFunc);\n    const targets = utils_1.selectElements(tree, data.targetSelector);\n    if (!targets.length)\n        console.log('WARNING', `No targets found for ${data.targetSelector}`);\n    const used = [];\n    Array.from(targets)\n        .forEach(target => {\n        used.push(target);\n        const sourceSelector = sourceSelectorFunc(target);\n        let sources = [];\n        if (sourceSelector instanceof Node) {\n            sources.push(sourceSelector);\n        }\n        else {\n            const sourceElements = utils_1.selectElements(tree, sourceSelector);\n            sources = Array.from(sourceElements).filter(source => used.indexOf(source) === -1);\n        }\n        if (!sources.length) {\n            const attrs = Array.from(target.attributes).reduce((prev, curr) => {\n                if (curr.name.indexOf(proxy_handler_1.COLON_REPLACE) > -1)\n                    return prev;\n                if (curr.name === 'class' && curr.value === '')\n                    return prev;\n                prev += `[${curr.name}=${curr.value}]`;\n                return prev;\n            }, '');\n            console.log('WARNING', `No sources (${sourceSelector}) found for target: ${data.targetSelector}${attrs}`);\n            return;\n        }\n        let [firstSource, ...otherSources] = sources;\n        if (!data.removeSource)\n            firstSource = firstSource.cloneNode(true);\n        used.push(firstSource);\n        utils_1.replaceElement(target, firstSource);\n        if (!otherSources.length)\n            return;\n        otherSources\n            .filter(source => used.indexOf(source) === -1)\n            .forEach(source => {\n            if (!data.removeSource)\n                source = source.cloneNode(true);\n            used.push(source);\n            firstSource.parentNode.insertBefore(source, firstSource.nextSibling);\n        });\n    });\n    return tree;\n}\nfunction select(trees, data, parserOptions) {\n    return trees\n        .map(tree => {\n        const found = utils_1.selectElements(tree, data.selector);\n        if (!found.length)\n            return [tree];\n        return found.map(utils_1.wrapTree(parserOptions));\n    })\n        .reduce((prev, curr) => prev.concat(curr), []);\n}\nexports.select = select;\n\n\n//# sourceURL=webpack://XMLio/./src/evaluator/transformers.ts?");

/***/ }),

/***/ "./src/evaluator/utils.ts":
/*!********************************!*\
  !*** ./src/evaluator/utils.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst proxy_handler_1 = __webpack_require__(/*! ./proxy-handler */ \"./src/evaluator/proxy-handler.ts\");\nconst pseudos = [':empty', ':not(', ':first-child', ':last-child', ':nth-child(', ':nth-last-child', ':nth-of-type', ':first-of-type', ':last-of-type', ':only-child'];\nfunction wrapXml(xml, parserOptions) {\n    const namespaces = parserOptions.namespaces.reduce((prev, ns) => {\n        prev += ` xmlns:${ns}=\"http://example.com\"`;\n        return prev;\n    }, '');\n    return `<section${namespaces}>${xml}</section>`;\n}\nexports.wrapXml = wrapXml;\nfunction wrapTree(parserOptions) {\n    return function (el) {\n        const wrapper = document.createElement('section');\n        parserOptions.namespaces.forEach(ns => {\n            el.setAttribute(`xmlns:${ns}`, 'http://example.com');\n        });\n        wrapper.appendChild(el);\n        return wrapper;\n    };\n}\nexports.wrapTree = wrapTree;\nfunction unwrap(wrapper) {\n    return wrapper.firstChild;\n}\nexports.unwrap = unwrap;\nfunction unwrapStringFunction(func) {\n    const outerFunc = new Function(`return ${func}`);\n    return outerFunc();\n}\nexports.unwrapStringFunction = unwrapStringFunction;\nfunction selectElements(el, selector) {\n    const colonIndex = selector.indexOf(':');\n    if (colonIndex > 0 &&\n        pseudos.every(pseudo => selector.slice(colonIndex, colonIndex + pseudo.length) !== pseudo)) {\n        selector = selector.replace(/:/usg, proxy_handler_1.COLON_REPLACE).toLowerCase();\n    }\n    const elements = el.querySelectorAll(selector);\n    return Array.from(elements);\n}\nexports.selectElements = selectElements;\nfunction renameElement(el, newName) {\n    const newEl = document.createElement(newName);\n    Array.from(el.attributes).forEach(attr => newEl.setAttribute(attr.name, el.getAttribute(attr.name)));\n    newEl.className = el.className;\n    let nextNode = el.firstChild;\n    while (nextNode) {\n        newEl.appendChild(nextNode.cloneNode(true));\n        nextNode = nextNode.nextSibling;\n    }\n    return newEl;\n}\nexports.renameElement = renameElement;\nfunction replaceElement(oldEl, newEl) {\n    if (oldEl.parentElement == null)\n        return;\n    oldEl.parentElement.replaceChild(newEl, oldEl);\n}\nexports.replaceElement = replaceElement;\n\n\n//# sourceURL=webpack://XMLio/./src/evaluator/utils.ts?");

/***/ }),

/***/ "./src/handler.defaults.ts":
/*!*********************************!*\
  !*** ./src/handler.defaults.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst handlerDefaults = {\n    change: {\n        active: true,\n        changeFunc: '',\n        selector: '',\n        type: 'change',\n    },\n    exclude: {\n        active: true,\n        selector: [],\n        type: 'exclude',\n    },\n    rename: {\n        active: true,\n        selector: '',\n        newName: '',\n        type: 'rename',\n    },\n    replace: {\n        active: true,\n        removeSource: true,\n        sourceSelectorFunc: '',\n        targetSelector: '',\n        type: 'replace',\n    },\n    select: {\n        active: true,\n        selector: '',\n        type: 'select',\n    },\n    xml: {\n        active: true,\n        type: 'xml'\n    },\n    data: {\n        active: true,\n        deep: true,\n        text: true,\n        type: 'data'\n    },\n    text: {\n        active: true,\n        join: ' ',\n        type: 'text'\n    }\n};\nexports.default = handlerDefaults;\n\n\n//# sourceURL=webpack://XMLio/./src/handler.defaults.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst tslib_1 = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\nconst handler_defaults_1 = tslib_1.__importDefault(__webpack_require__(/*! ./handler.defaults */ \"./src/handler.defaults.ts\"));\nexports.handlerDefaults = handler_defaults_1.default;\nconst validators_1 = tslib_1.__importDefault(__webpack_require__(/*! ./validators */ \"./src/validators.ts\"));\nconst transformers_1 = __webpack_require__(/*! ./evaluator/transformers */ \"./src/evaluator/transformers.ts\");\nconst exporters_1 = __webpack_require__(/*! ./evaluator/exporters */ \"./src/evaluator/exporters.ts\");\nconst utils_1 = __webpack_require__(/*! ./evaluator/utils */ \"./src/evaluator/utils.ts\");\nconst proxy_handler_1 = tslib_1.__importDefault(__webpack_require__(/*! ./evaluator/proxy-handler */ \"./src/evaluator/proxy-handler.ts\"));\nclass XMLio {\n    constructor(xml, parserOptions) {\n        this.xml = xml;\n        this.parserOptions = parserOptions;\n        this.transformers = [];\n        this.trees = [];\n        this.createOutput = (exporter) => {\n            const output = this.trees\n                .map((tree) => this.proxyHandler.removeProxies(tree))\n                .map(utils_1.unwrap)\n                .map(tree => {\n                if (exporter.type === 'xml')\n                    return exporters_1.exportAsXml(tree, exporter, this.parserOptions);\n                if (exporter.type === 'data')\n                    return exporters_1.exportAsData(tree, exporter);\n                if (exporter.type === 'text')\n                    return exporters_1.exportAsText(tree, exporter);\n            });\n            if (!output.length)\n                return null;\n            return (output.length === 1) ? output[0] : output;\n        };\n        this.parserOptions = Object.assign({ handleNamespaces: true, namespaces: [] }, parserOptions);\n        this.proxyHandler = new proxy_handler_1.default(this.parserOptions);\n        const parser = new DOMParser();\n        const doc = parser.parseFromString(utils_1.wrapXml(xml, this.parserOptions), 'application/xml');\n        const root = this.proxyHandler.addProxies(doc.documentElement);\n        let firstChild = root.firstChild;\n        while (firstChild != null && !firstChild.childNodes.length) {\n            const nextChild = firstChild.nextSibling;\n            firstChild.parentNode.removeChild(firstChild);\n            firstChild = nextChild;\n        }\n        this.root = root.cloneNode(true);\n        this.trees = [root];\n    }\n    export(options) {\n        if (options == null)\n            options = [handler_defaults_1.default.xml];\n        else {\n            if (!Array.isArray(options))\n                options = [options];\n            options = options.map(option => (Object.assign({}, handler_defaults_1.default[option.type], option)));\n        }\n        this.applyTransformers();\n        let output = options.map(this.createOutput);\n        output = output.length === 1 ? output[0] : output;\n        this.reset();\n        return output;\n    }\n    reset() {\n        this.transformers = [];\n        this.trees = [this.root.cloneNode(true)];\n    }\n    applyTransformers() {\n        this.transformers.forEach((transformer) => {\n            if (transformer.type === 'exclude')\n                this.trees = transformers_1.exclude(this.trees, transformer);\n            if (transformer.type === 'replace')\n                this.trees = transformers_1.replace(this.trees, transformer);\n            if (transformer.type === 'select')\n                this.trees = transformers_1.select(this.trees, transformer, this.parserOptions);\n            if (transformer.type === 'change')\n                this.trees = transformers_1.change(this.trees, transformer);\n            if (transformer.type === 'rename')\n                this.trees = transformers_1.rename(this.trees, transformer);\n        });\n    }\n    addTransform(transformer) {\n        transformer = Object.assign({}, handler_defaults_1.default[transformer.type], transformer);\n        const validate = validators_1.default[transformer.type];\n        if (validate(transformer))\n            this.transformers.push(transformer);\n        return this;\n    }\n    change(selector, changeFunc) {\n        return this.addTransform({\n            changeFunc: changeFunc.toString(),\n            selector,\n            type: 'change',\n        });\n    }\n    rename(selector, newName) {\n        return this.addTransform({\n            newName,\n            selector,\n            type: 'rename',\n        });\n    }\n    exclude(selector) {\n        return this.addTransform({\n            selector,\n            type: 'exclude',\n        });\n    }\n    replace(targetSelector, sourceSelectorFunc, removeSource = true) {\n        return this.addTransform({\n            removeSource,\n            sourceSelectorFunc: sourceSelectorFunc.toString(),\n            targetSelector,\n            type: 'replace',\n        });\n    }\n    select(selector) {\n        return this.addTransform({\n            selector,\n            type: 'select',\n        });\n    }\n}\nexports.default = XMLio;\n\n\n//# sourceURL=webpack://XMLio/./src/index.ts?");

/***/ }),

/***/ "./src/validators.ts":
/*!***************************!*\
  !*** ./src/validators.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst validators = {\n    change: function (props) {\n        return props.changeFunc.length > 0 && props.selector.length > 0;\n    },\n    exclude: function (props) {\n        return props.selector.length > 0;\n    },\n    rename: function (props) {\n        return props.selector.length > 0 && props.newName.length > 0;\n    },\n    replace: function (props) {\n        return props.targetSelector.length > 0 && props.sourceSelectorFunc.length > 0;\n    },\n    select: function (props) {\n        return props.selector.length > 0;\n    }\n};\nexports.default = validators;\n\n\n//# sourceURL=webpack://XMLio/./src/validators.ts?");

/***/ })

/******/ })["default"];
});