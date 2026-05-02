/**
 * Recursively unwraps `{ _text: value }` nodes produced by xml-js (compact
 * mode) into plain values. Pure / synchronous; preserves arrays and skips
 * inherited (non-own) keys to stay defensive against polluted prototypes.
 */
export declare function flattenText(obj: unknown): unknown;
