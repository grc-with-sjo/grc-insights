import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTaxonomy } from '../scripts/lib/taxonomy.mjs';
import { isIsoDate } from '../scripts/lib/dates.mjs';
import {
  REQUIRED_SECTIONS, validateIssue, validateTrackerRows, validateEditorial, countVerifyFlags,
} from '../scripts/validate.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tax = loadTaxonomy(root);

const goodData = {
  title: 'Canada privacy reset', issue: 1, series: 'catch-up', date: '2026-10-18',
  regions: ['CA'], sectors: ['saas'], categories: ['privacy-law'], description: 'A hook.',
};
const story = (n, { takeaway = true, question = true } = {}) =>
  `### Story ${n}\n\nBridge, context and facts.\n\n${takeaway ? '**Takeaway:** Do the thing.\n\n' : ''}${question ? '**Open question:** Who decides?\n\n' : ''}`;
const makeBody = ({ stories = [story(1), story(2)], open = '- First risk\n- Second risk\n' } = {}) =>
  REQUIRED_SECTIONS.map(h => {
    if (h === '## What happened') return `${h}\n\n${stories.join('')}`;
    if (h === '## The questions still open') return `${h}\n\n${open}\n`;
    return `${h}\n\ntext\n`;
  }).join('\n') + '\n- [OPC](https://www.priv.gc.ca/)\n';
const goodBody = makeBody();
const issue = (over = {}, body = goodBody, file = '2026-10-18-canada.md') => ({ file, data: { ...goodData, ...over }, body });

test('isIsoDate accepts real dates only', () => {
  assert.equal(isIsoDate('2026-10-18'), true);
  assert.equal(isIsoDate('2026-02-30'), false);
  assert.equal(isIsoDate('Oct 18'), false);
});

test('a well-formed issue has no errors', () => {
  assert.deepEqual(validateIssue(issue(), tax), []);
});

test('unknown enum values are reported', () => {
  const errs = validateIssue(issue({ regions: ['MARS'], sectors: ['crypto'], categories: [] }), tax);
  assert.ok(errs.some(e => e.includes('regions: unknown value "MARS"')));
  assert.ok(errs.some(e => e.includes('sectors: unknown value "crypto"')));
  assert.ok(errs.some(e => e.includes('categories must be a non-empty list')));
});

test('missing and out-of-order sections are reported', () => {
  const body = goodBody.replace('## Where I land', '## Opinion');
  assert.ok(validateIssue(issue({}, body), tax).some(e => e.includes('missing section "## Where I land"')));
  const swapped = ['## In brief', '## What happened', '## The story so far', '## Where I land', '## The questions still open', '## What to do this quarter', '## On the radar', '## Sources']
    .map(h => `${h}\n\nx\n`).join('\n') + '[a](https://a.b)\n';
  assert.ok(validateIssue(issue({}, swapped), tax).some(e => e.includes('out of order')));
});

test('each story needs a Takeaway and an Open question', () => {
  const noTake = makeBody({ stories: [story(1, { takeaway: false }), story(2)] });
  assert.ok(validateIssue(issue({}, noTake), tax).some(e => e.includes('story "### Story 1" is missing **Takeaway:**')));
  const noQ = makeBody({ stories: [story(1), story(2, { question: false })] });
  assert.ok(validateIssue(issue({}, noQ), tax).some(e => e.includes('story "### Story 2" is missing **Open question:**')));
});

test('"What happened" needs 2-4 stories', () => {
  const one = validateIssue(issue({}, makeBody({ stories: [story(1)] })), tax);
  assert.ok(one.some(e => e.includes('"## What happened" needs 2–4 ### stories (found 1)')));
  const five = validateIssue(issue({}, makeBody({ stories: [1, 2, 3, 4, 5].map(n => story(n)) })), tax);
  assert.ok(five.some(e => e.includes('"## What happened" needs 2–4 ### stories (found 5)')));
});

test('"The questions still open" needs at least 2 bullets', () => {
  const errs = validateIssue(issue({}, makeBody({ open: '- Only one\n' })), tax);
  assert.ok(errs.some(e => e.includes('"## The questions still open" needs at least 2 bullet lines')));
});

