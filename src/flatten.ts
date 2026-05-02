//#region imports
//#endregion

/**
 * Recursively unwraps `{ _text: value }` nodes produced by xml-js (compact
 * mode) into plain values. Pure / synchronous; preserves arrays and skips
 * inherited (non-own) keys to stay defensive against polluted prototypes.
 */
export function flattenText(obj: unknown): unknown {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => flattenText(item))
    }

    if ('_text' in (obj as Record<string, unknown>)) {
        return (obj as Record<string, unknown>)._text
    }

    const result: Record<string, unknown> = {}
    for (const key in obj as Record<string, unknown>) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = flattenText((obj as Record<string, unknown>)[key])
        }
    }
    return result
}
