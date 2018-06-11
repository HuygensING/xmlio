import OpenTags from "../../src/state/open-tags";

const div = { data: {
	attributes: {
		type: 'edsNotes',
	},
	isSelfClosing: false,
	name: 'div',
}};

const div2 = { data: {
	attributes: {
		type: 'origNotes',
	},
	isSelfClosing: false,
	name: 'div',
}};

const hi = { data: {
	attributes: {
		rend: "underline",
	},
	isSelfClosing: false,
	name: 'hi',
}};

const hi2 = { data: {
	attributes: {
		render: "super",
	},
	isSelfClosing: false,
	name: 'hi',
}};

const lb = { data: {
	attributes: {},
	isSelfClosing: true,
	name: 'lb',
}};

const lb2 = { data: {
	attributes: {
		ignore: "true",
	},
	isSelfClosing: true,
	name: 'lb',
}};

const choice = { data: {
	attributes: {},
	isSelfClosing: false,
	name: 'choice',
}};

const openTags = new OpenTags();

describe('OpenTags', () => {
	test('.add & .remove', () => {
		openTags.add(div);
		expect(openTags.count()).toBe(1);
		openTags.add(hi);
		expect(openTags.count()).toBe(2);
		openTags.remove();
		expect(openTags.count()).toBe(1);
		openTags.remove();
		expect(openTags.count()).toBe(0);
	});

	test('.contains', () => {
		openTags.add(div);
		openTags.add(hi);
		expect(openTags.contains('div')).toBeTruthy();
		expect(openTags.contains('hi')).toBeTruthy();
		expect(openTags.contains('lb')).toBeFalsy();
		expect(openTags.contains('choice')).toBeFalsy();
	});

	test('.containsBy', () => {
		expect(openTags.containsBy({ name: 'div' })).toBeTruthy();
		expect(openTags.containsBy({ name: 'div', attributes: { 'type': null } })).toBeTruthy();
		expect(openTags.containsBy({ name: 'div', attributes: { 'type': 'edsNotes' } })).toBeTruthy();

		expect(openTags.containsBy({ name: 'div', attributes: { type: 'origNotes' } })).toBeFalsy();
		expect(openTags.containsBy({ name: 'div', attributes: { 'tipe': null } })).toBeFalsy();
		expect(openTags.containsBy({ name: 'lb' })).toBeFalsy();
	});

	test('.containsOneOf', () => {
		expect(openTags.containsOneOf([{ name: 'div' }])).toBeTruthy();
		expect(openTags.containsOneOf([{ name: 'div', attributes: { 'type': null } }])).toBeTruthy();
		expect(openTags.containsOneOf([{ name: 'div', attributes: { 'type': 'edsNotes' } }])).toBeTruthy();
		expect(openTags.containsOneOf([{ name: 'hi' }, { name: 'boo'} ])).toBeTruthy();

		expect(openTags.containsOneOf([{ name: 'div', attributes: { type: 'origNotes' } }])).toBeFalsy();
		expect(openTags.containsOneOf([{ name: 'choice' }])).toBeFalsy()
	});

	test('.countType', () => {
		expect(openTags.countType('div')).toBe(1);
		openTags.add(div2);
		expect(openTags.countType('div')).toBe(2);
	});

	test('.lastOfType', () => {
		let last = openTags.lastOfType('div');
		expect(last.data.attributes.type).toBe('origNotes');
		openTags.remove();
		last = openTags.lastOfType('div');
		expect(last.data.attributes.type).toBe('edsNotes');
	});
})
