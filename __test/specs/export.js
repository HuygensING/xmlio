function exportSuite() {
	let xmlio

	suiteSetup(async function() {
		const doc = await fetchXML('/__test/test.xml')
		xmlio = new XMLio(doc)
	})

	test('Export XML with namespace', async () => {
		const output = xmlio.select('some:Naam').export({ type: 'xml' })
		const out = `<some:Naam some:attr="1">Den Haag</some:Naam>`
		assert.strictEqual(output[0], out)
	})

	test('Export DOM with namespace', async () => {
		const output = xmlio.select('some:Naam').export({ type: 'dom' })
		const out = `<some:Naam some:attr="1">Den Haag</some:Naam>`
		const serializer = new XMLSerializer()
		const xml = serializer.serializeToString(output[0])
		assert.strictEqual(xml, out)
	})
}
