import {formatTagName, ignoreNode} from "../src/utils";

const ignore = [
	{ name: 'div', attribute: 'type', value: 'edsNotes' },
	{ name: 'hi', attribute: 'rend' },
	{ name: 'lb' }
];

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

describe('ignoreNode', () => {
	test('div should be ignored', () => {
		expect(ignoreNode(ignore, div)).toBeTruthy();
	});

	test('div2 should not be ignored', () => {
		expect(ignoreNode(ignore, div2)).toBeFalsy();
	});

	test('hi should be ignored', () => {
		expect(ignoreNode(ignore, hi)).toBeTruthy();
	});

	test('hi2 should not be ignored', () => {
		expect(ignoreNode(ignore, hi2)).toBeFalsy();
	});

	test('lb should be ignored', () => {
		expect(ignoreNode(ignore, lb)).toBeTruthy();
	});

	test('lb2 should be ignored', () => {
		expect(ignoreNode(ignore, lb2)).toBeTruthy();
	});

	test('choice should not be ignored', () => {
		expect(ignoreNode(ignore, choice)).toBeFalsy();
	});
});

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

