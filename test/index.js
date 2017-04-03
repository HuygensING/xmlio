const fs = require('fs');
const xml2html = require('../build/index.js').default;

const path = `${process.cwd()}/test/`;
const xmlInput = `${path}test.xml`;
const htmlOutput = `${path}test.html`;
const jsxOutput = `${path}test.jsx`;
const emptyOutput = `${path}test.empty`;

const main = async () => {
	const xmlString = fs.readFileSync(xmlInput, 'utf-8');

	const htmlState = await xml2html(xmlString, {
		startFromTag: 'text',
	});
	fs.writeFileSync(htmlOutput, htmlState.output, 'utf-8');

	const jsxState = await xml2html(xmlString, {
		componentsPath: 'client/components/entry',
		tagClass: 'jsx',
		startFromTag: 'body',
	});
	fs.writeFileSync(jsxOutput, jsxState.output, 'utf-8');

	const emptyState = await xml2html(xmlString, {
		tagClass: 'empty',
		startFromTag: 'body',
	});
	fs.writeFileSync(emptyOutput, emptyState.output, 'utf-8');
};

main();

