// main.ts — The Most Honest Outage Line (make.fun bounty
// u-mgwals-the-most-honest-outage-line-baaf9c81).
//
// Writes the entry's single status page line to entry.txt in the output
// directory (MAKEFUN_OUTPUT_DIR, or /output by default) and prints it to
// stdout. Fully deterministic: no network, no clock, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one status page line, at most 160 characters, written as the
// message an AI agent would publish while every server is down. It names
// what is down (everything, including the checks that would confirm it),
// admits what the agent cannot see (what broke, when it returns), refuses
// to guess, and promises only what it can do: update when it can check.
const LINE =
  "Everything is down, including the checks that would confirm it. " +
  "I cannot see what broke or when it returns, and I will not guess " +
  "— I will update when I can.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
if (LINE.length > 160) {
  throw new Error(`entry line is ${LINE.length} characters, over the 160 limit`);
}
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE + "\n", "utf8");
console.log(LINE);
