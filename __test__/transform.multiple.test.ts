import Xmlio from '../src/index.node'

const xml = `<xml>
	<locs>
		<loc some:attr="5">
			<some:Naam some:attr="1">Den Haag</some:Naam>
			<some:nOam some:attr="2">'s Gravenhage</some:nOam>
		</loc>
		<loc some:attr="6">
			<some:name some:aTtribut="3">Buenos Aires</some:name>
			<some:name some:Attrib="4">Bono</some:name>
		</loc>
	</locs>
</xml>`

describe('xmlio - select with namespaces and case', () => {
	test('Select with namespaced elements and attributes', async () => {
		const xmlio = new Xmlio(xml, { namespaces: ['some'] })
		const output = await xmlio
			.select('loc')
			.export()
		expect(output).toEqual([
		`<loc some:attr="5">
			<some:Naam some:attr="1">Den Haag</some:Naam>
			<some:nOam some:attr="2">'s Gravenhage</some:nOam>
		</loc>`,
		`<loc some:attr="6">
			<some:name some:aTtribut="3">Buenos Aires</some:name>
			<some:name some:Attrib="4">Bono</some:name>
		</loc>`
		])
	})

	test('Select element with namespace and upper case in node name', async () => {
		const xmlio = new Xmlio(xml, { namespaces: ['some'] })
		const output = await xmlio
			.select('some:Naam')
			.export()
		expect(output).toBe(`<some:Naam some:attr="1">Den Haag</some:Naam>`)
	})

	test('Select element with namespace and upper case in node name. Second char', async () => {
		const xmlio = new Xmlio(xml, { namespaces: ['some'] })
		const output = await xmlio
			.select('some:nOam')
			.export()
		expect(output).toBe(`<some:nOam some:attr="2">'s Gravenhage</some:nOam>`)
	})

	test('Select element with namespace and upper case in attribute. Second char', async () => {
		const xmlio = new Xmlio(xml, { namespaces: ['some'] })
		const output = await xmlio
			.select('[some:aTtribut]')
			.export()
		expect(output).toBe(`<some:name some:aTtribut="3">Buenos Aires</some:name>`)
	})

	test('Select element with namespace and upper case in attribute', async () => {
		const xmlio = new Xmlio(xml, { namespaces: ['some'] })
		const output = await xmlio
			.select('[some:Attrib]')
			.export()
		expect(output).toBe(`<some:name some:Attrib="4">Bono</some:name>`)
	})
})