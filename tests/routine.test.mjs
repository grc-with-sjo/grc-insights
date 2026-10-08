import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { REQUIRED_SECTIONS } from '../scripts/validate.mjs';

const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

test('issue template has exactly the required sections in order', () => {
  const headings = read('routine/issue-template.md').split('\n').filter(l => l.startsWith('## '));
  assert.deepEqual(headings, REQUIRED_SECTIONS);
});

test('routine prompt enforces deep-research and validation', () => {
  const prompt = read('routine/weekly-issue.md');
  assert.match(prompt, /anthropic-skills:deep-research/);
  assert.match(prompt, /npm run validate/);
  assert.match(prompt, /scripts\/plan-run\.mjs/);
  assert.match(prompt, /drafting-grc-insights-issues/);
  assert.match(prompt, /Never push to `main`/);
});

test('PR body template carries the review checklist', () => {
  const body = read('routine/pr-body-template.md');
  for (const item of ['In brief works as a LinkedIn opener', '"Where I land" sounds like me', 'Reads as an editorial: context before each point, every story ends with a takeaway and an open question', '⚠️ verify', 'Tracker changes look right', 'Social drafts reviewed']) {
    assert.ok(body.includes(item), item);
  }
});
