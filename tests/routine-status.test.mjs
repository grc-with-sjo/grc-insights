import { test } from 'node:test';
import assert from 'node:assert/strict';
import { vancouverDate, dueOn } from '../scripts/routine-status.mjs';

test('vancouverDate gives the Vancouver calendar date, shifted by whole days', () => {
  // 03:00 UTC on 29 Oct is still 28 Oct in Vancouver (PDT, UTC-7)
  const now = new Date('2026-10-29T03:00:00Z');
  assert.equal(vancouverDate(0, now), '2026-10-28');
  assert.equal(vancouverDate(1, now), '2026-10-29');
});

test('dueOn lists issue files whose front-matter date is that day', () => {
  const issues = [
    { file: '2026-10-25-a.md', data: { date: '2026-11-01' } },
    { file: '2026-11-08-b.md', data: { date: new Date('2026-11-08T00:00:00Z') } },
  ];
  assert.deepEqual(dueOn(issues, '2026-11-01'), ['2026-10-25-a.md']);
  assert.deepEqual(dueOn(issues, '2026-11-08'), ['2026-11-08-b.md']);
});
