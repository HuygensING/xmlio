import Xmlio from '../src/index.node'

const xml = `<xml>
	<locations>
		<location xml:id="14">Aurora</location>
		<location xml:id="15">
			<name>Buenos "Bono" Aires</name>
			<size on="14">12.000.000</size>
		</location>
	</locations>
</xml>`

describe('xmlio - replace', () => {
	test('When a target is not found, a warning is thrown', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.replace('#does-not-exist', (el) => `#should-not-get-called`)
			.export()
		expect(output).toBe(xml)
	})

	test('When a source is not found, a warning is thrown', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.replace('size', (el) => `#does-not-exist`)
			.export()
		expect(output).toBe(xml)
	})

	test('Replace a single target with a single source. Keep the source', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.replace('location[xml:id="14"]', (el) => `size[on="${el.getAttribute('xml:id')}"]`, false)
			.export()

		expect(output).toBe(
`<xml>
	<locations>
		<size on="14">12.000.000</size>
		<location xml:id="15">
			<name>Buenos "Bono" Aires</name>
			<size on="14">12.000.000</size>
		</location>
	</locations>
</xml>`)
	})

	test('Replace a single target with a single source. Remove the source', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.replace('location[xml:id="14"]', (el) => `size[on="${el.getAttribute('xml:id')}"]`)
			.export()

		expect(output).toBe(
`<xml>
	<locations>
		<size on="14">12.000.000</size>
		<location xml:id="15">
			<name>Buenos "Bono" Aires</name>
			
		</location>
	</locations>
</xml>`)
	})

	test('Replace multiple targets with a single source. Keep the source abcd', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.replace('location', () => 'size', false)
			.export()

		expect(output).toBe(
`<xml>
	<locations>
		<size on="14">12.000.000</size>
		<size on="14">12.000.000</size>
	</locations>
</xml>`)
	})

	test('Replace multiple targets with a single source. The source is removed and thus the second target is not replaced', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.replace('location', () => 'size')
			.export()

		expect(output).toBe(
`<xml>
	<locations>
		<size on="14">12.000.000</size>
		<location xml:id="15">
			<name>Buenos "Bono" Aires</name>
			
		</location>
	</locations>
</xml>`)
	})

	test('Replace a single target with multiple sources', async () => {
		const xmlio = new Xmlio(xml)
		const output = await xmlio
			.replace('locations', () => 'location')
			.export()

		expect(output).toBe(
`<xml>
	<location xml:id="14">Aurora</location><location xml:id="15">
			<name>Buenos "Bono" Aires</name>
			<size on="14">12.000.000</size>
		</location>
</xml>`)
	})
})