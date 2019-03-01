function renameSuite() {
	let xmlio

	suiteSetup(async function() {
		const doc = await fetchXML('/__test/test.xml')
		xmlio = new XMLio(doc)
	})

	test('Rename hierarchic elements with colon', async () => {
		const output = xmlio
			.rename('*', (oldName) => oldName.replace(':', ''))
			.select('someloc')
			.export({ type: 'xml' })
		assert.strictEqual(
			output[0],
			'<someloc>\n\t\t\t<somename some:attr="5">Den Bosch</somename>\n\t\t\t<somename some:attr="6">\'s Hertogenbosch</somename>\n\t\t</someloc>'
		)
	})
}
