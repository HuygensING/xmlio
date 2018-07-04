import { SaxTag } from 'xml2tree'

function matchAttr(node: SaxTag, regexResult: RegExpMatchArray, predicate: (key, value) => boolean): boolean {
	const key = regexResult[1]
	const value = regexResult[2]
	if (key === '') {
		return Object.keys(node.attributes).some(key => predicate(key, value))
	} else {
		return node.attributes.hasOwnProperty(key) && predicate(key, value)
	}
}

function partition(arr, predicate) {
	return [arr.filter(predicate), arr.filter(a => !predicate(a))]
}

function splitSelector(selector) {
	const parts = selector
		.split(/(\:not\(.+\))/)
		.filter(p => p !== '')
	const [nots, notRest] = partition(parts, p => /^\:not/.test(p))

	const attrParts = notRest.join('')
		.split(/(\[.+?\])/)
		.filter(p => p !== '')
	const [attrs, attrsRest] = partition(attrParts, p => /^\[.+\]$/.test(p))
	
	return [nots, attrs, attrsRest]
}

function testNodeName(node, selector) {
	let nodeName = false

	const nodeNameResult = /^([a-z]+)/.exec(selector)
	if (nodeNameResult != null) nodeName = nodeNameResult[1] === node.name
	else nodeName = true

	return nodeName
} 

function testAttribute(node, selector) {
	let attr = false

	const hasAttr = /\[(.+)\]/.exec(selector)
	if (hasAttr != null) {
		const attrBody = hasAttr[1]

		const attrNameOnly = /^[a-z]+$/.test(attrBody)
		if (attrNameOnly) attr = Object.keys(node.attributes).indexOf(attrBody) > -1

		const attrNameAndValue = /^([a-z]*)="?([a-z]+)"?$/.exec(attrBody)
		const nameAndValuePredicate = (key, value) => node.attributes[key] === value
		if (attrNameAndValue != null) {
			attr = matchAttr(node, attrNameAndValue, nameAndValuePredicate)
		}

		const attrStartsWith = /^([a-z]*)\^="?([a-z]+)"?$/.exec(attrBody)
		const startsWithPredicate = (key, value) => node.attributes[key].slice(0, value.length) === value
		if (attrStartsWith != null) {
			attr = matchAttr(node, attrStartsWith, startsWithPredicate)
		}

		const attrEndsWith = /^([a-z]*)\$="?([a-z]+)"?$/.exec(attrBody)
		const endsWithPredicate = (key, value) => node.attributes[key].slice(-1 * value.length) === value
		if (attrEndsWith != null) {
			attr = matchAttr(node, attrEndsWith, endsWithPredicate)
		}

		const attrContains = /^([a-z]*)\*="?([a-z]+)"?$/.exec(attrBody)
		const containsPredicate = (key, value) => node.attributes[key].indexOf(value) > -1
		if (attrContains != null) {
			attr = matchAttr(node, attrContains, containsPredicate)
		}
	}
	else {
		attr = true
	}

	return attr
}

function testNot(node, selector) {
	let pseudoNot = false

	const hasPseudoNot = /\:not\((.+)\)/.exec(selector)
	if (hasPseudoNot != null) {
		pseudoNot = !compareNodeToSelector(node, hasPseudoNot[1])
	} else {
		pseudoNot = true
	}

	return pseudoNot
}

function splitCombinator(node, selector) {
	// const adjacentParts = selector
	// 	.split(/(.+\s+\s.+)/)
	// 	.filter(p => p !== '')
	// const [adjacents, adjacentsRest] = partition(adjacentParts, p => /^\:not/.test(p))

	// const siblingParts = selector
	// 	.split(/(\s~\s)/)
	// 	.filter(p => p !== '')
	// const [siblings, siblingsRest] = partition(siblingParts, p => /^\:not/.test(p))

	const childParts = selector
		.split(/\s>\s/)
		.filter(p => p !== '')

	const firstIndex = childParts.length - 1
	for (let index = firstIndex; index >= 0; index--) {
		if (index === firstIndex) {
 			if (!compareNodeToSimpleSelector(node, childParts[index])) {
				 break
				 return false
			}
		}

		// const selector = childParts[index];
	}
	// console.log(childParts
	// 	.reduce((prev, curr, index, array) => {
	// 		if (index === 0) return true	
	// 		const parentSelector = array[index - 1]
				
	// 	}, true)
				
	// )//, children, childrenRest)

	// const descendantParts = selector
	// 	.split(/(\s)/)
	// 	.filter(p => p !== '')

	// console.log(adjacentParts, siblingParts, childParts, descendantParts)

	// return [null, null, null, null]
	return true
}

