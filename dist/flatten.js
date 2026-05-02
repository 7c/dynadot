"use strict";
//#region imports
//#endregion
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenText = flattenText;
/**
 * Recursively unwraps `{ _text: value }` nodes produced by xml-js (compact
 * mode) into plain values. Pure / synchronous; preserves arrays and skips
 * inherited (non-own) keys to stay defensive against polluted prototypes.
 */
function flattenText(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map((item) => flattenText(item));
    }
    if ('_text' in obj) {
        return obj._text;
    }
    const result = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = flattenText(obj[key]);
        }
    }
    return result;
}
