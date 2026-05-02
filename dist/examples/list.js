"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//#region imports
const Dynadot_1 = __importDefault(require("../Dynadot"));
//#endregion
async function start() {
    try {
        const d = new Dynadot_1.default(process.env.DYNADOT_API_KEY || '');
        console.log('Listing domains...');
        const domains = await d.listDomains();
        console.log(domains);
        process.exit(0);
    }
    catch (err) {
        console.log(err);
    }
}
void start();
