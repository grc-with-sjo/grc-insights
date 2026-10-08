import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matches } from '../js/filters.js';

const tokens = ['category:privacy-law', 'sector:saas', 'sector:cloud', 'region:CA'];

test('no active filters matches everything', () => {
  assert.equal(matches(tokens, {}), true);
  assert.equal(matches(tokens, { sector: null }), true);
});

test('every active group must match', () => {
  assert.equal(matches(tokens, { sector: 'cloud', region: 'CA' }), true);
  assert.equal(matches(tokens, { sector: 'cloud', region: 'EU' }), false);
});
