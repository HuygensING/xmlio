import { fromTree, removeFromTree, addToTree, moveNode, replaceNode, replaceNodes } from '../src'
import State from '../src/state'
import sax2tree, { TagNode } from 'sax2tree'
import xml, { xmlForReplaceNodes } from './data/xml'

describe('replaceNode', () => {
	test('simple', async () => {
		const tree = await sax2tree(xml)	
		const nextTree = replaceNodes(tree, { name: 'size' }, () => ({ name: 'location', attributes: { 'xml:id': '14' } }))
		const str = fromTree(nextTree, new State({}))
		expect(str).toBe(
			`<xml><locations><size>12.000.000</size><location xml:id="15"><name>Buenos "Bono" Aires</name></location></locations></xml>`
		)

		// Make sure the original tree is not altered
		expect(((tree.children[0] as TagNode).children[0] as TagNode).name).toBe('location')
	})

	test('harder', async () => {
		const tree = await sax2tree(xmlForReplaceNodes)	
		const nextTree = replaceNodes(tree, { name: 'location', attributes: { 'xml:id': null } }, (node) => {
			return { name: 'pos', attributes: { on: node.attributes['xml:id'] } }
		})
		const str = fromTree(nextTree, new State({}))
		expect(str).toBe(
			`<xml><location xml:id="14">Aurora</location><locations></locations><location xml:id="15"><name>Buenos "Bono" Aires</name><size>12.000.000</size></location></xml>`
		)
	})
})