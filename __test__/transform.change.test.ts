import Xmlio from '../src/index.node'

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
	test('Add an attribute to an element', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.change('locs', (el) => {
				el.setAttribute('test', "true")
				return el
			})
			.select('locs')
			.export({ type: 'data', deep: false }) as any
		expect(output.attributes.test).toBe('true')
	})

	test('Change the value of multiple element attributes', async () => {
		const xmlio = new Xmlio(xml)
		let output = await xmlio
			.change('name', (el) => {
				el.setAttribute('id', `1${el.id}`) // prefix the IDs with a "1"
				return el
			})
			.select('name')
			.export({ type: 'data', deep: false })

		const output2 = Array.isArray(output) ? output : [output]
		expect(output2.map((el: any) => el.attributes.id)).toEqual(['11', '12', '13', '14'])
	})

	test('Add a child to an element', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.change('loc:nth-child(2)', (el) => {
				const name = document.createElement('name')
				name.id = '5'
				name.innerHTML = 'Bueno'
				el.appendChild(name)
				return el
			})
			.select('loc:nth-child(2)')
			.export({ type: 'data' }) as DataNode
		expect(output.children.length).toEqual(3)
	})
})
