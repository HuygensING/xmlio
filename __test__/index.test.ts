import { fromString } from '../src'

describe('xmlio', () => {
	// Split the tree in subtrees by a parent selector
	test('split', async () => {
		const tree = await fromString('<text><line>haha</line><line>hihi</line></text>')
		const expected = tree
			.split({ name: 'line' })
			.toXml()

		expect(expected).toEqual(['<line>haha</line>', '<line>hihi</line>'])
	})

	// Wrap a node with a new node
	test('wrap', async () => {
		const expected = (await fromString('<text><line>haha</line><line>hihi</line></text>'))
			.wrap({ name: 'line' }, { name: 'p' })
			.toXml()

		expect(expected).toEqual('<text><p><line>haha</line></p><p><line>hihi</line></p></text>')
	})

	// Add a new tag to the beginning of the children of a parent
	test('prepend', async () => {
		const expected = (await fromString('<text><line id="1">haha</line><line id="2">hihi</line></text>'))
			.prepend({ name: 'hi', children: [{ name: 'b', children: ['dit'] }, 'dat'] }, { name: 'line', attributes: { id: "1" } })
			.prepend({ name: 'hi', children: [{ name: 'i', children: ['dot'] }, 'det'] }, { name: 'line', attributes: { id: "2" } })
			.toXml()

		expect(expected).toEqual('<text><line id="1"><hi><b>dit</b>dat</hi>haha</line><line id="2"><hi><i>dot</i>det</hi>hihi</line></text>')
	})

	// Add a new tag to the end of the children of a parent
	test('append', async () => {
		const expected = (await fromString('<text><line id="1">haha</line><line id="2">hihi</line></text>'))
			.append({ name: 'hi', children: [{ name: 'b', children: ['dit'] }, 'dat'] }, { name: 'line', attributes: { id: "1" } })
			.append({ name: 'hi', children: [{ name: 'i', children: ['dot'] }, 'det'] }, { name: 'line', attributes: { id: "2" } })
			.toXml()

		expect(expected).toEqual('<text><line id="1">haha<hi><b>dit</b>dat</hi></line><line id="2">hihi<hi><i>dot</i>det</hi></line></text>')
	})

	// Move the hi[on=1] tag to the line[id=1] tag
	test('move - append', async () => {
		const expected = (await fromString('<text><line id="1">haha</line><line>hihi</line><hi on="1">here</hi></text>'))
			.move({ name: 'hi', attributes: { on: "1" } }, { name: 'line', attributes: { id: "1" } })
			.toXml()

		expect(expected).toEqual('<text><line id="1">haha<hi on="1">here</hi></line><line>hihi</line></text>')
	})

	// Move the hi[on=1] tag to the line[id=1] tag
	test('move - prepend', async () => {
		const expected = (await fromString('<text><line id="1">haha</line><line>hihi</line><hi on="1">here</hi></text>'))
			.move({ name: 'hi', attributes: { on: "1" } }, { name: 'line', attributes: { id: "1" } }, false)
			.toXml()

		expect(expected).toEqual('<text><line id="1"><hi on="1">here</hi>haha</line><line>hihi</line></text>')
	})

	// Replace the line[id=1] tag with the hi[on=1] tag
	test('replace', async () => {
		const expected = (await fromString('<text><line id="1">haha</line><line>hihi</line><hi on="1">here</hi></text>'))
			.replace({ name: 'hi', attributes: { on: "1" } }, (hiNode) => {
				return { name: 'line', attributes: { id: hiNode.attributes.on } }
			})
			.toXml()

		expect(expected).toEqual('<text><hi on="1">here</hi><line>hihi</line></text>')
	})

	// First split and than wrap
	test('split => wrap', async () => {
		const expected = (await fromString('<text><line>haha</line><line>hihi</line></text>'))
			.split({ name: 'line' })
			.wrap({ name: 'line' }, { name: 'p' })
			.toXml()

		expect(expected).toEqual(['<p><line>haha</line></p>', '<p><line>hihi</line></p>'])
	})

	// First wrap and than split
	// Should have the same result as first split and than wrap
	test('wrap => split', async () => {
		const expected = (await fromString('<text><line>haha</line><line>hihi</line></text>'))
			.wrap({ name: 'line' }, { name: 'p' })
			.split({ name: 'p' })
			.toXml()

		expect(expected).toEqual(['<p><line>haha</line></p>', '<p><line>hihi</line></p>'])
	})

	test('toHtml', async () => {
		const expected = (await fromString('<text><line>haha</line><line>hihi</line></text>'))
			.toHtml()

		expect(expected).toEqual('<div class="text"><div class="line">haha</div><div class="line">hihi</div></div>')
	})

	test('toJsx', async () => {
		const expected = (await fromString('<text><line>haha</line><line>hihi</line></text>'))
			.toJsx()

		const received = [
			"import * as React from 'react'",
			"import {Line, Text} from './components'",
			'export default () => <Text><Line>haha</Line><Line>hihi</Line></Text>'
		].join('\n')

		expect(expected).toEqual(received)
	})

	test('toJsx - componentPath', async () => {
		const expected = (await fromString('<text><line>haha</line><line>hihi</line></text>'))
			.toJsx({ componentPath: 'my-component-package' })

		const received = [
			"import * as React from 'react'",
			"import {Line, Text} from 'my-component-package'",
			'export default () => <Text><Line>haha</Line><Line>hihi</Line></Text>'
		].join('\n')

		expect(expected).toEqual(received)
	})

	test('toJsx - passProps', async () => {
		const expected = (await fromString('<text><line>haha</line><line>hihi</line></text>'))
			.toJsx({ passProps: true })

		const received = [
			"import * as React from 'react'",
			"import {Line, Text} from './components'",
			'export default (props) => <Text {...props}><Line {...props}>haha</Line><Line {...props}>hihi</Line></Text>'
		].join('\n')

		expect(expected).toEqual(received)
	})
})