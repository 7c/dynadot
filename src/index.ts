//#region imports
import Dynadot from './Dynadot'
//#endregion

/**
 * Public package entry point.
 *
 * Re-exports the `Dynadot` class as the default export and surfaces the
 * supporting building blocks (types, internal HTTP client, flattenText
 * helper) so consumers can opt-in if they want them.
 */
export { Dynadot }
export default Dynadot
export * from './types'
export { HttpClient, httpClient } from './http'
export { flattenText } from './flatten'
