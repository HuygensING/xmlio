import xmlio, { xmlToTree } from '../src'
import xml from './data/xml'

describe('analyze', () => {
	test('analyze a tree', async () => {
		const tree = await xmlToTree(xml)	
		const received = xmlio(tree).analyze()
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
			
		expect(received).toEqual(expected)
	})

	test('analyze split tree', async () => {
		const tree = await xmlToTree(xml)	
		const received = xmlio(tree)
			.split({ name: 'location' })
			.analyze()
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
			name: { count: 1 },
			size: { count: 1 }
		}
		expect(received).toEqual(expected)
	})
})