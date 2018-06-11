import { fromTree, removeFromTree, addToTree, moveNode } from '../src'
import State from '../src/state'
import sax2tree from 'sax2tree'
import xml from './data/xml'

const xmlMoved = `<xml><locations><size>12.000.000</size><location xml:id="14">Aurora</location><location xml:id="15"><name>Buenos "Bono" Aires</name></location></locations></xml>`

describe('fromTree', () => {
	test('1', async () => {
		const tree = await sax2tree(xml)	
		const str = fromTree(tree, new State({}))
		expect(str).toBe(
			`<xml><locations><location xml:id="14">Aurora</location><location xml:id="15"><name>Buenos "Bono" Aires</name><size>12.000.000</size></location></locations></xml>`
		)
	})
})

describe('removeFromTree', () => {
	test('remove size', async () => {
		const tree = await sax2tree(xml)	
		const [nextTree, removedNodes] = removeFromTree(tree, { name: 'size' })
		expect(nextTree.children[0].children[1].children.length).toBe(1)

		expect(removedNodes.map(x => { delete x.children; return x })).toEqual([
			{
				attributes: {},
				id: 'size',
				isSelfClosing: false,
				name: 'size',
				parent: 'location',
			}
		])
	})
	test('remove locations', async () => {
		const tree = await sax2tree(xml)	
		const [nextTree, removedNodes] = removeFromTree(tree, { name: 'locations' })
		expect(nextTree).toEqual({
			attributes: {},
			children: [],
			id: 'xml',
			isSelfClosing: false,
			name: 'xml',
			parent: null,
		})

		expect(removedNodes.map(x => { delete x.children; return x })).toEqual([
			{
				attributes: {},
				id: 'locations',
				isSelfClosing: false,
				name: 'locations',
				parent: 'xml',
			}
		])
	})
})

describe('addToTree', () => {
	test('3', async () => {
		const tree = await sax2tree(xml)	
		const [nextTree, removedNodes] = removeFromTree(tree, { name: 'size' })
		const nextTree2 = addToTree(nextTree, removedNodes, { name: 'locations' })
		const str = fromTree(nextTree2, new State({}))
		expect(str).toEqual(xmlMoved)
	})
})

describe('moveNode', () => {
	test('4', async () => {
		const tree = await sax2tree(xml)	
		const nextTree = moveNode(tree, {
			selector: { name: 'size' }, 
			parentSelector: { name: 'locations' },
		})
		const str = fromTree(nextTree, new State({}))
		expect(str).toEqual(xmlMoved)
	})
})