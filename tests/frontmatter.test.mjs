import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontMatter } from '../scripts/lib/frontmatter.mjs';

test('parses YAML front matter and body', () => {
  const { data, body } = parseFrontMatter('---\ntitle: Hi\nissue: 1\ndate: 2026-10-18\n---\n## TL;DR\n');
  assert.deepEqual(data, { title: 'Hi', issue: 1, date: '2026-10-18' });
  assert.equal(body, '## TL;DR\n');
});

test('returns null data when there is no front matter', () => {
  const { data, body } = parseFrontMatter('<p>plain</p>');
  assert.equal(data, null);
  assert.equal(body, '<p>plain</p>');
});
