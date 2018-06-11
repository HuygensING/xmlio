import { fromTree, removeFromTree, addToTree, moveNode } from '../src'
import analyze, { analyzeAll } from '../src/analyze'
import State from '../src/state'
import sax2tree from 'sax2tree'
import xml from './data/xml'

describe('analyze', () => {
	test('some 1', async () => {
		const tree = await sax2tree(xml)	
		const expected = {
			__textNode: { count: 3 },
			location: {
				attributes: {
					'xml:id': {
						count: 2,
						values: {
							14: { count: 1 },
							15: { count: 1 },
						},
					},
				},
				count: 2,
			},
			locations: { count: 1 },
			name: { count: 1 },
			size: { count: 1 },
			xml: { count: 1 },
		}
		expect(analyze(tree)).toEqual(expected)
	})

	test('some all', async () => {
		const tree = await sax2tree(xml)	
		const expected = {
			__textNode: { count: 6 },
			location: {
				attributes: {
					'xml:id': {
						count: 4,
						values: {
							14: { count: 2 },
							15: { count: 2 },
						},
					},
				},
				count: 4,
			},
			locations: { count: 2 },
			name: { count: 2 },
			size: { count: 2 },
			xml: { count: 2 },
		}
		expect(analyzeAll([tree, tree])).toEqual(expected)
	})
})