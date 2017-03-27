"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const convertColon = (str) => str.replace(/:([a-z]{1})/g, (match, p1) => p1.toUpperCase());
exports.formatTagName = (str) => {
    if (str === 'date')
        str = `${str}_`;
    return capitalize(convertColon(str));
};
