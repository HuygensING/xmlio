import {formatTagName, compareNodeToSelector} from "../src/utils";

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

describe('compareNodeToSelector', () => {
	const compare2 = compareNodeToSelector(div2)
	const compare3 = compareNodeToSelector(div3)

	test('empty comparator', () => expect(compare2({})).toBeTruthy())
	test('name only', () => expect(compare2({ name: 'div' })).toBeTruthy())
	test('name only', () => expect(compare2({ name: 'dav' })).toBeFalsy())
	test('attribute only', () => expect(compare2({ attributes: { 'type': null } })).toBeTruthy())
	test('attribute only', () => expect(compare2({ attributes: { 'tope': null } })).toBeFalsy())
	test('value only', () => expect(compare2({ attributes: { __: 'origNotes' } })).toBeTruthy())
	test('value only', () => expect(compare2({ attributes: { __: 'oragNotes' } })).toBeFalsy())
	test('name & attribute', () => expect(compare2({ name: 'div', attributes: { 'type': null } })).toBeTruthy())
	test('name & attribute', () => expect(compare2({ name: 'div', attributes: { 'tope': null } })).toBeFalsy())
	test('attribute & value', () => expect(compare2({ attributes: { type: 'origNotes' }})).toBeTruthy())
	test('attribute & value', () => expect(compare2({ attributes: { type: 'oragNotes' }})).toBeFalsy())
	test('attribute & value', () => expect(compare2({ attributes: { tope: 'origNotes' }})).toBeFalsy())
	test('attribute & value', () => expect(compare2({ attributes: { tope: 'oragNotes' }})).toBeFalsy())
	test('name & value', () => expect(compare2({ name: 'div', attributes: { __: 'origNotes' } })).toBeTruthy())
	test('name & value', () => expect(compare2({ name: 'div', attributes: { __: 'oragNotes' } })).toBeFalsy())
	test('name & value', () => expect(compare2({ name: 'dav', attributes: { __: 'origNotes' } })).toBeFalsy())
	test('name & value', () => expect(compare2({ name: 'dav', attributes: { __: 'oragNotes' } })).toBeFalsy())
	test('name, attribute & value', () => expect(compare2({ name: 'div', attributes: { 'type': 'origNotes' } })).toBeTruthy())
	test('name, attribute & value', () => expect(compare2({ name: 'div', attributes: { 'type': 'oragNotes' } })).toBeFalsy())

	test('name, attribute & value', () =>
		expect(
			compare3({ name: 'div', attributes: { 'type': 'origNotes' }, notAttributes: { tape: 'noteasOrig'} })
		).toBeTruthy()
	)
	test('name, attribute & value', () =>
		expect(
			compare3({ name: 'div', attributes: { 'type': 'origNotes' }, notAttributes: { tape: 'notesOrig'} })
		).toBeFalsy()
	)
	test('name, attribute & value', () =>
		expect(
			compare3({ name: 'div', attributes: { type: 'origNotes', tape: 'notesOrig' }})
		).toBeTruthy()
	)
	test('name, attribute & value abc', () =>
		expect(
			compare3({ name: 'div', attributes: { type: 'origNotes', tape: 'notisOreg' }})
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

