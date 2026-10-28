import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../css/style.css', import.meta.url), 'utf8');
const token = name => css.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`))[1];
const lum = hex => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

test('small label text meets WCAG AA (4.5:1) on canvas, card and white', () => {
  const text = token('label-text');
  for (const bg of [token('canvas'), token('card'), '#FFFFFF']) assert.ok(ratio(text, bg) >= 4.5, `${text} on ${bg}: ${ratio(text, bg).toFixed(2)}`);
  for (const sel of ['.type-label', '.upcoming time', '.trend-number']) {
    const rule = css.slice(css.indexOf(sel)).split('}')[0];
    assert.match(rule, /var\(--label-text\)/, `${sel} should use --label-text`);
  }
});
