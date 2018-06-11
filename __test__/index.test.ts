import xml2html from '../src'
import xml, { defaultProcessed } from './data/xml'

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

const defaultJsx = `<Xml><Locations><Location xmlId="14">Aurora</Location><Location xmlId="15"><Name>Buenos "Bono" Aires</Name><Size>12.000.000</Size></Location></Locations></Xml>`

const defaultEmpty = `Aurora Buenos "Bono" Aires 12.000.000`

describe('xml2html {}', () => {
	test('Convert XML to HTML', async () => {
		const response = await xml2html(xml)
		expect(response[0]).toBe(defaultProcessed)
	})

	test('Convert XML to JSX', async () => {
		const response = await xml2html(xml, { outputType: 'jsx' })
		expect(response[0]).toBe(defaultJsx)
	})

	test('Convert XML to XML', async () => {
		const response = await xml2html(xml, { outputType: 'xml' })
		expect(response[0]).toBe(defaultProcessed)
	})

	test('Strip XML tags', async () => {
		const response = await xml2html(xml, { outputType: 'empty' })
		expect(response[0].replace(/\s\s+/g, ' ').trim()).toBe(defaultEmpty)
	})
})

describe('xml2html { rename }', () => {
	// test('basic', async () => {
	// 	const response = await xml2html(xml, {
	// 		rename: [
	// 			{
	// 				type: 'name',
	// 				to: 'colation',
	// 			},
	// 			{
	// 				type: 'name',
	// 				to: 'colations',
	// 			},
	// 			{
	// 				type: 'attribute',
	// 				to: 'id',
	// 			},
	// 			{
	// 				type: 'value',
	// 				to: '41',
	// 			},
	// 		]
	// 	})

	// 	expect(response[0]).toBe(xml
	// 		.replace(/locations/g, 'colations')
	// 		.replace(/location/g, 'colations')
	// 		.replace(/xml:id/g, 'id')
	// 		.replace(/xml/g, 'colations')
	// 		.replace(/name/g, 'colations')
	// 		.replace(/size/g, 'colations')
	// 		.replace(/14/g, '41')
	// 		.replace(/15/g, '41')
	// 	)
	// })

	// test('with selector', async () => {
	// 	const response = await xml2html(xml, {
	// 		rename: [
	// 			{
	// 				type: 'name',
	// 				selector: {
	// 					name: 'location',
	// 				},
	// 				to: 'colation',
	// 			},
	// 			{
	// 				type: 'name',
	// 				selector: {
	// 					name: 'locations',
	// 				},
	// 				to: 'colations',
	// 			},
	// 			{
	// 				type: 'attribute',
	// 				selector: {
	// 					attribute: 'xml:id',
	// 				},
	// 				to: 'id',
	// 			},
	// 			{
	// 				type: 'value',
	// 				selector: {
	// 					attribute: 'id',
	// 					value: '15',
	// 				},
	// 				to: '41',
	// 			},
	// 		]
	// 	})

	// 	expect(response[0]).toBe(xml
	// 		.replace(/location/g, 'colation')
	// 		.replace(/locations/g, 'colations')
	// 		.replace(/xml:id/g, 'id')
	// 		.replace(/15/g, '41')
	// 	)
	// })
})

