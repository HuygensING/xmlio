"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlerDefaults = {
    change: {
        active: true,
        changeFunc: '',
        selector: '',
        type: 'change',
    },
    exclude: {
        active: true,
        selector: [],
        type: 'exclude',
    },
    rename: {
        active: true,
        selector: '',
        newName: '',
        type: 'rename',
    },
    replace: {
        active: true,
        removeSource: true,
        sourceSelectorFunc: '',
        targetSelector: '',
        type: 'replace',
    },
    select: {
        active: true,
        selector: '',
        type: 'select',
    },
    xml: {
        active: true,
        type: 'xml'
    },
    data: {
        active: true,
        deep: true,
        text: true,
        type: 'data'
    },
    text: {
        active: true,
        join: ' ',
        type: 'text'
    }
};
exports.default = handlerDefaults;
