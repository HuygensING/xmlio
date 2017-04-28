import {ITagSelector} from "./types";
import {Tag as SaxTag} from "sax";
import { parseString } from 'xml2js';

const capitalize = (str: string): string =>
	str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Converts a string with a colon, to a string without a colon. The character
 * trailing the colon is uppercased.
 *
 * @example
 * // returns "xmlId"
 * convertColon("xml:id")
 *
 * @param {string} str
 * @returns {string}
 */
export const convertColon = (str: string): string =>
	str.replace(/:([a-zA-Z]{1})/g, (match, p1) => p1.toUpperCase());

export const formatTagName = (str: string): string => {
	if (str === 'date') str = `${str}_`;
	return capitalize(convertColon(str));
};

export const compareNodeToSelector = (node: SaxTag) => (selector: ITagSelector): boolean => {
	const name = selector.name  === node.name;
	const attribute = selector.attribute == null || Object.keys(node.attributes).indexOf(selector.attribute) > -1;
	const value = selector.value == null || (attribute && selector.value === node.attributes[selector.attribute]);
	return name && attribute && value;
};

export const ignoreNode = (ignore: ITagSelector[], node: SaxTag): boolean =>
	ignore.some(compareNodeToSelector(node));

export const xml2json = (xml) => new Promise<string>((resolve, reject) => {
	parseString(xml, (err, result) => {
		if (err) return reject(err);
		resolve(result);
	});
});
