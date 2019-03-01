"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators = {
    change: function (props) {
        return props.changeFunc.length > 0 && props.selector.length > 0;
    },
    exclude: function (props) {
        return props.selector.length > 0;
    },
    rename: function (props) {
        return props.selector.length > 0;
    },
    replace: function (props) {
        return props.targetSelector.length > 0 && props.sourceSelectorFunc.length > 0;
    },
    select: function (props) {
        return props.selector.length > 0;
    }
};
exports.default = validators;
