import { $dbg } from "rbxts-transform-debug";

export class Exception {
    constructor(msg?: string, lvl?: number) {
        error($dbg(msg), lvl);
    }
}