test('Sources section must contain a link', () => {
  const body = goodBody.replace('- [OPC](https://www.priv.gc.ca/)', '- OPC website');
  assert.ok(validateIssue(issue({}, body), tax).some(e => e.includes('at least one http(s) link')));
});

test('calendar_date is optional but must be an ISO Sunday', () => {
  assert.deepEqual(validateIssue(issue({ date: '2026-10-09', calendar_date: '2026-10-18' }, goodBody, '2026-10-18-x.md'), tax), []);
  assert.ok(validateIssue(issue({ calendar_date: '18/10/2026' }), tax).some(e => e.includes('calendar_date must be YYYY-MM-DD')));
  assert.ok(validateIssue(issue({ calendar_date: '2026-10-19' }), tax).some(e => e.includes('calendar_date must be a Sunday')));
});

test('description over 200 chars and filename/date mismatch are reported', () => {
  const errs = validateIssue(issue({ description: 'x'.repeat(201) }, goodBody, '2026-11-01-x.md'), tax);
  assert.ok(errs.some(e => e.includes('200 characters')));
  assert.ok(errs.some(e => e.includes('filename must start with the issue date')));
});

test('field-notes issues skip the section-structure check', () => {
  const errs = validateIssue(issue({ series: 'field-notes', issue: 0, date: '2026-05-01' }, '<div>legacy</div>', '2026-05-field-notes.html'), tax);
  assert.deepEqual(errs, []);
});

const row = {
  id: 'ca-qc-law25', name: 'Québec Law 25', region: 'CA', jurisdiction: 'Québec', type: 'privacy-law',
  status: 'in-force', key_dates: [{ date: '2024-09-22', what: 'Portability right in force' }],
  sectors: ['tech'], applies_to_me: 'high', summary: 'Québec private-sector privacy law.',
  source: 'https://www.legisquebec.gouv.qc.ca/', last_reviewed: '2026-10-07',
};

test('valid tracker rows pass; duplicates and bad fields fail', () => {
  assert.deepEqual(validateTrackerRows([row], tax), []);
  const errs = validateTrackerRows([row, { ...row, status: 'dead', key_dates: [{ date: '2024/09/22' }], source: 'www.x' }], tax);
  assert.ok(errs.some(e => e.includes('duplicate id')));
  assert.ok(errs.some(e => e.includes('status: unknown value "dead"')));
  assert.ok(errs.some(e => e.includes('key_dates[0].date')));
  assert.ok(errs.some(e => e.includes('key_dates[0].what')));
  assert.ok(errs.some(e => e.includes('source must be an http(s) URL')));
  assert.deepEqual(validateTrackerRows(null, tax), ['tracker.yml must be a list']);
});

test('tracker source URLs containing quotes or angle brackets are rejected', () => {
  for (const bad of ['https://x.org/a"onclick="y', 'https://x.org/<b>', 'https://x.org/a>b']) {
    const errs = validateTrackerRows([{ ...row, source: bad }], tax);
    assert.ok(errs.some(e => e.includes('source must be an http(s) URL')), bad);
  }
});

const editorial = {
  cadence: 'monthly',
  calendar: { '2026-10-18': { series: 'catch-up', theme: 'Canada' } },
  monthly_start: '2026-12-06',
  monthly_feature_rotation: ['banking', 'saas'],
  sources: { regulators: ['OPC'], standards: ['NIST'], trackers: ['IAPP'] },
};

test('valid editorial passes; non-Sunday dates fail', () => {
  assert.deepEqual(validateEditorial(editorial, tax), []);
  const errs = validateEditorial({ ...editorial, cadence: 'daily', calendar: { '2026-10-19': { series: 'catch-up', theme: 'x' } } }, tax);
  assert.ok(errs.some(e => e.includes('cadence must be weekly or monthly')));
  assert.ok(errs.some(e => e.includes('2026-10-19 must be a Sunday')));
});

test('countVerifyFlags counts markers with or without the emoji variation selector', () => {
  assert.equal(countVerifyFlags('a ⚠️ verify b ⚠ verify c'), 2);
  assert.equal(countVerifyFlags('clean'), 0);
});
