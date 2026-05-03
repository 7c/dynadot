"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//#region imports
const zod_1 = require("zod");
const Dynadot_1 = __importDefault(require("../Dynadot"));
//#endregion
/**
 * Example: push a domain from one Dynadot account to another.
 *
 * Required env vars:
 *   DYNADOT_API_KEY               - your Dynadot API key
 *   DYNADOT_API_SECRET            - your Dynadot API secret (used to sign the request)
 *   DYNADOT_PUSH_DOMAIN           - the domain to push (e.g. mydomain.com)
 *   DYNADOT_PUSH_RECEIVER_USER    - the recipient Dynadot account username
 *
 * Optional:
 *   DYNADOT_PUSH_RECEIVER_EMAIL   - recipient email (extra confirmation hint)
 *
 * Example:
 *   DYNADOT_API_KEY=... DYNADOT_API_SECRET=... \
 *   DYNADOT_PUSH_DOMAIN=mydomain.com DYNADOT_PUSH_RECEIVER_USER=otheruser \
 *   npx ts-node examples/pushDomain.ts
 */
const EnvSchema = zod_1.z.object({
    DYNADOT_API_KEY: zod_1.z.string().min(1, 'DYNADOT_API_KEY is required'),
    DYNADOT_API_SECRET: zod_1.z.string().min(1, 'DYNADOT_API_SECRET is required'),
    DYNADOT_PUSH_DOMAIN: zod_1.z
        .string()
        .min(3, 'DYNADOT_PUSH_DOMAIN is required (e.g. mydomain.com)'),
    DYNADOT_PUSH_RECEIVER_USER: zod_1.z
        .string()
        .min(1, 'DYNADOT_PUSH_RECEIVER_USER is required'),
    DYNADOT_PUSH_RECEIVER_EMAIL: zod_1.z.string().email().optional(),
});
function loadEnv() {
    const parsed = EnvSchema.safeParse(process.env);
    if (!parsed.success) {
        console.error('[pushDomain] invalid environment:');
        for (const issue of parsed.error.issues) {
            console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
        }
        process.exit(1);
    }
    return parsed.data;
}
async function start() {
    const env = loadEnv();
    const d = new Dynadot_1.default(env.DYNADOT_API_KEY, env.DYNADOT_API_SECRET);
    try {
        console.log(`[pushDomain] pushing "${env.DYNADOT_PUSH_DOMAIN}" -> "${env.DYNADOT_PUSH_RECEIVER_USER}"...`);
        const result = await d.pushDomain(env.DYNADOT_PUSH_DOMAIN, env.DYNADOT_PUSH_RECEIVER_USER, env.DYNADOT_PUSH_RECEIVER_EMAIL);
        console.log('[pushDomain] response:', result);
        process.exit(String(result.code) === '200' ? 0 : 2);
    }
    catch (err) {
        console.error('[pushDomain] request failed:', err);
        process.exit(1);
    }
}
void start();
