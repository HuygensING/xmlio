import xml2html from '../src'

const xml =
	`<xml>
		<locations>
			<location xml:id="14">Aurora</location>
			<location xml:id="15">
				<name>Buenos "Bono" Aires</name>
				<size>12.000.000</size>
			</location>
		</locations>
	</xml>`

const defaultHtml =
	`<div class="xml">
		<div class="locations">
			<div class="location" data-xml-id="14">Aurora</div>
			<div class="location" data-xml-id="15">
				<div class="name">Buenos "Bono" Aires</div>
				<div class="size">12.000.000</div>
			</div>
		</div>
	</div>`

const defaultJsx =
	`<Xml>
		<Locations>
			<Location xmlId="14">Aurora</Location>
			<Location xmlId="15">
				<Name>Buenos "Bono" Aires</Name>
				<Size>12.000.000</Size>
			</Location>
		</Locations>
	</Xml>`

const defaultEmpty = `Aurora Buenos "Bono" Aires 12.000.000`

describe('xml2html {}', () => {
	test('Convert XML to HTML', async () => {
		const response = await xml2html(xml)
		expect(response.result).toBe(xml)
	})

	test('Convert XML to JSX', async () => {
		const response = await xml2html(xml, { outputType: 'jsx' })
		expect(response.result).toBe(defaultJsx)
	})

	test('Convert XML to XML', async () => {
		const response = await xml2html(xml, { outputType: 'xml' })
		expect(response.result).toBe(xml)
	})

	test('Convert XML to JSON', async () => {
		const response = await xml2html(xml, { outputType: 'json' })
		const expected = {
			xml: {
				locations: [{
					location: [{
						_: 'Aurora',
						$: {
							'xml:id': '14',
						}
					}, {
						$: {
							'xml:id': '15',
						},
						name: ['Buenos "Bono" Aires'],
						size: ['12.000.000'],
					}]
				}]
			}
		}
		expect(JSON.stringify(response.result)).toBe(JSON.stringify(expected))
	})

	test('Strip XML tags', async () => {
		const response = await xml2html(xml, { outputType: 'empty' })
		const output = response.result
		expect(output).toBe(defaultEmpty)
	})
})

describe('xml2html { splitOn }', () => {
	test('Split on selector', async () => {
		const response = await xml2html(xml, { splitOn: { name: 'location' } })
		expect(JSON.stringify(response.result)).toBe(JSON.stringify([
			'<location xml:id="14">Aurora</location>',
			`<location xml:id="15">
				<name>Buenos "Bono" Aires</name>
				<size>12.000.000</size>
			</location>`,
		]))
	})
})

describe('xml2html { parent }', () => {
	test('{name: "locations"}', async () => {
		const response = await xml2html(xml, {
			outputType: 'jsx',
			parent: {
				name: 'locations',
			},
		})

		const output =
			`<Locations>
				<Location xmlId="14">Aurora</Location>
				<Location xmlId="15">
					<Name>Buenos "Bono" Aires</Name>
					<Size>12.000.000</Size>
				</Location>
			</Locations>`

		expect(clean(response.result)).toBe(clean(output))
	})

	test('{name: "location"}', async () => {
		const response = await xml2html(xml, {
			outputType: 'jsx',
			parent: {
				name: 'location',
			},
		})

		const output =
			`<Location xmlId="14">Aurora</Location>
			<Location xmlId="15">
				<Name>Buenos "Bono" Aires</Name>
				<Size>12.000.000</Size>
			</Location>`

		expect(clean(response.result)).toBe(clean(output))
	})

	test('{name: "location", attribute: "xml:id", value: "15"}', async () => {
		const response = await xml2html(xml, {
			outputType: 'jsx',
			parent: {
				name: 'location',
				attribute: 'xml:id',
				value: '15',
			},
		})

		const output =
			`<Location xmlId="15">
				<Name>Buenos "Bono" Aires</Name>
				<Size>12.000.000</Size>
			</Location>`

		expect(clean(response.result)).toBe(clean(output))
	})
})


describe('xml2html { outputType: json, parent }', () => {
	test('json', async () => {
		const response = await xml2html(xml, {
			outputType: 'json',
			parent: { name: 'location' },
		})

		const expected = {
			root: {
				location: [{
					_: 'Aurora',
					$: {
						'xml:id': '14',
					}
				}, {
					$: {
						'xml:id': '15',
					},
					name: ['Buenos "Bono" Aires'],
					size: ['12.000.000'],
				}]
			}
		}

		expect(JSON.stringify(response.result)).toBe(JSON.stringify(expected))
	})
})

const clean = (xml) => xml.replace(/>(\s*)</g, '><')
