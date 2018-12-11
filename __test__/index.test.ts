import xmlio, { xmlToTree, SaxTag } from '../src'

describe('xmlio', () => {
	// Split the tree in subtrees by a parent selector
	test('split', async () => {
		const tree = await xmlToTree('<text><line>haha</line><line>hihi</line></text>')
		const expected = xmlio(tree)
			.split({ name: 'line' })
			.toXml()

		expect(expected).toEqual(['<line>haha</line>', '<line>hihi</line>'])
	})

	// Wrap a node with a new node
	test('wrap', async () => {
		const tree = await xmlToTree('<text><line>haha</line><line>hihi</line></text>')
		const expected = xmlio(tree)
			.wrap({ name: 'line' }, { name: 'p' })
			.toXml()

		expect(expected).toEqual('<text><p><line>haha</line></p><p><line>hihi</line></p></text>')
	})

	// Add a new tag to the beginning of the children of a parent
	test('prepend', async () => {
		const tree = await xmlToTree('<text><line id="1">haha</line><line id="2">hihi</line></text>')
		const expected = xmlio(tree)
			.prepend({ name: 'hi', children: [{ name: 'b', children: ['dit'] } as SaxTag, 'dat'] }, { name: 'line', attributes: { id: "1" } })
			.prepend({ name: 'hi', children: [{ name: 'i', children: ['dot'] } as SaxTag, 'det'] }, { name: 'line', attributes: { id: "2" } })
			.toXml()

		expect(expected).toEqual('<text><line id="1"><hi><b>dit</b>dat</hi>haha</line><line id="2"><hi><i>dot</i>det</hi>hihi</line></text>')
	})

	// Add a new tag to the end of the children of a parent
	test('append', async () => {
		const tree = await xmlToTree('<text><line id="1">haha</line><line id="2">hihi</line></text>')
		const expected = xmlio(tree)
			.append({ name: 'hi', children: [{ name: 'b', children: ['dit'] } as SaxTag, 'dat'] }, { name: 'line', attributes: { id: "1" } })
			.append({ name: 'hi', children: [{ name: 'i', children: ['dot'] } as SaxTag, 'det'] }, { name: 'line', attributes: { id: "2" } })
			.toXml()

		expect(expected).toEqual('<text><line id="1">haha<hi><b>dit</b>dat</hi></line><line id="2">hihi<hi><i>dot</i>det</hi></line></text>')
	})

	// Move the hi[on=1] tag to the line[id=1] tag
	test('move - append', async () => {
		const tree = await xmlToTree('<text><line id="1">haha</line><line>hihi</line><hi on="1">here</hi></text>')
		const expected = xmlio(tree)
			.move({ name: 'hi', attributes: { on: "1" } }, { name: 'line', attributes: { id: "1" } })
			.toXml()

		expect(expected).toEqual('<text><line id="1">haha<hi on="1">here</hi></line><line>hihi</line></text>')
	})

	// Move the hi[on=1] tag to the line[id=1] tag
	test('move - prepend', async () => {
		const tree = await xmlToTree('<text><line id="1">haha</line><line>hihi</line><hi on="1">here</hi></text>')
		const expected = xmlio(tree)
			.move({ name: 'hi', attributes: { on: "1" } }, { name: 'line', attributes: { id: "1" } }, false)
			.toXml()

		expect(expected).toEqual('<text><line id="1"><hi on="1">here</hi>haha</line><line>hihi</line></text>')
	})

	// Replace the line[id=1] tag with the hi[on=1] tag
	test('replace', async () => {
		const tree = await xmlToTree('<text><line id="1">haha</line><line>hihi</line><hi on="1">here</hi></text>')
		const expected = xmlio(tree)
			.replace(
				{ name: 'line', attributes: { id: "1" } },
				(lineNode) => ({
					name: 'hi',
					attributes: { on: lineNode.attributes.id }
				})
			)
			.toXml()

		expect(expected).toEqual('<text><hi on="1">here</hi><line>hihi</line></text>')
	})

	test('replace (copy)', async () => {
		const tree = await xmlToTree('<text><line id="1">haha</line><line>hihi</line><hi on="1">here</hi></text>')
		const expected = xmlio(tree)
			.replace(
				{ name: 'line', attributes: { id: "1" } },
				(lineNode) => ({
					name: 'hi',
					attributes: { on: lineNode.attributes.id }
				}),
				false
			)
			.toXml()

		expect(expected).toEqual('<text><hi on="1">here</hi><line>hihi</line><hi on="1">here</hi></text>')
	})

	// First split and than wrap
	test('split => wrap', async () => {
		const tree = await xmlToTree('<text><line>haha</line><line>hihi</line></text>')
		const expected = xmlio(tree)
			.split({ name: 'line' })
			.wrap({ name: 'line' }, { name: 'p' })
			.toXml()

		expect(expected).toEqual(['<p><line>haha</line></p>', '<p><line>hihi</line></p>'])
	})

	// First wrap and than split
	// Should have the same result as first split and than wrap
	test('wrap => split', async () => {
		const tree = await xmlToTree('<text><line>haha</line><line>hihi</line></text>')
		const expected = xmlio(tree)
			.wrap({ name: 'line' }, { name: 'p' })
			.split({ name: 'p' })
			.toXml()

		expect(expected).toEqual(['<p><line>haha</line></p>', '<p><line>hihi</line></p>'])
	})

	test('toHtml', async () => {
		const tree = await xmlToTree('<text><line>haha</line><line>hihi</line></text>')
		const expected = xmlio(tree)
			.toHtml()

		expect(expected).toEqual('<div class="text"><div class="line">haha</div><div class="line">hihi</div></div>')
	})

	test('toString', async () => {
		const tree = await xmlToTree('<text><line>haha</line><line>hihi</line></text>')
		const expected = xmlio(tree)
			.toString()

		expect(expected).toEqual('hahahihi')
	})

	test('toString - join', async () => {
		const tree = await xmlToTree('<text><line>haha</line><line>hihi</line></text>')
		const expected = xmlio(tree)
			.toString({ join: ', ' })

		expect(expected).toEqual('haha, hihi')
	})

	test('toString - join', async () => {
		const tree = await xmlToTree('<text><line>haha</line><line>hihi</line></text>')
		const expected = xmlio(tree)
			.split({ name: 'line'})
			.toString({ join: ', ' })

		expect(expected).toEqual(['haha', 'hihi'])
	})

	test('toJsx', async () => {
		const tree = await xmlToTree('<text><line>haha</line><line>hihi</line></text>')
		const [expected] = xmlio(tree)
			.toJsx()

		const received = [
			"import * as React from 'react'",
			"import {Text, Line} from './components'",
			'export default () => <Text><Line>haha</Line><Line>hihi</Line></Text>'
		].join('\n')

		expect(expected).toEqual(received)
	})

	test('toJsx - componentPath', async () => {
		const tree = await xmlToTree('<text><line>haha</line><line>hihi</line></text>')
		const [expected] = xmlio(tree)
			.toJsx({ componentPath: 'my-component-package' })

		const received = [
			"import * as React from 'react'",
			"import {Text, Line} from 'my-component-package'",
			'export default () => <Text><Line>haha</Line><Line>hihi</Line></Text>'
		].join('\n')

		expect(expected).toEqual(received)
	})

	test('toJsx - passProps', async () => {
		const tree = await xmlToTree('<text><line>haha</line><line>hihi</line></text>')
		const [expected] = xmlio(tree)
			.toJsx({ passProps: true })

		const received = [
			"import * as React from 'react'",
			"import {Text, Line} from './components'",
			'export default (props) => <Text {...props}><Line {...props}>haha</Line><Line {...props}>hihi</Line></Text>'
		].join('\n')

		expect(expected).toEqual(received)
	})
})
