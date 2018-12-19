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

describe('xmlio - exlude', () => {
	test('Exclude selector does not match any elements', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.exclude('#does-not-exists')
			.export()
		expect(output).toBe(xml)
	})

	test('Exclude selector matches element <name>', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.exclude('name')
			.export()
		expect(output).toBe(
`<xml>
	<locs>
		<loc>
			
			
		</loc>
		<loc>
			
			
		</loc>
	</locs>
</xml>`
)
	})

	test('Exclude selector matches element <loc>', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.exclude('loc')
			.export()
		expect(output).toBe(
`<xml>
	<locs>
		
		
	</locs>
</xml>`
)
	})
	
	test('Exclude selector matches element <locs>', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.exclude('locs')
			.export()
		expect(output).toBe(
`<xml>
	
</xml>`
)
	})

	test('Excluding the root node yields an empty string', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.exclude('xml')
			.export()
		expect(output).toBe('')
	})

	test('Exclude with multiple selectors', async () => {
		const xmlio = new Xmlio('<numbers><one /><two /><three /><four /></numbers>')
		const output = await xmlio
			.exclude(['two', 'four'])
			.export()
		expect(output).toBe('<numbers><one/><three/></numbers>')
	})
})