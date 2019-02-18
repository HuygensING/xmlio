"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exportAsXml(tree, _xmlOptions) {
    if (tree == null)
        return '';
    const xml = new XMLSerializer().serializeToString(tree);
    return xml;
}
exports.exportAsXml = exportAsXml;
function exportAsData(tree, dataOptions) {
    function elementToDataElement(el) {
        const attributes = Array.from(el.attributes)
            .reduce((prev, curr) => {
            prev[curr.name] = el.getAttribute(curr.name);
            return prev;
        }, {});
        return { name: el.nodeName.toLowerCase(), attributes, children: [] };
    }
    if (!dataOptions.deep) {
        return elementToDataElement(tree.documentElement);
    }
    const nodeByData = new Map();
    const whatToShow = dataOptions.text ? NodeFilter.SHOW_ALL : NodeFilter.SHOW_ELEMENT;
    var treeWalker = tree.createTreeWalker(tree.documentElement, whatToShow);
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
    var treeWalker = tree.createTreeWalker(tree, NodeFilter.SHOW_TEXT);
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
