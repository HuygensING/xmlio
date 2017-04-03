import * as sax from "sax";
import State from "./state";
import parseCloseTag from './parse-close-tag';
import parseOpenTag from './parse-open-tag';
import parseText from './parse-text';
import {ISettings, IState} from "./types";

import HtmlTag from './tags/html';
import JsxTag from './tags/jsx';
import EmptyTag from './tags/empty';
export { EmptyTag, HtmlTag, JsxTag } ;

export default (xmlString: string, settings: ISettings = {}) =>
	new Promise<IState>((resolve, reject) => {
		const state = new State(settings);
		const parser = sax.parser(true, {});
		parser.onopentag = parseOpenTag(state);
		parser.ontext = parseText(state);
		parser.onclosetag = parseCloseTag(state);
		parser.onerror = (e) => reject(e);
		parser.onend = () => resolve(state);
		parser.write(xmlString).close();
	});
