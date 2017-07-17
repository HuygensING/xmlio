import * as sax from "sax";
import State from "./state";
import parseCloseTag from './parse-close-tag';
import parseOpenTag from './parse-open-tag';
import parseText from './parse-text';
import {ISettings, IState} from "./types";
import {xml2json} from "./utils";

import EmptyTag from './tags/empty';
import HtmlTag from './tags/html';
import JsxTag from './tags/jsx';
import XmlTag from './tags/xml';
export { EmptyTag, HtmlTag, JsxTag, XmlTag } ;

export default (xmlString: string, settings: ISettings = {}) =>
	new Promise<IState>((resolve, reject) => {
		const state = new State(settings);
		const parser = sax.parser(true, {});
		parser.onopentag = parseOpenTag(state);
		parser.ontext = parseText(state);
		parser.onclosetag = parseCloseTag(state);
		parser.onerror = (e) => reject(e);
		parser.onend = async () => {
			if (state.settings.outputType === 'json') {
				// The settings.parent option can yield invalid XML. If parent is 'b':
				// <a><b /><b /></a>, results in: <b /><b />. If this is passed
				// to xml2json, only the first <b /> will be parsed, therefor a
				// root node is added.
				if (state.settings.parent != null) {
					state.output = `<root>${state.output}</root>`;
				}

				state.output = await xml2json(state.output);
			}

			resolve(state);
		};
		parser.write(xmlString).close();
	});
