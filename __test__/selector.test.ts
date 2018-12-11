import { SaxTag, SaxTagSimple } from 'xml2tree'

function matchAttr(node: SaxTag | SaxTagSimple, regexResult: RegExpMatchArray, predicate: (key: string, value: string) => boolean): boolean {
	const key = regexResult[1]
	const value = regexResult[2]
	if (key === '') {
		return Object.keys(node.attributes).some(key => predicate(key, value))
	} else {
		return node.attributes.hasOwnProperty(key) && predicate(key, value)
	}
}

function partition(arr: any[], predicate: (item: any) => boolean) {
	return [arr.filter(predicate), arr.filter(a => !predicate(a))]
}

function splitSelector(selector: string) {
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

function testNodeName(node: SaxTag | SaxTagSimple, selector: string) {
	let nodeName = false

	const nodeNameResult = /^([a-z]+)/.exec(selector)
	if (nodeNameResult != null) nodeName = nodeNameResult[1] === node.name
	else nodeName = true

	return nodeName
} 

function testAttribute(node: SaxTag | SaxTagSimple, selector: string) {
	let attr = false

	const hasAttr = /\[(.+)\]/.exec(selector)
	if (hasAttr != null) {
		const attrBody = hasAttr[1]

		const attrNameOnly = /^[a-z]+$/.test(attrBody)
		if (attrNameOnly) attr = Object.keys(node.attributes).indexOf(attrBody) > -1

		const attrNameAndValue = /^([a-z]*)="?([a-z]+)"?$/.exec(attrBody)
		const nameAndValuePredicate = (key: string, value: string) => node.attributes[key] === value
		if (attrNameAndValue != null) {
			attr = matchAttr(node, attrNameAndValue, nameAndValuePredicate)
		}

		const attrStartsWith = /^([a-z]*)\^="?([a-z]+)"?$/.exec(attrBody)
		const startsWithPredicate = (key: string, value: string) => node.attributes[key].slice(0, value.length) === value
		if (attrStartsWith != null) {
			attr = matchAttr(node, attrStartsWith, startsWithPredicate)
		}

		const attrEndsWith = /^([a-z]*)\$="?([a-z]+)"?$/.exec(attrBody)
		const endsWithPredicate = (key: string, value: string) => node.attributes[key].slice(-1 * value.length) === value
		if (attrEndsWith != null) {
			attr = matchAttr(node, attrEndsWith, endsWithPredicate)
		}

		const attrContains = /^([a-z]*)\*="?([a-z]+)"?$/.exec(attrBody)
		const containsPredicate = (key: string, value: string) => node.attributes[key].indexOf(value) > -1
		if (attrContains != null) {
			attr = matchAttr(node, attrContains, containsPredicate)
		}
	}
	else {
		attr = true
	}

	return attr
}

function testNot(node: SaxTag | SaxTagSimple, selector: string) {
	let pseudoNot = false

	const hasPseudoNot = /\:not\((.+)\)/.exec(selector)
	if (hasPseudoNot != null) {
		pseudoNot = !compareNodeToSimpleSelector(node, hasPseudoNot[1])
	} else {
		pseudoNot = true
	}

	return pseudoNot
}


function compareNodeToSimpleSelector(node: SaxTag | SaxTagSimple, selector: string): boolean {
	const [nots, attrs, other] = splitSelector(selector)
	const nodeName = other.every(o => testNodeName(node, o))
	const attr = attrs.every(o => testAttribute(node, o))
	const pseudoNot = nots.every(o => testNot(node, o))
	return nodeName && attr && pseudoNot
}

function compareNodeToSelector(node: SaxTag, selector: string): boolean {
	if (selector === '*') return true

	if (selector.indexOf(' > ') > -1) {
		const selectors = selector.split(' > ')
		const currentNodeSelector = selectors.slice(-1)[0]
		const isCurrentNode = compareNodeToSimpleSelector(node, currentNodeSelector)
		const parentSelectors = selectors.slice(0, -1)
		const parents = node.parents.slice(-1 * parentSelectors.length)
		const hasParents = parentSelectors.every((sel, index) => {
			return compareNodeToSimpleSelector(parents[index], sel)	
		})

		return isCurrentNode && hasParents
	}

	if (selector.indexOf(' ') > -1) {
		const selectors = selector.split(' ')
		const currentNodeSelector = selectors.slice(-1)[0]
		const isCurrentNode = compareNodeToSimpleSelector(node, currentNodeSelector)

		const parentSelectors = selectors.slice(0, -1)
		const hasParents = parentSelectors
			.map((sel) =>
				node.parents.findIndex(parent => compareNodeToSimpleSelector(parent, sel))	
			)
			.reduce((isOrdered, curr, index, array) => {
				const prev = array[index - 1]
				if (prev == null) return isOrdered
				return isOrdered && curr > prev
			}, true)

		return isCurrentNode && hasParents
	}

	return compareNodeToSimpleSelector(node, selector)
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
		expect(compareNodeToSelector(defaultNode, '[type="letter"]:not([type="target"][rend="light"])')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type="letter"]:not([rend="dark"][rend="light"])')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type="letter"]:not([type="letter"])')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, '[type="letter"]:not([rend="dark"])')).toBeFalsy()
	})

	test('multiple attribute selectors)', () => {
		expect(compareNodeToSelector(defaultNode, '[type="letter"][rend="dark"]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type="letter"][rend="light"]')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, '[type="target"][rend="dark"]')).toBeFalsy()
	})

	test('mixing', () => {
		expect(compareNodeToSelector(defaultNode, '[type="letter"]article[rend="dark"]')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type="letter"][rend="dark"]article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, ':not(section)[type="letter"][rend="dark"]article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type="letter"]:not(section)[rend="dark"]article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type="letter"]article[rend="dark"]:not(section)')).toBeTruthy()
	})

	test('child', () => {
		expect(compareNodeToSelector(defaultNode, 'text body article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, 'body article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type="main"] body article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, 'text article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, 'body text article')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'text falsebody article')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'text [type="sub"] article')).toBeFalsy()
	})

	test('direct child', () => {
		expect(compareNodeToSelector(defaultNode, 'text > body > article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, 'body > article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, '[type="main"] > body > article')).toBeTruthy()
		expect(compareNodeToSelector(defaultNode, 'body > text > article')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'text > falsebody > article')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'text > [type="sub"] > article')).toBeFalsy()
		expect(compareNodeToSelector(defaultNode, 'text > article')).toBeFalsy()
	})
})