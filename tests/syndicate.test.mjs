import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSchedule, issueUrl, planJobs, addDays, jobKey, reminderBody } from '../scripts/syndicate.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(join(root, p), 'utf8');

test('schedule rows map issues to LinkedIn dates and skip non-issue rows', () => {
  const rows = parseSchedule(read('social/linkedin-schedule.md'));
  assert.deepEqual(rows[0], { issue: 1, linkedinDate: '2026-10-13', status: 'Posted' });
  assert.ok(rows.every(r => Number.isInteger(r.issue) && /^\d{4}-\d{2}-\d{2}$/.test(r.linkedinDate)));
  assert.ok(!rows.some(r => r.issue === 0), 'the Radar row has no issue number');
});

test('every scheduled issue with a social file has an issue URL', () => {
  for (const { issue } of parseSchedule(read('social/linkedin-schedule.md'))) {
    let md;
    try { md = read(`social/issue-${String(issue).padStart(2, '0')}.md`); } catch { continue; }
    assert.match(issueUrl(md), /^https:\/\/grc-with-sjo\.github\.io\/grc-insights\/issues\/.+\/$/);
  }
});

test('the reminder opens two days after the LinkedIn date, at most two days late, once', () => {
  const schedule = [{ issue: 3, linkedinDate: '2026-10-27', status: '' }];
  assert.deepEqual(planJobs(schedule, '2026-10-28', {}), []);
  assert.deepEqual(planJobs(schedule, '2026-10-29', {}).map(j => j.key), [jobKey(3)]);
  assert.deepEqual(planJobs(schedule, '2026-10-31', {}).map(j => j.key), [jobKey(3)], 'catch-up');
  assert.deepEqual(planJobs(schedule, '2026-11-01', {}), [], 'too late');
  assert.deepEqual(planJobs(schedule, '2026-10-29', { [jobKey(3)]: {} }), [], 'already opened');
  assert.deepEqual(planJobs([{ ...schedule[0], status: 'Posted' }], '2026-10-29', {}).length, 1,
    'a LinkedIn post made by hand still gets its Medium/Substack reminder');
});

test('addDays crosses month ends', () => {
  assert.equal(addDays('2026-10-31', 1), '2026-11-01');
});

test('the reminder links the issue and never posts anywhere', () => {
  const body = reminderBody(2, 'https://example.org/i/');
  assert.match(body, /Issue 02 is live: https:\/\/example\.org\/i\//);
  assert.match(body, /Medium/);
  assert.match(body, /Substack/);
});
