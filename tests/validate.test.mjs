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
const goodBody = REQUIRED_SECTIONS.map(h => `${h}\n\ntext\n`).join('\n') + '\n- [OPC](https://www.priv.gc.ca/)\n';
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
  const body = goodBody.replace('## My take', '## Opinion');
  assert.ok(validateIssue(issue({}, body), tax).some(e => e.includes('missing section "## My take"')));
  const swapped = ['## TL;DR', '## Sector lens', '## What changed', '## My take', '## What to do now', '## On the radar', '## Sources']
    .map(h => `${h}\n\nx\n`).join('\n') + '[a](https://a.b)\n';
  assert.ok(validateIssue(issue({}, swapped), tax).some(e => e.includes('out of order')));
});

test('Sources section must contain a link', () => {
  const body = goodBody.replace('- [OPC](https://www.priv.gc.ca/)', '- OPC website');
  assert.ok(validateIssue(issue({}, body), tax).some(e => e.includes('at least one http(s) link')));
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
