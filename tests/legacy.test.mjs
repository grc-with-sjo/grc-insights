import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGINAL_COMMIT = '575868b';

test('Issue 0 preserves every trend title and action item from the original page', () => {
  const original = execFileSync('git', ['show', `${ORIGINAL_COMMIT}:index.html`], { cwd: root, encoding: 'utf8' });
  const migrated = readFileSync(join(root, '_issues/2026-05-field-notes.html'), 'utf8');
  const fragments = [
    ...original.matchAll(/<div class="trend-title">([^<]+)<\/div>/g),
    ...original.matchAll(/<li>([^<]+)<\/li>/g),
  ].map(m => m[1].trim());
  assert.ok(fragments.length >= 7 + 30, `expected many fragments, got ${fragments.length}`);
  const missing = fragments.filter(f => !migrated.includes(f));
  assert.deepEqual(missing, []);
  assert.match(migrated, /Compliance is no longer a once-a-year event\./);
});
