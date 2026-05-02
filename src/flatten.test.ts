//#region imports
import { flattenText } from './flatten'
//#endregion

describe('flattenText', () => {
    describe('primitive / non-object inputs (early return branch)', () => {
        test('returns null verbatim', () => {
            expect(flattenText(null)).toBeNull()
        })

        test('returns undefined verbatim', () => {
            expect(flattenText(undefined)).toBeUndefined()
        })

        test('returns strings verbatim', () => {
            expect(flattenText('hello')).toBe('hello')
        })

        test('returns numbers verbatim (including 0)', () => {
            expect(flattenText(42)).toBe(42)
            expect(flattenText(0)).toBe(0)
        })

        test('returns booleans verbatim', () => {
            expect(flattenText(true)).toBe(true)
            expect(flattenText(false)).toBe(false)
        })
    })

    describe('_text wrapper (xml-js compact node)', () => {
        test('unwraps a string _text', () => {
            expect(flattenText({ _text: 'just-a-string' })).toBe('just-a-string')
        })

        test('unwraps a numeric _text verbatim', () => {
            expect(flattenText({ _text: 7 })).toBe(7)
        })

        test('unwrapping ignores sibling keys (matches source behavior)', () => {
            // Source returns `obj._text` as soon as `_text` is present,
            // dropping any sibling attributes. Asserting the contract.
            expect(flattenText({ _text: 'val', _attributes: { a: '1' } })).toBe(
                'val'
            )
        })
    })

    describe('arrays (Array.isArray branch)', () => {
        test('maps over each element and flattens recursively', () => {
            expect(
                flattenText([
                    { _text: 'a' },
                    { _text: 'b' },
                    'plain',
                    42,
                    null,
                ])
            ).toEqual(['a', 'b', 'plain', 42, null])
        })

        test('returns an empty array for an empty array (preserves length)', () => {
            const out = flattenText([]) as unknown[]
            expect(Array.isArray(out)).toBe(true)
            expect(out).toHaveLength(0)
        })

        test('handles nested arrays of objects', () => {
            expect(
                flattenText([[{ _text: 'x' }], [{ _text: 'y' }]])
            ).toEqual([['x'], ['y']])
        })
    })

    describe('plain objects (recursive branch)', () => {
        test('recursively unwraps nested _text nodes', () => {
            expect(
                flattenText({
                    SuccessCode: { _text: '0' },
                    Status: { _text: 'success' },
                    Nested: { Deep: { _text: 'value' } },
                })
            ).toEqual({
                SuccessCode: '0',
                Status: 'success',
                Nested: { Deep: 'value' },
            })
        })

        test('returns an empty object for an empty object', () => {
            expect(flattenText({})).toEqual({})
        })

        test('does not mutate the input object', () => {
            const input = { K: { _text: '1' } }
            const snapshot = JSON.parse(JSON.stringify(input))
            flattenText(input)
            expect(input).toEqual(snapshot)
        })
    })

    describe('hasOwnProperty filter (defensive branch)', () => {
        test('skips inherited (non-own) enumerable keys', () => {
            const proto = { inheritedKey: { _text: 'should-be-skipped' } }
            const obj: any = Object.create(proto)
            obj.SuccessCode = { _text: '0' }
            const out = flattenText(obj) as Record<string, unknown>
            expect(out).toEqual({ SuccessCode: '0' })
            expect(out).not.toHaveProperty('inheritedKey')
        })
    })
})
