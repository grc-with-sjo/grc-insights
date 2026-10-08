import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

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

test('sitemap lists the about page', { skip }, () => {
  assert.match(page('sitemap.xml'), /https:\/\/grc-with-sjo\.github\.io\/grc-insights\/about\//);
});

test('Issue 0 renders at its permanent URL with original content', { skip }, () => {
  const html = page('issues/2026-05-field-notes/index.html');
  assert.match(html, /Field Notes · May 2026/);
  assert.equal((html.match(/class="trend-card /g) || []).length, 7);
  assert.match(html, /The Bottom Line/);
  assert.match(html, /href="\/grc-insights\/sources.html"/);
  assert.match(html, /linkedin\.com\/sharing\/share-offsite/);
});

test('sources.html links back to Issue 0', { skip }, () => {
  assert.match(page('sources.html'), /href="issues\/2026-05-field-notes\/"/);
});
