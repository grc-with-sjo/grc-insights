import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';

const SITE = process.env.SITE_DIR;
const BASE = '/grc-insights';
const skip = !SITE && 'SITE_DIR not set: CI builds the site (see .github/workflows/check.yml)';

const page = p => readFileSync(join(SITE, p), 'utf8');
const htmlFiles = dir => readdirSync(dir).flatMap(n => {
  const f = join(dir, n);
  if (statSync(f).isDirectory()) return htmlFiles(f);
  return f.endsWith('.html') || f.endsWith('.xml') ? [f] : [];
});
const resolves = href => {
  const path = decodeURIComponent(href.slice(BASE.length).split('#')[0].split('?')[0]);
  const target = join(SITE, path);
  if (!existsSync(target)) return false;
  return statSync(target).isFile() || existsSync(join(target, 'index.html'));
};

test('sources.html is still served at its original URL', { skip }, () => {
  assert.match(page('sources.html'), /Sources &amp; References/);
});

test('every internal link resolves to a built file', { skip }, () => {
  const broken = [];
  for (const f of htmlFiles(SITE)) {
    for (const [, href] of readFileSync(f, 'utf8').matchAll(/(?:href|src)="(\/grc-insights\/[^"]*)"/g)) {
      if (!resolves(href)) broken.push(`${f.slice(SITE.length)} → ${href}`);
    }
  }
  assert.deepEqual(broken, []);
});

test('about page renders with layout, SEO tags and author block', { skip }, () => {
  const html = page('about/index.html');
  assert.match(html, /<meta property="og:title"/);
  assert.match(html, /class="site-nav"/);
  assert.match(html, /Connect on LinkedIn/);
  assert.match(html, /Not legal or regulatory advice/);
});

test('Atom feed is served and declared', { skip }, () => {
  assert.match(page('feed.xml'), /^<\?xml version="1.0" encoding="utf-8"\?>\s*<feed xmlns="http:\/\/www.w3.org\/2005\/Atom">/);
  assert.match(page('about/index.html'), /type="application\/atom\+xml"/);
});

test('sitemap lists the about page, Issue 0 and the radar', { skip }, () => {
  const sm = page('sitemap.xml');
  assert.match(sm, /https:\/\/grc-with-sjo\.github\.io\/grc-insights\/about\//);
  assert.ok(sm.includes('https://grc-with-sjo.github.io/grc-insights/issues/2026-05-field-notes/'));
  assert.ok(sm.includes('https://grc-with-sjo.github.io/grc-insights/radar/'));
});

test('feed contains an entry linking Issue 0', { skip }, () => {
  const feed = page('feed.xml');
  assert.match(feed, /<entry[\s>]/);
  assert.ok(feed.includes('<link href="https://grc-with-sjo.github.io/grc-insights/issues/2026-05-field-notes/"'));
});

test('every root-relative href/src carries the baseurl', { skip }, () => {
  const bad = [];
  for (const f of htmlFiles(SITE)) {
    for (const [, v] of readFileSync(f, 'utf8').matchAll(/(?:href|src)="(\/(?!\/|grc-insights\/)[^"]*)"/g)) bad.push(`${f.slice(SITE.length)} → ${v}`);
  }
  assert.deepEqual(bad, []);
});

test('no unrendered Liquid in built output', { skip }, () => {
  const bad = htmlFiles(SITE).filter(f => /\{\{|\{%/.test(readFileSync(f, 'utf8'))).map(f => f.slice(SITE.length));
  assert.deepEqual(bad, []);
});

test('radar page emits only the expected script tags', { skip }, () => {
  const html = page('radar/index.html');
  // json data + radar.js + filters.js; the optional GoatCounter tag and seo-tag JSON-LD are excluded
  const scripts = (html.match(/<script\b[^>]*>/g) || []).filter(t => !t.includes('data-goatcounter') && !t.includes('application/ld+json'));
  assert.equal(scripts.length, 3);
  assert.ok(!html.includes('</script></script>'));
});

test('Issue 0 renders at its permanent URL with original content', { skip }, () => {
  const html = page('issues/2026-05-field-notes/index.html');
  assert.match(html, /Field Notes · May 2026/);
  assert.equal((html.match(/class="trend-card /g) || []).length, 7);
  assert.match(html, /The Bottom Line/);
  assert.match(html, /href="\/grc-insights\/sources.html"/);
  assert.match(html, /linkedin\.com\/sharing\/share-offsite/);
});

test('every sources.html back link points to Issue 0', { skip }, () => {
  const hrefs = [...page('sources.html').matchAll(/class="back-link" href="([^"]*)"/g)].map(m => m[1]);
  assert.ok(hrefs.length >= 1, 'expected at least one back-link anchor');
  assert.deepEqual(hrefs.filter(h => h !== 'issues/2026-05-field-notes/'), []);
  assert.ok(!hrefs.includes('index.html'));
});

test('homepage shows the latest issue and an archive linking every issue', { skip }, () => {
  const html = page('index.html');
  assert.match(html, /data-filter-root/);
  assert.match(html, /href="\/grc-insights\/issues\/2026-05-field-notes\/"/);
  assert.match(html, /data-filters="[^"]*category:ai-governance/);
  assert.match(html, /class="latest-card"/);
});

test('radar page renders one row per tracker entry and embeds the data', { skip }, () => {
  const rows = parseYaml(readFileSync('_data/tracker.yml', 'utf8')) ?? [];
  const html = page('radar/index.html');
  assert.equal((html.match(/<tr id="/g) || []).length, rows.length);
  assert.match(html, /id="radar-data"/);
  assert.match(page('index.html'), /data-upcoming/);
  assert.match(page('index.html'), /href="\/grc-insights\/radar\/"/);
});

test('every page carries the default social card', { skip }, () => {
  assert.match(page('index.html'), /<meta property="og:image" content="https:\/\/grc-with-sjo\.github\.io\/grc-insights\/assets\/og-card\.png"/);
  assert.match(page('issues/2026-05-field-notes/index.html'), /og:image/);
});

test('analytics script appears only when configured', { skip }, () => {
  const config = parseYaml(readFileSync('_config.yml', 'utf8'));
  const html = page('index.html');
  if (config.goatcounter) assert.match(html, new RegExp(`https://${config.goatcounter}\\.goatcounter\\.com/count`));
  else assert.doesNotMatch(html, /gc\.zgo\.at/);
});
