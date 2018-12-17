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

describe('xmlio - exporter - text', () => {
	test('Default export to text', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio.export({ type: 'text' })
		expect(output).toBe("Den Haag 's-Gravenhage Buenos Aires Bono")
	})

	test('Export to text with join', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio.export({ type: 'text', join: '||' })
		expect(output).toBe("Den Haag||'s-Gravenhage||Buenos Aires||Bono")
	})

	test('Export to text with newline join', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio.export({ type: 'text', join: '\n' })
		expect(output).toBe(
`Den Haag
's-Gravenhage
Buenos Aires
Bono`
		)
	})
})