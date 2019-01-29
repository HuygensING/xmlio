"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exportAsXml(tree, _xmlOptions, parserOptions) {
    if (tree == null)
        return '';
    const xml = new XMLSerializer().serializeToString(tree);
    return (parserOptions.namespaces.length ||
        (tree.attributes != null &&
            !Array.from(tree.attributes).some(attr => /^xmlns/.test(attr.name)))) ?
        xml.replace(/\sxmlns(:.*?)?="(.*?)"/ug, '') :
        xml;
}
exports.exportAsXml = exportAsXml;
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
    if (!dataOptions.deep) {
        return elementToDataElement(tree);
    }
    const nodeByData = new Map();
    const whatToShow = dataOptions.text ? NodeFilter.SHOW_ALL : NodeFilter.SHOW_ELEMENT;
    var treeWalker = document.createTreeWalker(tree, whatToShow);
    const output = elementToDataElement(treeWalker.currentNode);
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
exports.exportAsData = exportAsData;
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
exports.exportAsText = exportAsText;
function exportAsDOM(tree, _domOptions) {
    return tree;
}
exports.exportAsDOM = exportAsDOM;
