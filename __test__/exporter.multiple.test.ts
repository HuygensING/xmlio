import Xmlio from '../src'

const xml = `<xml>
	<locs>
		<loc>
			<name id="1">Den Haag</name>
			<name id="2">'s-Gravenhage</name>
		</loc>
		<loc>
			<name id="3">Buenos Aires</name>
			<name id="4">Bono</name>
		</loc>
	</locs>
</xml>`

describe('xmlio - exporter - multiple', () => {
	test('Multiple', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio.export([{ type: 'data', deep: false }, { type: 'xml' }])
		expect(output).toEqual([
			{
				name: 'xml',
				attributes: {},
				children: []
			},
			xml
		])
	})
})