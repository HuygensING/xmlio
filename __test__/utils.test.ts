import {formatTagName, compareNodeToSelector} from "../src/utils";

const div = {
	attributes: {
		type: 'edsNotes',
	},
	isSelfClosing: false,
	name: 'div',
};

const div2 = {
	attributes: {
		type: 'origNotes',
	},
	isSelfClosing: false,
	name: 'div',
};

const div3 = {
	attributes: {
		type: 'origNotes',
		tape: 'notesOrig',
	},
	isSelfClosing: false,
	name: 'div',
};

const hi = {
	attributes: {
		rend: "underline",
	},
	isSelfClosing: false,
	name: 'hi',
};

const hi2 = {
	attributes: {
		render: "super",
	},
	isSelfClosing: false,
	name: 'hi',
};

const lb = {
	attributes: {},
	isSelfClosing: true,
	name: 'lb',
};

const lb2 = {
	attributes: {
		ignore: "true",
	},
	isSelfClosing: true,
	name: 'lb',
};

const choice = {
	attributes: {},
	isSelfClosing: false,
	name: 'choice',
};

// describe('renameNode', () => {
// 	test('1', () => {
// 		const config = [{ type: 'name', to: 'dav' }]
// 		expect(renameNode(div2, config)).toEqual(
// 			{
// 				attributes: { type: 'origNotes' },
// 				isSelfClosing: false,
// 				name: 'dav',
// 			}
// 		)
// 	})

// 	test('2', () => {
// 		const config = [{ type: 'name', to: (t: string) => t.toUpperCase() }]
// 		expect(renameNode(div2, config)).toEqual(
// 			{
// 				attributes: { type: 'origNotes' },
// 				isSelfClosing: false,
// 				name: 'DIV',
// 			}
// 		)
// 	})

// 	test('3', () => {
// 		const config = [{ type: 'attribute', to: (t: string) => t.toUpperCase() }]
// 		expect(renameNode(div2, config)).toEqual(
// 			{
// 				attributes: { TYPE: 'origNotes' },
// 				isSelfClosing: false,
// 				name: 'div',
// 			}
// 		)
// 	})

// 	test('4', () => {
// 		const config = [{ type: 'value', to: (t: string) => t.toUpperCase() }]
// 		expect(renameNode(div2, config)).toEqual(
// 			{
// 				attributes: { type: 'ORIGNOTES' },
// 				isSelfClosing: false,
// 				name: 'div',
// 			}
// 		)
// 	})

// 	test('5', () => {
// 		const config = [
// 			{ type: 'name', to: (t: string) => t.toUpperCase() },
// 			{ type: 'attribute', to: (t: string) => t.toUpperCase() },
// 			{ type: 'value', to: (t: string) => t.toUpperCase(), selector: { attribute: 'TYPE' } },
// 		]
// 		expect(renameNode(div3, config)).toEqual(
// 			{
// 				attributes: { TYPE: 'ORIGNOTES', TAPE: 'notesOrig' },
// 				isSelfClosing: false,
// 				name: 'DIV',
// 			}
// 		)
// 	})
// })

describe('compareNodeToSelector', () => {
	// test('empty comparator', () => expect(compareNodeToSelector(div2)({})).toBeTruthy())
	// test('name only', () => expect(compareNodeToSelector(div2)({ name: 'div' })).toBeTruthy())
	// test('name only', () => expect(compareNodeToSelector(div2)({ name: 'dav' })).toBeFalsy())
	// test('attribute only', () => expect(compareNodeToSelector(div2)({ attributes: { 'type': null } })).toBeTruthy())
	// test('attribute only', () => expect(compareNodeToSelector(div2)({ attributes: { 'tope': null } })).toBeFalsy())
	// test('value only', () => expect(compareNodeToSelector(div2)({ attributes: { __: 'origNotes' } })).toBeTruthy())
	// test('value only', () => expect(compareNodeToSelector(div2)({ attributes: { __: 'oragNotes' } })).toBeFalsy())
	// test('name & attribute', () => expect(compareNodeToSelector(div2)({ name: 'div', attributes: { 'type': null } })).toBeTruthy())
	// test('name & attribute', () => expect(compareNodeToSelector(div2)({ name: 'div', attributes: { 'tope': null } })).toBeFalsy())
	// test('attribute & value', () => expect(compareNodeToSelector(div2)({ attributes: { type: 'origNotes' }})).toBeTruthy())
	// test('attribute & value', () => expect(compareNodeToSelector(div2)({ attributes: { type: 'oragNotes' }})).toBeFalsy())
	// test('attribute & value', () => expect(compareNodeToSelector(div2)({ attributes: { tope: 'origNotes' }})).toBeFalsy())
	// test('attribute & value', () => expect(compareNodeToSelector(div2)({ attributes: { tope: 'oragNotes' }})).toBeFalsy())
	// test('name & value', () => expect(compareNodeToSelector(div2)({ name: 'div', attributes: { __: 'origNotes' } })).toBeTruthy())
	// test('name & value', () => expect(compareNodeToSelector(div2)({ name: 'div', attributes: { __: 'oragNotes' } })).toBeFalsy())
	// test('name & value', () => expect(compareNodeToSelector(div2)({ name: 'dav', attributes: { __: 'origNotes' } })).toBeFalsy())
	// test('name & value', () => expect(compareNodeToSelector(div2)({ name: 'dav', attributes: { __: 'oragNotes' } })).toBeFalsy())
	// test('name, attribute & value', () => expect(compareNodeToSelector(div2)({ name: 'div', attributes: { 'type': 'origNotes' } })).toBeTruthy())
	// test('name, attribute & value', () => expect(compareNodeToSelector(div2)({ name: 'div', attributes: { 'type': 'oragNotes' } })).toBeFalsy())

	test('name, attribute & value', () =>
		expect(
			compareNodeToSelector(div3)({ name: 'div', attributes: { 'type': 'origNotes' }, notAttributes: { tape: 'noteasOrig'} })
		).toBeTruthy()
	)
	test('name, attribute & value', () =>
		expect(
			compareNodeToSelector(div3)({ name: 'div', attributes: { 'type': 'origNotes' }, notAttributes: { tape: 'notesOrig'} })
		).toBeFalsy()
	)
})

describe('formatTagName', () => {
	test('div => Div', () => {
		expect(formatTagName('div')).toBe('Div');
	});

	test('md:Transpose => MdTranspose', () => {
		expect(formatTagName('md:Transpose')).toBe('MdTranspose');
	});

	test('af:origNote => AfOrigNote', () => {
		expect(formatTagName('af:origNote')).toBe('AfOrigNote');
	});

	test('date => Date_', () => {
		expect(formatTagName('date')).toBe('Date_');
	});
});

