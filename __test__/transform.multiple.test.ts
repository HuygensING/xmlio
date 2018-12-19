import Xmlio from '../src'

const xml = `<xml>
	<locs>
		<loc some:attr="5">
			<some:name some:attr="1">Den Haag</some:name>
			<some:name some:attr="2">'s Gravenhage</some:name>
		</loc>
		<loc some:attr="6">
			<some:name some:attr="3">Buenos Aires</some:name>
			<some:name some:attr="4">Bono</some:name>
		</loc>
	</locs>
</xml>`

describe('xmlio - multiple transforms', () => {
	test('Select with namespaced elements and attributes', async () => {
		const xmlio = new Xmlio(xml, { namespaces: ['some'] })
		const output = await xmlio
			.select('loc')
			.export()
		expect(output).toEqual([
		`<loc some:attr="5">
			<some:name some:attr="1">Den Haag</some:name>
			<some:name some:attr="2">'s Gravenhage</some:name>
		</loc>`,
		`<loc some:attr="6">
			<some:name some:attr="3">Buenos Aires</some:name>
			<some:name some:attr="4">Bono</some:name>
		</loc>`
		])
	})
})