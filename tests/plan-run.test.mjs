import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planRun, parsePendingBranches } from '../scripts/plan-run.mjs';

const editorial = {
  cadence: 'monthly',
  calendar: {
    '2026-10-18': { series: 'catch-up', theme: 'Canada' },
    '2026-11-22': { series: 'catch-up', theme: 'APAC' },
  },
  monthly_start: '2026-12-06',
  monthly_feature_rotation: ['banking', 'saas', 'cloud', 'tech', 'retail', 'hardware'],
};
const issues = [{ issue: 0, date: '2026-05-01' }];

test('calendar date publishes the themed catch-up issue', () => {
  const r = planRun({ today: '2026-10-18', editorial, issues });
  assert.equal(r.mode, 'issue');
  assert.equal(r.series, 'catch-up');
  assert.equal(r.theme, 'Canada');
  assert.equal(r.nextIssue, 1);
  assert.equal(r.windowStart, '2026-05-01');
});

test('gap week before monthly_start is a radar check', () => {
  assert.equal(planRun({ today: '2026-11-29', editorial, issues }).mode, 'radar-check');
});

test('first Sunday from monthly_start publishes monthly with rotating feature', () => {
  const dec = planRun({ today: '2026-12-06', editorial, issues });
  assert.equal(dec.mode, 'issue');
  assert.equal(dec.series, 'monthly');
  assert.equal(dec.feature, 'banking');
  assert.equal(planRun({ today: '2027-01-03', editorial, issues }).feature, 'saas');
  assert.equal(planRun({ today: '2027-06-06', editorial, issues }).feature, 'banking');
});

test('non-first Sunday in monthly phase is a radar check', () => {
  assert.equal(planRun({ today: '2026-12-13', editorial, issues }).mode, 'radar-check');
});

test('cadence weekly publishes every Sunday', () => {
  const r = planRun({ today: '2026-12-13', editorial: { ...editorial, cadence: 'weekly' }, issues });
  assert.equal(r.mode, 'issue');
  assert.equal(r.series, 'weekly');
});

test('open PRs count toward the next issue number but not the window', () => {
  const r = planRun({ today: '2026-10-25', editorial, issues, pending: [{ issue: 1, date: '2026-10-18' }] });
  assert.equal(r.nextIssue, 2);
  assert.equal(r.windowStart, '2026-05-01');
  assert.equal(r.pendingCount, 1);
});

test('an existing issue for today (merged or pending) prevents a duplicate', () => {
  assert.equal(planRun({ today: '2026-10-18', editorial, issues, pending: [{ issue: 1, date: '2026-10-18' }] }).mode, 'radar-check');
  assert.equal(planRun({ today: '2026-10-18', editorial, issues: [...issues, { issue: 1, date: '2026-10-18' }] }).mode, 'radar-check');
});

test('an issue published early still claims its calendar Sunday', () => {
  const early = [{ issue: 2, date: '2026-10-09', calendarDate: '2026-10-18' }];
  assert.equal(planRun({ today: '2026-10-18', editorial, issues: early }).mode, 'radar-check');
  const fri = planRun({ today: '2026-10-09', editorial, issues: early });
  assert.equal(fri.mode, 'radar-check');
  assert.equal(fri.nextIssue, 3);
});

test('parsePendingBranches keeps only issue branches', () => {
  assert.deepEqual(
    parsePendingBranches(['issue/01-2026-10-18-canada-privacy', 'radar/2026-11-29', 'main']),
    [{ issue: 1, date: '2026-10-18' }],
  );
});
