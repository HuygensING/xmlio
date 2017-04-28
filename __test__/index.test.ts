import xml2html from '../src/index';

const xml =
	`<xml>
		<locations>
			<location xml:id="14">Aurora</location>
			<location xml:id="15">
				<name>Buenos "Bono" Aires</name>
				<size>12.000.000</size>
			</location>
		</locations>
	</xml>`;

const defaultHtml =
	`<div class="xml">
		<div class="locations">
			<div class="location" data-xml-id="14">Aurora</div>
			<div class="location" data-xml-id="15">
				<div class="name">Buenos "Bono" Aires</div>
				<div class="size">12.000.000</div>
			</div>
		</div>
	</div>`;

const defaultJsx =
	`<Xml>
		<Locations>
			<Location xmlId="14">Aurora</Location>
			<Location xmlId="15">
				<Name>Buenos "Bono" Aires</Name>
				<Size>12.000.000</Size>
			</Location>
		</Locations>
	</Xml>`;

const defaultEmpty = `Aurora Buenos "Bono" Aires 12.000.000`;

describe('xml2html {}', () => {
	test('html', async () => {
		const state = await xml2html(xml);
		expect(state.output).toBe(defaultHtml);
	});

	test('jsx', async () => {
		const state = await xml2html(xml, { outputType: 'jsx' });
		expect(state.output).toBe(defaultJsx);
	});

	test('xml', async () => {
		const state = await xml2html(xml, { outputType: 'xml' });
		expect(state.output).toBe(xml);
	});

	test('json', async () => {
		const state = await xml2html(xml, { outputType: 'json' });
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
		};
		expect(JSON.stringify(state.output)).toBe(JSON.stringify(expected));
	});

	test('empty', async () => {
		const state = await xml2html(xml, { outputType: 'empty' });
		const output = state.output
			.replace(/"/g, '\"')
			.replace(/\s\s+/g, ' ')
			.trim();
		expect(output).toBe(defaultEmpty);
	})
});


describe('xml2html { parent }', () => {
	test('{name: "locations"}', async () => {
		const state = await xml2html(xml, {
			outputType: 'jsx',
			parent: {
				name: 'locations',
			},
		});

		const output =
			`<Locations>
				<Location xmlId="14">Aurora</Location>
				<Location xmlId="15">
					<Name>Buenos "Bono" Aires</Name>
					<Size>12.000.000</Size>
				</Location>
			</Locations>`;

		expect(clean(state.output)).toBe(clean(output));
	});

	test('{name: "location"}', async () => {
		const state = await xml2html(xml, {
			outputType: 'jsx',
			parent: {
				name: 'location',
			},
		});

		const output =
			`<Location xmlId="14">Aurora</Location>
			<Location xmlId="15">
				<Name>Buenos "Bono" Aires</Name>
				<Size>12.000.000</Size>
			</Location>`;

		expect(clean(state.output)).toBe(clean(output));
	});

	test('{name: "location", attribute: "xml:id", value: "15"}', async () => {
		const state = await xml2html(xml, {
			outputType: 'jsx',
			parent: {
				name: 'location',
				attribute: 'xml:id',
				value: '15',
			},
		});

		const output =
			`<Location xmlId="15">
				<Name>Buenos "Bono" Aires</Name>
				<Size>12.000.000</Size>
			</Location>`;

		expect(clean(state.output)).toBe(clean(output));
	});
});


describe('xml2html { outputType: json, parent }', () => {
	test('json', async () => {
		const state = await xml2html(xml, {
			outputType: 'json',
			parent: { name: 'location' },
		});

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
		};

		expect(JSON.stringify(state.output)).toBe(JSON.stringify(expected));
	});
});

const clean = (xml) => xml.replace(/>(\s*)</g, '><');