function compareNodeToSimpleSelector(node, selector): boolean {
	const [nots, attrs, other] = splitSelector(selector)
	const nodeName = other.every(o => testNodeName(node, o))
	const attr = attrs.every(o => testAttribute(node, o))
	const pseudoNot = nots.every(o => testNot(node, o))
	return nodeName && attr && pseudoNot
}

function compareNodeToSelector(node: SaxTag, selector: string): boolean {
	if (selector === '*') return true

	const combinators = splitCombinator(node, selector)

	return combinators && compareNodeToSimpleSelector(node, selector)
}

const defaultNode = new SaxTag({
	name: 'article',
	attributes: { type: 'letter', rend: 'dark' },
	parents: [
		{
			name: 'text',
			attributes: { type: 'main' }
		},
		{
			name: 'body',
			attributes: {}
		}
	],
})

describe('compareNodeToSelector', () => {
	test('universal selector', () => {
		expect(compareNodeToSelector(defaultNode, '*')).toBeTruthy()
	})

	test('type selector', () => {
		expect(compareNodeToSelector(defaultNode, 'article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, 'section')).toBeFalsy()
	})

	test('attribute selector - attribute only', () => {
		expect(compareNodeToSelector(defaultNode, 'article[type]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, 'section[type]')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'article[target]')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, '[target]')).toBeFalsy()
	})

	test('attribute selector - attribute and value', () => {
		expect(compareNodeToSelector(defaultNode, 'article[type="letter"]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, 'article[type=letter]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, 'article[type="proza"]')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'article[type=proza]')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'section[type="proza"]')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'section[type=proza]')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'section[type="letter"]')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'section[type=letter]')).toBeFalsy()
	})

	test('attribute selector - value only (invalid CSS selector)', () => {
		expect(compareNodeToSelector(defaultNode, 'article[="letter"]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, 'article[=letter]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, 'article[="prozy"]')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'section[="letter"]')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'section[="proza"]')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'article[type=]')).toBeFalsy()
	})

	test('attribute selector - starts with)', () => {
		expect(compareNodeToSelector(defaultNode, 'article[type^="letter"]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, 'article[type^="let"]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type^="let"]')).toBeTruthy()
	})

	test('attribute selector - ends with)', () => {
		expect(compareNodeToSelector(defaultNode, 'article[type$="letter"]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, 'article[type$="ter"]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type$="ter"]')).toBeTruthy()
	})

	test('attribute selector - contains)', () => {
		expect(compareNodeToSelector(defaultNode, '[type*="letter"]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type*="ter"]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type*="let"]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type*="ette"]')).toBeTruthy()
	})

	test('attribute selector - not)', () => {
		expect(compareNodeToSelector(defaultNode, '[type="letter"]:not([type="target"])')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type="letter"]:not([type="letter"])')).toBeFalsy()
	})

	test('multiple attribute selectors)', () => {
		expect(compareNodeToSelector(defaultNode, '[type="letter"][rend="dark"]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type="letter"][type="target"]')).toBeFalsy()
	})

	test('mixing', () => {
		expect(compareNodeToSelector(defaultNode, '[type="letter"]article[rend="dark"]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type="letter"][rend="dark"]article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, ':not(section)[type="letter"][rend="dark"]article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type="letter"]:not(section)[rend="dark"]article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type="letter"]article[rend="dark"]:not(section)')).toBeTruthy()
	})

	// test('direct child', () => {
	// 	expect(compareNodeToSelector(defaultNode, 'text > body > article')).toBeTruthy()
	// })
})