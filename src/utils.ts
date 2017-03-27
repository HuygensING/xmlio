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
const convertColon = (str: string): string =>
	str.replace(/:([a-z]{1})/g, (match, p1) => p1.toUpperCase());

export const formatTagName = (str: string): string => {
	if (str === 'date') str = `${str}_`;
	return capitalize(convertColon(str));
};
