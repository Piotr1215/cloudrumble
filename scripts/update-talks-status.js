#!/usr/bin/env node

/**
 * Mark past talks as done by clearing the `upcoming` flag in talks.json.
 *
 * A talk is "upcoming" while its date is today or in the future. Once the
 * date passes, the talk should drop out of the upcoming section on the site.
 * This mirrors the upcoming rule in scripts/sync-talks.sh, but edits
 * talks.json in place instead of regenerating it from DuckDB (the DuckDB
 * source has drifted, so a full regen would drop real talks).
 *
 * Usage: node scripts/update-talks-status.js
 */

const fs = require('fs');
const path = require('path');

const TALKS_FILE = path.join(__dirname, '../src/data/talks.json');

/**
 * Decide whether a talk date is today or in the future.
 * Supports full dates (YYYY-MM-DD) and month-only dates (YYYY-MM).
 * Anything else (null, empty, unparseable) is treated as not upcoming.
 */
function isUpcoming(date, now) {
  if (typeof date !== 'string') return false;

  if (date.length === 10) {
    return date >= now.toISOString().slice(0, 10); // YYYY-MM-DD
  }
  if (date.length === 7) {
    return date >= now.toISOString().slice(0, 7); // YYYY-MM
  }
  return false;
}

function main() {
  const raw = fs.readFileSync(TALKS_FILE, 'utf8');
  const talks = JSON.parse(raw);
  const now = new Date();

  let changed = 0;
  for (const talk of talks) {
    // Only clear the flag for talks that have already happened. Never set it,
    // so a talk is never surfaced as upcoming by automation.
    if (talk.upcoming === true && !isUpcoming(talk.date, now)) {
      talk.upcoming = false;
      changed++;
      console.log(`Marked past: ${talk.date} - ${talk.title}`);
    }
  }

  if (changed === 0) {
    console.log('No talks to update.');
    return;
  }

  // Preserve the existing on-disk format: one talk object per line, no
  // indentation, no trailing newline. Keeps diffs minimal.
  const out = '[' + talks.map((t) => JSON.stringify(t)).join(',\n') + ']';
  fs.writeFileSync(TALKS_FILE, out, 'utf8');
  console.log(`✓ Updated ${changed} talk(s) in ${TALKS_FILE}`);
}

main();
