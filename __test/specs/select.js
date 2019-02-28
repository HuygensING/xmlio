function selectSuite() {
	let xmlio

	suiteSetup(async function() {
		const doc = await fetchXML('/__test/test.xml')
		xmlio = new XMLio(doc)
	})

	test('Select with selector which does not find any elements', async () => {
		const output = xmlio.select('#does-not-exist').export({ type: 'xml' })
		assert.isArray(output)
		assert.isEmpty(output)
	})

	test('Select with selector which finds 1 elements', async () => {
		const output = xmlio.select('loc[some:attr="5"]').export({ type: 'xml' })
		assert.lengthOf(output, 1)
		assert.isString(output[0])
	})

	test('Select with top node selector', async () => {
		const output = xmlio.select('locs').export({ type: 'xml' })
		assert.lengthOf(output, 1)
		assert.isString(output[0])
	})

	test('Select with selector which finds 2 elements', async () => {
		const output = xmlio.select('loc').export({ type: 'xml' })
		assert.lengthOf(output, 2)
	})

	test('Select with selector which finds 4 elements', async () => {
		const output = xmlio.select('loc > *').export({ type: 'xml' })
		assert.lengthOf(output, 4)
	})

	test('Chained selects', async () => {
		const output = xmlio
			.select('locs')
			.select('loc')
			.export({ type: 'xml' })
		assert.lengthOf(output, 2)
	})

	test('Chained selects with namespace', async () => {
		const output = xmlio
			.select('loc')
			.select('some:name')
			.export({ type: 'xml' })
		assert.lengthOf(output, 2)
	})

	test('Select with :not() selector', async () => {
		const output = xmlio.select('loc[some:attr="5"] > *:not([some:attr="2"])').export({ type: 'data' })
		assert.equal(output[0].attributes['some:attr'], '1')
	})

	test('Select element with namespace and upper case in attribute. Selector = "[some:aTtribut]"', function() {
		const output = xmlio.select('[some:aTtribut]').export({ type: 'xml' })
		assert.equal(output, `<some:name some:aTtribut="3">Buenos Aires</some:name>`)
	})

	test('Select element with namespace and upper case in node name. Selector = "some:nOam"', async () => {
		const output = xmlio.select('some:nOam').export({ type: 'xml' })
		assert.equal(output, `<some:nOam some:attr="2">'s Gravenhage</some:nOam>`)
	})
}
