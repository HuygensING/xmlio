import { SaxTag } from 'xml2tree'
import { iterateTree } from './_index'

export interface Stats {
	[key: string]: {
		count: number
		attributes?: Stats
		values?: Stats
	}
}
const analyze = (node: SaxTag): Stats => {
	const stats: Stats = { __textNode: { count: 0 } }

	const addValueToStats = (values: Stats, value: string) => {
		if (values == null) values = {}
		if (values.hasOwnProperty(value)) values[value] = { ...values[value], count: ++values[value].count }
		else values[value] = { count: 1 }
		return values
	}

	const addAttributesToStats = (n: SaxTag) => {
		let attrs = stats[n.name].attributes || {}
		Object.keys(n.attributes).forEach(k => {
			if (attrs.hasOwnProperty(k)) attrs[k] = { ...attrs[k], count: ++attrs[k].count }
			else attrs[k] = { count: 1 }
			attrs[k].values = addValueToStats(attrs[k].values, n.attributes[k])
		})
		return attrs
	}

	const addNodeToStats = (n: SaxTag) => {
		if (stats.hasOwnProperty(n.name)) stats[n.name] = { ...stats[n.name], count: ++stats[n.name].count }
		else stats[n.name] = { count: 1 }
		if (Object.keys(n.attributes).length) {
			stats[n.name].attributes = addAttributesToStats(n)
		}
	}

	iterateTree(node, (n: SaxTag) => {
		if (typeof n === 'string') stats.__textNode = { ...stats.__textNode, count: ++stats.__textNode.count }
		else addNodeToStats(n)
		return n
	})

	return stats
}

const mergeValues = (values1: Stats, values2: Stats) => {
	if (values1 == null) values1 = {}
	const aggr: { [key: string]: any } = {}
	Object.keys(values1).forEach(values1Key => {
		aggr[values1Key] = { ...values1[values1Key] }
	})
	if (values2 == null) return aggr
	Object.keys(values2).forEach(values2Key => {
		if (!aggr.hasOwnProperty(values2Key)) {
			aggr[values2Key] = { ...values2[values2Key] }
		} else {
			aggr[values2Key].count = aggr[values2Key].count + values2[values2Key].count
		}
	})
	return aggr
}

const mergeAttributes = (attrs1: Stats, attrs2: Stats) => {
	if (attrs1 == null) attrs1 = {}
	const aggr: { [key: string]: any } = {}
	Object.keys(attrs1).forEach(attrs1Key => {
		aggr[attrs1Key] = { ...attrs1[attrs1Key] }
	})

	if (attrs2 == null) return aggr
	Object.keys(attrs2).forEach(attrs2Key => {
		if (!aggr.hasOwnProperty(attrs2Key)) {
			aggr[attrs2Key] = { ...attrs2[attrs2Key] }
		} else {
			aggr[attrs2Key].count = aggr[attrs2Key].count + attrs2[attrs2Key].count
		}
		if (!attrs1.hasOwnProperty(attrs2Key)) attrs1[attrs2Key] = { count: 0 }
		const values = mergeValues(attrs1[attrs2Key].values, attrs2[attrs2Key].values)
		if (Object.keys(values).length) aggr[attrs2Key].values = values
	})
	return aggr
}

export default function analyzeAll(nodes: SaxTag[]): Stats {
	return nodes
		.map(analyze)
		.reduce(
			(prev, curr, index) => {
				Object.keys(curr).forEach(k => {
					if (!prev.hasOwnProperty(k)) {
						prev[k] = { count: curr[k].count }
						if (curr[k].hasOwnProperty('attributes')) prev[k].attributes = curr[k].attributes
					}
					else {
						const count = prev[k].count + curr[k].count
						prev[k].count = count
						const attributes = mergeAttributes(prev[k].attributes, curr[k].attributes)
						if (Object.keys(attributes).length) prev[k].attributes = attributes
					}
				})
				return prev
			}, {}
		)
}
