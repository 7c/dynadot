"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region imports
const flatten_1 = require("./flatten");
//#endregion
describe('flattenText', () => {
    describe('primitive / non-object inputs (early return branch)', () => {
        test('returns null verbatim', () => {
            expect((0, flatten_1.flattenText)(null)).toBeNull();
        });
        test('returns undefined verbatim', () => {
            expect((0, flatten_1.flattenText)(undefined)).toBeUndefined();
        });
        test('returns strings verbatim', () => {
            expect((0, flatten_1.flattenText)('hello')).toBe('hello');
        });
        test('returns numbers verbatim (including 0)', () => {
            expect((0, flatten_1.flattenText)(42)).toBe(42);
            expect((0, flatten_1.flattenText)(0)).toBe(0);
        });
        test('returns booleans verbatim', () => {
            expect((0, flatten_1.flattenText)(true)).toBe(true);
            expect((0, flatten_1.flattenText)(false)).toBe(false);
        });
    });
    describe('_text wrapper (xml-js compact node)', () => {
        test('unwraps a string _text', () => {
            expect((0, flatten_1.flattenText)({ _text: 'just-a-string' })).toBe('just-a-string');
        });
        test('unwraps a numeric _text verbatim', () => {
            expect((0, flatten_1.flattenText)({ _text: 7 })).toBe(7);
        });
        test('unwrapping ignores sibling keys (matches source behavior)', () => {
            // Source returns `obj._text` as soon as `_text` is present,
            // dropping any sibling attributes. Asserting the contract.
            expect((0, flatten_1.flattenText)({ _text: 'val', _attributes: { a: '1' } })).toBe('val');
        });
    });
    describe('arrays (Array.isArray branch)', () => {
        test('maps over each element and flattens recursively', () => {
            expect((0, flatten_1.flattenText)([
                { _text: 'a' },
                { _text: 'b' },
                'plain',
                42,
                null,
            ])).toEqual(['a', 'b', 'plain', 42, null]);
        });
        test('returns an empty array for an empty array (preserves length)', () => {
            const out = (0, flatten_1.flattenText)([]);
            expect(Array.isArray(out)).toBe(true);
            expect(out).toHaveLength(0);
        });
        test('handles nested arrays of objects', () => {
            expect((0, flatten_1.flattenText)([[{ _text: 'x' }], [{ _text: 'y' }]])).toEqual([['x'], ['y']]);
        });
    });
    describe('plain objects (recursive branch)', () => {
        test('recursively unwraps nested _text nodes', () => {
            expect((0, flatten_1.flattenText)({
                SuccessCode: { _text: '0' },
                Status: { _text: 'success' },
                Nested: { Deep: { _text: 'value' } },
            })).toEqual({
                SuccessCode: '0',
                Status: 'success',
                Nested: { Deep: 'value' },
            });
        });
        test('returns an empty object for an empty object', () => {
            expect((0, flatten_1.flattenText)({})).toEqual({});
        });
        test('does not mutate the input object', () => {
            const input = { K: { _text: '1' } };
            const snapshot = JSON.parse(JSON.stringify(input));
            (0, flatten_1.flattenText)(input);
            expect(input).toEqual(snapshot);
        });
    });
    describe('hasOwnProperty filter (defensive branch)', () => {
        test('skips inherited (non-own) enumerable keys', () => {
            const proto = { inheritedKey: { _text: 'should-be-skipped' } };
            const obj = Object.create(proto);
            obj.SuccessCode = { _text: '0' };
            const out = (0, flatten_1.flattenText)(obj);
            expect(out).toEqual({ SuccessCode: '0' });
            expect(out).not.toHaveProperty('inheritedKey');
        });
    });
});
