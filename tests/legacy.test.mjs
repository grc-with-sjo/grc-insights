import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGINAL_COMMIT = '575868b';

test('Issue 0 keeps every trend and all its action items from the original page', () => {
  // Guards against content lost in the migration. Wording may change (voice passes);
  // trend titles must stay, and no action items may be dropped.
  const original = execFileSync('git', ['show', `${ORIGINAL_COMMIT}:index.html`], { cwd: root, encoding: 'utf8' });
  const migrated = readFileSync(join(root, '_issues/2026-05-field-notes.html'), 'utf8');
  const titles = [...original.matchAll(/<div class="trend-title">([^<]+)<\/div>/g)].map(m => m[1].trim());
  assert.equal(titles.length, 7, `expected 7 trend titles, got ${titles.length}`);
  assert.deepEqual(titles.filter(t => !migrated.includes(t)), []);
  const count = html => [...html.matchAll(/<li>[^<]+<\/li>/g)].length;
  assert.ok(count(original) >= 30, `expected many action items, got ${count(original)}`);
  assert.ok(count(migrated) >= count(original), `action items dropped: ${count(migrated)} < ${count(original)}`);
  assert.match(migrated, /Compliance is no longer a once-a-year event\./);
});
