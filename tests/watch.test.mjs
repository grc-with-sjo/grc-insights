import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { parseFeed, isRelevant, selectNew, itemKey } from '../scripts/lib/feeds.mjs';

const rss = `<?xml version="1.0"?><rss><channel><title>Feed</title>
<item><title>AICPA Exposure Drafts: Proposed 2027 SOC 2&#174; Trust Services Criteria - AICPA &amp; CIMA</title>
<link>https://news.google.com/rss/articles/abc</link><guid>abc</guid><pubDate>Sun, 25 Oct 2026 07:00:00 GMT</pubDate></item>
<item><title><![CDATA[Bake sale this Friday]]></title><link>https://example.org/bake</link><pubDate>Mon, 26 Oct 2026 10:00:00 GMT</pubDate></item>
</channel></rss>`;

const atom = `<feed xmlns="http://www.w3.org/2005/Atom"><title>GOV.UK</title>
<entry><title>Data (Use and Access) Act: commencement update</title><link rel="alternate" href="https://www.gov.uk/x"/><id>tag:x</id><updated>2026-10-27T09:00:00+00:00</updated></entry>
</feed>`;

const fedreg = JSON.stringify({ results: [
  { title: 'Children’s Online Privacy Protection Rule', html_url: 'https://www.federalregister.gov/d/2026-1', publication_date: '2026-10-26', document_number: '2026-1' },
] });

test('parses RSS items with entities and CDATA, newest dates as YYYY-MM-DD', () => {
  const items = parseFeed(rss, 'rss');
  assert.equal(items.length, 2);
  assert.equal(items[0].title, 'AICPA Exposure Drafts: Proposed 2027 SOC 2® Trust Services Criteria - AICPA & CIMA');
  assert.equal(items[0].date, '2026-10-25');
  assert.equal(items[1].title, 'Bake sale this Friday');
});

test('parses Atom entries and Federal Register JSON', () => {
  assert.deepEqual(parseFeed(atom, 'atom'), [{ title: 'Data (Use and Access) Act: commencement update', link: 'https://www.gov.uk/x', date: '2026-10-27' }]);
  assert.deepEqual(parseFeed(fedreg, 'fedreg'), [{ title: 'Children’s Online Privacy Protection Rule', link: 'https://www.federalregister.gov/d/2026-1', date: '2026-10-26' }]);
});

test('relevance keeps GRC items and drops noise, case-insensitively', () => {
  const kw = ['SOC 2', 'privacy', 'artificial intelligence', 'ISO/IEC'];
  assert.ok(isRelevant('AICPA Exposure Drafts: Proposed 2027 SOC 2® Trust Services Criteria', kw));
  assert.ok(isRelevant('New PRIVACY code for children', kw));
  assert.ok(!isRelevant('Bake sale this Friday', kw));
  assert.ok(!isRelevant('Privacy', []), 'an empty keyword list keeps nothing');
  assert.ok(isRelevant('New AI guidance for banks', ['AI']));
  assert.ok(!isRelevant('Air quality report said fine', ['AI']), 'short keywords match whole words');
});

test('selectNew returns unseen, recent, relevant items once, and records them as seen', () => {
  const items = [
    { title: 'SOC 2 criteria update', link: 'https://a/1', date: '2026-10-27' },
    { title: 'SOC 2 old news', link: 'https://a/2', date: '2026-01-01' },
    { title: 'Bake sale', link: 'https://a/3', date: '2026-10-27' },
  ];
  const seen = new Set();
  const first = selectNew(items, { seen, keywords: ['SOC 2'], today: '2026-10-28', days: 14 });
  assert.deepEqual(first.map(i => i.link), ['https://a/1']);
  assert.ok(seen.has(itemKey(items[0])));
  assert.deepEqual(selectNew(items, { seen, keywords: ['SOC 2'], today: '2026-10-28', days: 14 }), []);
});

test('watch sources are well formed and cover the sites that block scripts', () => {
  const cfg = parse(readFileSync('_data/watch_sources.yml', 'utf8'));
  assert.ok(Array.isArray(cfg.keywords) && cfg.keywords.length >= 20);
  const ids = new Set();
  for (const s of cfg.sources) {
    assert.match(s.id, /^[a-z0-9-]+$/, s.id);
    assert.ok(!ids.has(s.id), `duplicate ${s.id}`); ids.add(s.id);
    assert.ok(['rss', 'atom', 'fedreg'].includes(s.kind), `${s.id} kind`);
    assert.match(s.url, /^https:\/\//, s.id);
    assert.ok(s.name && s.verify_at, `${s.id} needs a name and the primary site to verify at`);
    if (s.days !== undefined) assert.ok(Number.isInteger(s.days) && s.days > 0, `${s.id} days`);
  }
  for (const site of ['aicpa-cima.com', 'iso.org', 'ftc.gov', 'priv.gc.ca', 'osfi-bsif.gc.ca'])
    assert.ok(cfg.sources.some(s => s.url.includes(site) || s.verify_at.includes(site)), `no source watches ${site}`);
});
