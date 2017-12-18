import * as sax from "sax";
import State from "./state";
import parseCloseTag from './parse-close-tag';
import parseOpenTag from './parse-open-tag';
import parseText from './parse-text';
import {xml2json} from "./utils";
import Settings from './state/setttings'
import { SPLIT_ON_DIVIDER } from "./constants";

export interface ReturnType {
	result: string | string[] | Object
	state: State
}

export default (xmlString: string, settings: Partial<Settings> = {}) =>
	new Promise<ReturnType>((resolve, reject) => {
		const state = new State(settings);
		const parser = sax.parser(true, {});
		parser.onopentag = parseOpenTag(state);
		parser.ontext = parseText(state);
		parser.onclosetag = parseCloseTag(state);
		parser.onerror = reject
		parser.onend = async () => {
			let result: string | string[] | Object
			if (state.settings.outputType === 'json') {
				// The settings.parent option can yield invalid XML. If parent is 'b':
				// <a><b /><b /></a>, results in: <b /><b />. If this is passed
				// to xml2json, only the first <b /> will be parsed, therefor a
				// root node is added.
				if (state.settings.parent != null) {
					state.output = `<root>${state.output}</root>`;
				}

				result = await xml2json(state.output)
			}

			if (state.settings.splitOn != null) {
				result = state.output.split(SPLIT_ON_DIVIDER).slice(1)
			}

			if (state.settings.outputType === 'empty') {
				result = state.output
					.replace(/"/g, '\"')
					.replace(/\s\s+/g, ' ')
					.trim()
			}

			if (result == null) result = state.output

			resolve({ result, state });
		};
		parser.write(xmlString).close();
	});
