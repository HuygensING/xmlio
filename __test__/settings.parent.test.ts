import xml2html from '../src'
import xml from './data/xml'
import { clean } from './utils'

describe('outputType: "jsx", parent: ', () => {
	test('{name: "locations"}', async () => {
		const response = await xml2html(xml, {
			outputType: 'jsx',
			parent: {
				name: 'locations',
			},
		})

		const output = [
			`<Locations>
				<Location xmlId="14">Aurora</Location>
				<Location xmlId="15">
					<Name>Buenos "Bono" Aires</Name>
					<Size>12.000.000</Size>
				</Location>
			</Locations>`
		]

		expect(response.map(clean)).toEqual(output.map(clean))
	})

	test('{name: "location"}', async () => {
		const response = await xml2html(xml, {
			outputType: 'jsx',
			parent: {
				name: 'location',
			},
		})

		const output = [
			'<Location xmlId="14">Aurora</Location>',
			`<Location xmlId="15"><Name>Buenos "Bono" Aires</Name><Size>12.000.000</Size></Location>`,
		]

		expect(response).toEqual(output)
	})

	test('{name: "location", attribute: "xml:id", value: "15"}', async () => {
		const response = await xml2html(xml, {
			outputType: 'jsx',
			parent: {
				name: 'location',
				attributes: {
					'xml:id': '15'
				}
			},
		})

		const output = [`<Location xmlId="15"><Name>Buenos "Bono" Aires</Name><Size>12.000.000</Size></Location>`]

		expect(response).toEqual(output)
	})

	// test('select divs', () => {
	// 	const input = 
	// 		`<body><div xml:id="A19420930_01" type="letter" on="#pIII_1" rend="external" n="001" when="1942-09-30">
	// 		</div>
	// 		<div xml:id="A19421001" type="letter" on="#pIII_1" rend="external" n="002" when="1942-10-01">
	// 		</div>
	// 		<div xml:id="A19421006" type="letter" on="#pIII_1" rend="external" n="003" when="1942-10-06">
	// 		</div>
	// 		<div xml:id="A19420612_01" type="fragment" n="004" notBefore="1942-06-12" sortDate="1942-06-12">
	// 		</div></body>`
	// 	const parent = { name: 'div', attributes: { n:  null }, notAttributes: { rend: 'inline' } }
	// })
})


// describe('outputType: "json", parent: ', () => {
// 	test('{ name: "location" }', async () => {
// 		const response = await xml2html(xml, {
// 			outputType: 'json',
// 			parent: { name: 'location' },
// 		})

// 		const expected = [
// 			{
// 				location: {
// 					_: 'Aurora',
// 					$: {
// 						'xml:id': '14',
// 					}
// 				}
// 			},
// 			{
// 				location: {
// 					$: {
// 						'xml:id': '15',
// 					},
// 					name: ['Buenos "Bono" Aires'],
// 					size: ['12.000.000'],
// 				}
// 			}
// 		]
// 		expect(response).toEqual(expected)
// 	})
// })