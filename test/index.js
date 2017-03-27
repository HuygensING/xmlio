const fs = require('fs');
const xml2html = require('../build/index.js').default;

const path = `${process.cwd()}/test/`;
const xmlInput = `${path}test.xml`;
const htmlOutput = `${path}test.html`;
const jsxOutput = `${path}test.jsx`;

const main = async () => {
	const xmlString = fs.readFileSync(xmlInput, 'utf-8');

	const html = await xml2html(xmlString, {
		startFromTag: 'text',
	});
	fs.writeFileSync(htmlOutput, html, 'utf-8');

	const jsx = await xml2html(xmlString, {
		componentsPath: 'client/components/entry',
		jsx: true,
		startFromTag: 'body',
	});
	fs.writeFileSync(jsxOutput, jsx, 'utf-8');

};

main();

