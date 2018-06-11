import xml2html from '../src'
import xml from './data/xml'
import { clean } from './utils'

describe('wrapNodes', () => {
	test('1', async () => {
		const response = await xml2html(xml, {
			parent: { name: 'locations' },
			wrapNodes: {
				selector: { name: 'location' },
				parent: { name: 'p' }	
			}
		})

		const output = `<locations><p><location xml:id="14">Aurora</location></p><p><location xml:id="15"><name>Buenos "Bono" Aires</name><size>12.000.000</size></location></p></locations>`

		expect(response[0]).toBe(output)
	})
})

describe('wrapNodes, move', () => {
	test('2', async () => {
		const response = await xml2html(xml, {
			move: {
				selector: { name: 'size' },
				parentSelector: { name: 'locations' },
			},
			parent: { name: 'locations' },
			wrapNodes: {
				selector: { name: 'location' },
				parent: { name: 'p' }	
			}
		})

		const output =
			`<locations><size>12.000.000</size>
				<p><location xml:id="14">Aurora</location></p>
				<p><location xml:id="15">
					<name>Buenos "Bono" Aires</name>
				</location></p>
				
			</locations>`

		expect(clean(response[0])).toBe(clean(output))
	})
})

describe('wrapNodes, move, parent', () => {
	test('2', async () => {
		const response = await xml2html(xml, {
			move: {
				selector: { name: 'size' },
				parentSelector: { name: 'name' },
			},
			parent: { name: 'location' },
			wrapNodes: {
				selector: { name: 'location' },
				parent: { name: 'p' }	
			}
		})

		const output = [
				'<p><location xml:id="14">Aurora</location></p>',
				`<p>
					<location xml:id="15">
						<name><size>12.000.000</size>Buenos "Bono" Aires</name>
					</location>
				</p>`,
		]

		expect(response.map(clean)).toEqual(output.map(clean))
	})
})