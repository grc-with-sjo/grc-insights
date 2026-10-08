import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateRepo } from '../scripts/validate.mjs';

test('repository content passes validation', () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  assert.deepEqual(validateRepo(root).errors, []);
});
