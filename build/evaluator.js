"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function evaluator(xml, transforms, parserOptions, options) {
    const COLON_REPLACE = '_-_-_-_';
    const proxyElements = new Map();
    const proxyAttributeElements = [];
    const pseudos = [':empty', ':not(', ':first-child', ':last-child', ':nth-child(', ':nth-last-child', ':nth-of-type', ':first-of-type', ':last-of-type', ':only-child'];
    parserOptions = Object.assign({ handleNamespaces: true, namespaces: [] }, parserOptions);
    function exclude(data) {
        trees = trees.map(tree => {
            const selector = (Array.isArray(data.selector)) ? data.selector : [data.selector];
            selector.forEach(s => {
                selectElements(tree, s)
                    .forEach(el => el.parentNode.removeChild(el));
            });
            return tree;
        });
    }
    function change(data) {
        trees = trees.map(tree => {
            const changeFunc = unwrapStringFunction(data.changeFunc);
            const targets = selectElements(tree, data.selector);
            Array.from(targets).forEach(changeFunc);
            return tree;
        });
    }
    function rename(data) {
        trees = trees.map(tree => {
            const oldEls = selectElements(tree, data.selector);
            oldEls.forEach(oldEl => {
                const newEl = renameElement(oldEl, data.newName);
                replaceElement(oldEl, newEl);
            });
            return tree;
        });
    }
    function replace(data) {
        trees = trees.map(tree => replaceInTree(tree, data));
    }
    function replaceInTree(tree, data) {
        const sourceSelectorFunc = unwrapStringFunction(data.sourceSelectorFunc);
        const targets = selectElements(tree, data.targetSelector);
        if (!targets.length)
            console.log('WARNING', `No targets found for ${data.targetSelector}`);
        const used = [];
        Array.from(targets)
            .forEach(target => {
            used.push(target);
            const sourceSelector = sourceSelectorFunc(target);
            const sourceElements = selectElements(tree, sourceSelector);
            const sources = Array.from(sourceElements).filter(source => used.indexOf(source) === -1);
            if (!sources.length) {
                console.log('WARNING', `No sources (${sourceSelector}) found for target: ${data.targetSelector}`);
                return;
            }
            let [firstSource, ...otherSources] = sources;
            if (!data.removeSource)
                firstSource = firstSource.cloneNode(true);
            used.push(firstSource);
            replaceElement(target, firstSource);
            if (!otherSources.length)
                return;
            otherSources
                .filter(source => used.indexOf(source) === -1)
                .forEach(source => {
                if (!data.removeSource)
                    source = source.cloneNode(true);
                used.push(source);
                firstSource.parentNode.insertBefore(source, firstSource.nextSibling);
            });
        });
        return tree;
    }
    function select(data) {
        trees = trees
            .map(tree => {
            const found = selectElements(tree, data.selector);
            if (!found.length)
                return [tree];
            return found.map(wrapTree);
        })
            .reduce((prev, curr) => prev.concat(curr), []);
    }
    function exportAsXml(tree, _xmlOptions) {
        if (tree == null)
            return '';
        const xml = new XMLSerializer().serializeToString(tree);
        return (parserOptions.namespaces.length || !Array.from(tree.attributes).some(attr => /^xmlns/.test(attr.name))) ?
            xml.replace(/\sxmlns(:.*?)?="(.*?)"/usg, '') :
            xml;
    }
    function exportAsData(tree, dataOptions) {
        function elementToDataElement(el) {
            const node = el;
            const attributes = Array.from(node.attributes)
                .reduce((prev, curr) => {
                prev[curr.name] = node.getAttribute(curr.name);
                return prev;
            }, {});
            return { name: node.nodeName.toLowerCase(), attributes, children: [] };
        }
        const nodeByData = new Map();
        const whatToShow = dataOptions.text ? NodeFilter.SHOW_ALL : NodeFilter.SHOW_ELEMENT;
        var treeWalker = document.createTreeWalker(tree, whatToShow);
        const output = elementToDataElement(treeWalker.currentNode);
        if (!dataOptions.deep)
            return output;
        nodeByData.set(treeWalker.currentNode, output);
        while (treeWalker.nextNode()) {
            let dataNode;
            if (treeWalker.currentNode.nodeType === 1) {
                dataNode = elementToDataElement(treeWalker.currentNode);
                nodeByData.set(treeWalker.currentNode, dataNode);
            }
            else if (treeWalker.currentNode.nodeType === 3) {
                if (!treeWalker.currentNode.textContent.trim().length)
                    continue;
                dataNode = treeWalker.currentNode.textContent;
            }
            const parentDataNode = nodeByData.get(treeWalker.currentNode.parentElement);
            parentDataNode.children.push(dataNode);
        }
        return output;
    }
    function exportAsText(tree, textOptions) {
        var treeWalker = document.createTreeWalker(tree, NodeFilter.SHOW_TEXT);
        const text = [];
        const firstText = treeWalker.currentNode.nodeValue != null ? treeWalker.currentNode.nodeValue.trim() : '';
        text.push(firstText);
        while (treeWalker.nextNode()) {
            text.push(treeWalker.currentNode.nodeValue.trim());
        }
        return text
            .filter(t => t != null && t.length)
            .join(textOptions.join);
    }
    function addProxyAttributes(el) {
        if (!parserOptions.handleNamespaces)
            return;
        var treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
        while (treeWalker.nextNode()) {
            const node = treeWalker.currentNode;
            for (const attr of node.attributes) {
                const colonIndex = attr.name.indexOf(':');
                if (colonIndex > 0 &&
                    attr.name.slice(0, colonIndex + 1) !== 'xmlns:') {
                    node.setAttribute(attr.name.replace(/:/usg, COLON_REPLACE), node.getAttribute(attr.name));
                    proxyAttributeElements.push(node);
                }
            }
            if (node.nodeName.indexOf(':') > 0) {
                const proxyElement = renameElement(node, node.nodeName.replace(/:/usg, COLON_REPLACE));
                proxyElements.set(proxyElement, node);
                replaceElement(node, proxyElement);
            }
        }
        return el;
    }
    function removeProxies(el) {
        proxyAttributeElements.forEach(node => {
            for (const attr of node.attributes) {
                if (attr.name.indexOf(COLON_REPLACE) > 0) {
                    node.removeAttribute(attr.name);
                }
            }
        });
        Array.from(proxyElements.entries()).forEach(([proxyEl, origEl]) => replaceElement(proxyEl, origEl));
        return el;
    }
    function wrapXml(xml) {
        const namespaces = parserOptions.namespaces.reduce((prev, ns) => {
            prev += ` xmlns:${ns}="http://example.com"`;
            return prev;
        }, '');
        return `<section${namespaces}>${xml}</section>`;
    }
    function wrapTree(el) {
        const wrapper = document.createElement('section');
        parserOptions.namespaces.forEach(ns => {
            el.setAttribute(`xmlns:${ns}`, 'http://example.com');
        });
        wrapper.appendChild(el);
        return wrapper;
    }
    function unwrap(wrapper) {
        return wrapper.firstChild;
    }
    function unwrapStringFunction(func) {
        const outerFunc = new Function(`return ${func}`);
        return outerFunc();
    }
    function createOutput(exporterOptions) {
        const output = trees
            .map(removeProxies)
            .map(unwrap)
            .map(tree => {
            if (exporterOptions.type === 'xml')
                return exportAsXml(tree, exporterOptions);
            if (exporterOptions.type === 'data')
                return exportAsData(tree, exporterOptions);
            if (exporterOptions.type === 'text')
                return exportAsText(tree, exporterOptions);
        });
        if (!output.length)
            return null;
        if (output.length === 1)
            return output[0];
        return output;
    }
    function selectElements(el, selector) {
        const colonIndex = selector.indexOf(':');
        if (colonIndex > 0 &&
            pseudos.every(pseudo => selector.slice(colonIndex, colonIndex + pseudo.length) !== pseudo)) {
            selector = selector.replace(/:/usg, COLON_REPLACE);
        }
        const elements = el.querySelectorAll(selector);
        return Array.from(elements);
    }
    function renameElement(el, newName) {
        const newEl = document.createElement(newName);
        Array.from(el.attributes).forEach(attr => newEl.setAttribute(attr.name, el.getAttribute(attr.name)));
        newEl.className = el.className;
        let nextNode = el.firstChild;
        while (nextNode) {
            newEl.appendChild(nextNode);
            nextNode = nextNode.nextSibling;
        }
        return newEl;
    }
    function replaceElement(oldEl, newEl) {
        oldEl.parentElement.replaceChild(newEl, oldEl);
    }
    if (options == null || options.type === 'xml') {
        options = Object.assign({ type: 'xml' }, options);
    }
    if (options.type === 'data') {
        options = Object.assign({ deep: true, text: true }, options);
    }
    if (options.type === 'text') {
        options = Object.assign({ join: ' ' }, options);
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(wrapXml(xml), 'application/xml');
    const preparedXml = addProxyAttributes(doc.documentElement);
    let trees = [preparedXml];
    transforms.forEach((transform) => {
        if (transform.type === 'exclude')
            exclude(transform);
        if (transform.type === 'replace')
            replace(transform);
        if (transform.type === 'select')
            select(transform);
        if (transform.type === 'change')
            change(transform);
        if (transform.type === 'rename')
            rename(transform);
    });
    return Array.isArray(options) ?
        options.map(createOutput) :
        createOutput(options);
}
exports.default = evaluator;
