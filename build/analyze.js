"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _index_1 = require("./_index");
const analyze = (node) => {
    const stats = { __textNode: { count: 0 } };
    const addValueToStats = (values, value) => {
        if (values == null)
            values = {};
        if (values.hasOwnProperty(value))
            values[value] = Object.assign({}, values[value], { count: ++values[value].count });
        else
            values[value] = { count: 1 };
        return values;
    };
    const addAttributesToStats = (n) => {
        let attrs = stats[n.name].attributes || {};
        Object.keys(n.attributes).forEach(k => {
            if (attrs.hasOwnProperty(k))
                attrs[k] = Object.assign({}, attrs[k], { count: ++attrs[k].count });
            else
                attrs[k] = { count: 1 };
            attrs[k].values = addValueToStats(attrs[k].values, n.attributes[k]);
        });
        return attrs;
    };
    const addNodeToStats = (n) => {
        if (stats.hasOwnProperty(n.name))
            stats[n.name] = Object.assign({}, stats[n.name], { count: ++stats[n.name].count });
        else
            stats[n.name] = { count: 1 };
        if (Object.keys(n.attributes).length) {
            stats[n.name].attributes = addAttributesToStats(n);
        }
    };
    _index_1.iterateTree(node, (n) => {
        if (typeof n === 'string')
            stats.__textNode = Object.assign({}, stats.__textNode, { count: ++stats.__textNode.count });
        else
            addNodeToStats(n);
        return n;
    });
    return stats;
};
const mergeValues = (values1, values2) => {
    if (values1 == null)
        values1 = {};
    const aggr = {};
    Object.keys(values1).forEach(values1Key => {
        aggr[values1Key] = Object.assign({}, values1[values1Key]);
    });
    if (values2 == null)
        return aggr;
    Object.keys(values2).forEach(values2Key => {
        if (!aggr.hasOwnProperty(values2Key)) {
            aggr[values2Key] = Object.assign({}, values2[values2Key]);
        }
        else {
            aggr[values2Key].count = aggr[values2Key].count + values2[values2Key].count;
        }
    });
    return aggr;
};
const mergeAttributes = (attrs1, attrs2) => {
    if (attrs1 == null)
        attrs1 = {};
    const aggr = {};
    Object.keys(attrs1).forEach(attrs1Key => {
        aggr[attrs1Key] = Object.assign({}, attrs1[attrs1Key]);
    });
    if (attrs2 == null)
        return aggr;
    Object.keys(attrs2).forEach(attrs2Key => {
        if (!aggr.hasOwnProperty(attrs2Key)) {
            aggr[attrs2Key] = Object.assign({}, attrs2[attrs2Key]);
        }
        else {
            aggr[attrs2Key].count = aggr[attrs2Key].count + attrs2[attrs2Key].count;
        }
        if (!attrs1.hasOwnProperty(attrs2Key))
            attrs1[attrs2Key] = { count: 0 };
        const values = mergeValues(attrs1[attrs2Key].values, attrs2[attrs2Key].values);
        if (Object.keys(values).length)
            aggr[attrs2Key].values = values;
    });
    return aggr;
};
function analyzeAll(nodes) {
    return nodes
        .map(analyze)
        .reduce((prev, curr, index) => {
        Object.keys(curr).forEach(k => {
            if (!prev.hasOwnProperty(k)) {
                prev[k] = { count: curr[k].count };
                if (curr[k].hasOwnProperty('attributes'))
                    prev[k].attributes = curr[k].attributes;
            }
            else {
                const count = prev[k].count + curr[k].count;
                prev[k].count = count;
                const attributes = mergeAttributes(prev[k].attributes, curr[k].attributes);
                if (Object.keys(attributes).length)
                    prev[k].attributes = attributes;
            }
        });
        return prev;
    }, {});
}
exports.default = analyzeAll;
