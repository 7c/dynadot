//#region imports
import { z } from 'zod'
import Dynadot from '../index'
//#endregion

/**
 * Example: print the API-key holder's Dynadot push username.
 *
 * Use case: a recipient runs this against their own Dynadot account and
 * shares the printed username with the sender so the sender can pass it as
 * `DYNADOT_PUSH_RECEIVER_USER` to the pushDomain example. Dynadot does not
 * expose a public lookup endpoint that resolves another account's username
 * from an email or any other identifier.
 *
 * Required env vars:
 *   DYNADOT_API_KEY      - the recipient's Dynadot API key
 *   DYNADOT_API_SECRET   - the recipient's Dynadot API secret (signing)
 *
 * Example:
 *   DYNADOT_API_KEY=... DYNADOT_API_SECRET=... \
 *   npx ts-node src/examples/whoami.ts
 */
const EnvSchema = z.object({
    DYNADOT_API_KEY: z.string().min(1, 'DYNADOT_API_KEY is required'),
    DYNADOT_API_SECRET: z.string().min(1, 'DYNADOT_API_SECRET is required'),
})

type Env = z.infer<typeof EnvSchema>

function loadEnv(): Env {
    const parsed = EnvSchema.safeParse(process.env)
    if (!parsed.success) {
        console.error('[whoami] invalid environment:')
        for (const issue of parsed.error.issues) {
            console.error(`  - ${issue.path.join('.')}: ${issue.message}`)
        }
        process.exit(1)
    }
    return parsed.data
}

async function start(): Promise<void> {
    const env = loadEnv()
    const d = new Dynadot(env.DYNADOT_API_KEY, env.DYNADOT_API_SECRET)
    try {
        const info = await d.accountInfo()
        const username = info.data?.account_info?.username
        if (info.code !== '200' || !username) {
            console.error('[whoami] unexpected response:', info)
            process.exit(2)
        }
        console.log(`Your push username is: ${username}`)
        console.log(
            'Share this with the sender as DYNADOT_PUSH_RECEIVER_USER.'
        )
        process.exit(0)
    } catch (err) {
        console.error('[whoami] request failed:', err)
        process.exit(1)
    }
}

void start()
