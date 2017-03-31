import * as sax from "sax";
import State from "./state";
import parseCloseTag from './parse-close-tag';
import parseOpenTag from './parse-open-tag';
import parseText from './parse-text';
import {ISettings} from "./types";

import BaseTag from './base-tag';
export { BaseTag } ;

export default (xmlString: string, settings: ISettings = {}) =>
	new Promise<string>((resolve, reject) => {
		const state = new State(settings);
		const parser = sax.parser(true, {});
		parser.onopentag = parseOpenTag(state);
		parser.ontext = parseText(state);
		parser.onclosetag = parseCloseTag(state);
		parser.onerror = (e) => reject(e);
		parser.onend = () => resolve(state.wrapOutput());
		parser.write(xmlString).close();
	});
