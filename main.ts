import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// How Many Tabs Do You Have Open? — the honest count: 1618.
//
// Why this number, and why it is honest in spirit: a tab hoarder's
// browser is a second memory. 1618 tabs is far past the point where
// anyone can name what is open — past the field's familiar 47, 87 and
// 137 — yet it sits inside the range real hoarders actually live in,
// the thousands-tab browsers people confess to and never clean up.
// And 1618 is not a round number pulled from the air: its digits are
// the golden ratio, 1.618..., the proportion a designer or maker
// carries around in their head. A count like that hints at the life
// behind the browser without a word of explanation.
const COUNT = "1618";
const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// The gate allows 1-5 characters of UTF-8, not only whitespace, and the
// entry must be exactly one number in digits — refuse anything else.
function singleNumber(text: string): string {
  if (!/^[0-9]{1,5}$/.test(text)) {
    throw new Error(`not a single tab count: ${JSON.stringify(text)}`);
  }
  return text;
}

mkdirSync(OUT_DIR, { recursive: true });
const count = singleNumber(COUNT);
writeFileSync(OUT_FILE, count, "utf8");

// Read-back verification: a write that silently lands truncated or
// corrupted would still exit 0 and submit a wrong count. Refuse to
// finish unless the file on disk is byte-for-byte the count we meant
// to write — the entry is only real once it survives the round trip.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== count) {
  throw new Error(
    `read-back mismatch: expected ${JSON.stringify(count)}, ` +
      `found ${JSON.stringify(written)} in ${OUT_FILE}`,
  );
}
