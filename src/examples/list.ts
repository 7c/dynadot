//#region imports
import Dynadot from '../Dynadot'
//#endregion

async function start(): Promise<void> {
    try {
        const d = new Dynadot(process.env.DYNADOT_API_KEY || '')
        console.log('Listing domains...')
        const domains = await d.listDomains()
        console.log(domains)
        process.exit(0)
    } catch (err) {
        console.log(err)
    }
}

void start()
