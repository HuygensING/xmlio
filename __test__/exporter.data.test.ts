import Xmlio from '../src/index.node'

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

describe('xmlio - exporter - data', () => {
	test('Export data with default settings', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio.export({ type: 'data' })
		expect(output).toEqual({
			name: 'xml',
			attributes: {},
			children: [
				{
					name: 'locs',
					attributes: {},
					children: [
						{
							name: 'loc',
							attributes: {},
							children: [
								{
									name: 'name',
									attributes: { id: "1" },
									children: ['Den Haag']
								},
								{
									name: 'name',
									attributes: { id: "2" },
									children: ["'s-Gravenhage"]
								},
							]
						},
						{
							name: 'loc',
							attributes: {},
							children: [
								{
									name: 'name',
									attributes: { id: "3" },
									children: ['Buenos Aires']
								},
								{
									name: 'name',
									attributes: { id: "4" },
									children: ['Bono']
								},
							]
						}
					]
				}
			]
		})
	})

	test('Export data, but not the text nodes', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio.export({ type: 'data', text: false })
		expect(output).toEqual({
			name: 'xml',
			attributes: {},
			children: [
				{
					name: 'locs',
					attributes: {},
					children: [
						{
							name: 'loc',
							attributes: {},
							children: [
								{
									name: 'name',
									attributes: { id: "1" },
									children: []
								},
								{
									name: 'name',
									attributes: { id: "2" },
									children: []
								},
							]
						},
						{
							name: 'loc',
							attributes: {},
							children: [
								{
									name: 'name',
									attributes: { id: "3" },
									children: []
								},
								{
									name: 'name',
									attributes: { id: "4" },
									children: []
								},
							]
						}
					]
				}
			]
		})
	})

	test('Export data, but not the child nodes', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio.export({ type: 'data', deep: false })
		expect(output).toEqual({
			name: 'xml',
			attributes: {},
			children: []
		})
	})
})