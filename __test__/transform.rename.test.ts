import Xmlio from '../src'

const xml = `<xml>
	<locs>
		<loc>
			<name id="1">Den Haag</name>
			<name id="2">'s Gravenhage</name>
		</loc>
		<loc>
			<name id="3">Buenos Aires</name>
			<name id="4">Bono</name>
		</loc>
	</locs>
</xml>`

describe('xmlio - change', () => {
	test('Rename root element', async () => {
		const xmlio = new Xmlio('<div class="hi" id="ho">he</div>')
		const output = await xmlio
			.rename('div', 'section')
			.export({ type: 'xml' })
		expect(output).toBe('<section class="hi" id="ho">he</section>')
	})

	test('Rename one element', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.rename('locs', 'locations')
			.select('locations')
			.export({ type: 'data', deep: false }) as any
		expect(output.name).toBe('locations')
	})

	test('Rename multiple elements', async () => {
		const xmlio = new Xmlio(xml)
		let output = await xmlio
			.rename('name', 'naam')
			.select('naam')
			.export({ type: 'data', deep: false })

		const output2 = Array.isArray(output) ? output : [output]
		expect(output2.map((el: any) => el.name)).toEqual(['naam', 'naam', 'naam', 'naam'])
	})
})
