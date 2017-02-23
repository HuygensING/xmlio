import * as sax from "sax";
import State from "./state";
import parseCloseTag from './parse-close-tag';
import parseOpenTag from './parse-open-tag';
import parseText from './parse-text';

export default (xmlString, tags = [], tagsToSkip = []) => new Promise((resolve, reject) => {
	const state = new State();
	const parser = sax.parser(true, {});
	parser.onopentag = parseOpenTag(state, tags, tagsToSkip);
	parser.ontext = parseText(state, tagsToSkip);
	parser.onclosetag = parseCloseTag(state, tagsToSkip);
	parser.onerror = (e) => reject(e);
	parser.onend = () => resolve(state.html);
	parser.write(xmlString).close();
});
