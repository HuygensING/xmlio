import Xmlio from '../src/index.node'

const xml = `<xml>
	<locs>
		<loc>
			<name>Den Haag</name>
			<name>'s Gravenhage</name>
		</loc>
		<loc>
			<name>Buenos Aires</name>
			<name>Bono</name>
		</loc>
	</locs>
</xml>`

describe('xmlio - select', () => {
	test('Select with selector which does not find any elements', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.select('#does-not-exists')
			.export()
		expect(output).toBe(xml)
	})

	test('Select with :not() selector', async () => {
		const xmlio = new Xmlio('<a><b id="1"/><b id="2"/></a>')
		const output = await xmlio
			.select('b:not([id="2"])')
			.export({ type: 'data' })
		expect(Array.isArray(output)).toBeFalsy()
		expect((output as DataNode).attributes.id).toBe('1')
	})

	test('Select an element with a namespace in the name', async () => {
		const xmlio = new Xmlio('<wrapper><ns:tag /></wrapper>', { namespaces: ['ns'] })
		const output = await xmlio
			.select('ns:tag')
			.export()
		expect(output).toBe('<ns:tag/>')
	})

	test('Select an element with a namespace in an attribute. Namespace on the root', async () => {
		const xmlio = new Xmlio('<wrapper><div some:attr="some value" /></wrapper>', { namespaces: ['some'] })
		const output = await xmlio
			.select('div[some:attr="some value"]')
			.export()
		expect(output).toBe('<div some:attr="some value"/>')
	})

	test('Select an element with a namespace in an attribute. Namespace on the tag', async () => {
		const xmlio = new Xmlio('<wrapper><div some:attr="some value" xmlns:some="http://example.com" /></wrapper>')
		const output = await xmlio
			.select('div[some:attr="some value"]')
			.export()
		expect(output).toBe('<div xmlns:some="http://example.com" some:attr="some value"/>')
	})

	test('Select with selector which finds only one element', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.select('locs')
			.export()
		expect(output).toBe(
	`<locs>
		<loc>
			<name>Den Haag</name>
			<name>'s Gravenhage</name>
		</loc>
		<loc>
			<name>Buenos Aires</name>
			<name>Bono</name>
		</loc>
	</locs>`)
	})

	test('Select with selector which finds two elements', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.select('loc')
			.export()
		expect(output).toEqual(
		[`<loc>
			<name>Den Haag</name>
			<name>'s Gravenhage</name>
		</loc>`,
		`<loc>
			<name>Buenos Aires</name>
			<name>Bono</name>
		</loc>`])
	})

	test('Select with selector which finds four elements', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.select('name')
			.export()
		expect(output).toEqual([`<name>Den Haag</name>`, `<name>'s Gravenhage</name>`, `<name>Buenos Aires</name>`, `<name>Bono</name>`])
	})

	test('Multiple selects', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.select('locs')
			.select('loc')
			.select('name')
			.export()
		expect(output).toEqual([`<name>Den Haag</name>`, `<name>'s Gravenhage</name>`, `<name>Buenos Aires</name>`, `<name>Bono</name>`])
	})
})