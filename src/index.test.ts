//#region imports
import * as barrel from './index'
import DynadotDefault from './index'
import { Dynadot } from './Dynadot'
import { HttpClient as HttpClientDirect } from './http'
import { flattenText as flattenDirect } from './flatten'
//#endregion

describe('package barrel (./index)', () => {
    test('re-exports Dynadot as default and named export, identical reference', () => {
        expect(DynadotDefault).toBe(Dynadot)
        expect(barrel.Dynadot).toBe(Dynadot)
    })

    test('re-exports HttpClient and httpClient singleton from ./http', () => {
        expect(barrel.HttpClient).toBe(HttpClientDirect)
        expect(barrel.httpClient).toBeInstanceOf(HttpClientDirect)
    })

    test('re-exports flattenText from ./flatten', () => {
        expect(barrel.flattenText).toBe(flattenDirect)
    })

    test('default export is constructible (smoke check)', () => {
        const d = new DynadotDefault('K')
        expect(d.apikey).toBe('K')
    })
})
