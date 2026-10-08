import { test } from 'node:test';
import assert from 'node:assert/strict';
import { upcomingDates } from '../js/radar.js';

const rows = [
  { id: 'a', name: 'Law A', region: 'CA', key_dates: [{ date: '2026-10-01', what: 'past' }, { date: '2026-12-01', what: 'soon' }] },
  { id: 'b', name: 'Law B', region: 'EU', key_dates: [{ date: '2026-10-20', what: 'sooner' }, { date: '2027-06-01', what: 'later' }] },
  { id: 'c', name: 'Law C', region: 'US' },
];

test('returns key dates within the window, soonest first', () => {
  assert.deepEqual(upcomingDates(rows, '2026-10-07', 90).map(x => `${x.id}:${x.date}`), ['b:2026-10-20', 'a:2026-12-01']);
});

test('window boundary is inclusive and rows without key_dates are ignored', () => {
  assert.deepEqual(upcomingDates(rows, '2026-10-20', 0).map(x => x.what), ['sooner']);
});
