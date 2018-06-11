import { SaxTagSelector } from "./types"
import {Tag as SaxTag} from "sax"

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

export const compareNodeToSelector = (node: SaxTag) => (selector: SaxTagSelector): boolean => {
	const nameMatched = selector.name == null || selector.name  === node.name
	if (selector.attributes == null) return nameMatched

	const attributesMatched = (attrs: { [key: string]: string }) => {
		if (attrs == null) return false

		return Object.keys(attrs).some(key => {
			const value = attrs[key]
			if (key == '__' && value == null) return true
			if (value == null && Object.keys(node.attributes).indexOf(key) > -1) return true
			if (key == '__' && Object.keys(node.attributes).map(k => node.attributes[k]).indexOf(value) > -1) return true
			if (node.hasOwnProperty('attributes')) {
				return Object.keys(node.attributes)
					.reduce((prev, currKey) => {
						const currValue = node.attributes[currKey]
						const curr = attrs[currKey] === currValue
						return prev || curr
					}, false)
			}
			return false
		})
	}

	return nameMatched && (attributesMatched(selector.attributes) && !attributesMatched(selector.notAttributes))
}
