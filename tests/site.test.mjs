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
  assert.match(html, /do not represent the views, positions or policies of any current or former employer/);
  assert.match(html, /Built with AI\./);
  assert.match(html, /Vancouver, BC/);
  assert.doesNotMatch(html, /Cadence\.|New Westminster/);
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
  assert.match(page('index.html'), /<meta property="og:image" content="https:\/\/grc-with-sjo\.github\.io\/grc-insights\/assets\/og-v2\/home\.png"/);
  assert.match(page('issues/2026-05-field-notes/index.html'), /og:image/);
});

test('analytics script appears only when configured', { skip }, () => {
  const config = parseYaml(readFileSync('_config.yml', 'utf8'));
  const html = page('index.html');
  if (config.goatcounter) assert.match(html, new RegExp(`https://${config.goatcounter}\\.goatcounter\\.com/count`));
  else assert.doesNotMatch(html, /gc\.zgo\.at/);
});

test('each issue is published only once its date has arrived', { skip }, () => {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Vancouver', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const dir = '_issues';
  for (const file of readdirSync(dir)) {
    const m = readFileSync(join(dir, file), 'utf8').match(/^date: (\d{4}-\d{2}-\d{2})$/m);
    const built = existsSync(join(SITE, 'issues', file.replace(/\.(md|html)$/, ''), 'index.html'));
    assert.equal(built, m[1] <= today, `${file} dated ${m[1]} (today ${today}) built=${built}`);
  }
});


test('unconfirmed markers render as a dagger with one note per issue', { skip }, () => {
  for (const file of readdirSync('_issues')) {
    const slug = file.replace(/\.(md|html)$/, '');
    const out = join(SITE, 'issues', slug, 'index.html');
    if (!existsSync(out)) continue;
    const html = readFileSync(out, 'utf8');
    assert.ok(!/⚠️? verify/.test(html), `${slug}: literal marker left in page`);
    if (/⚠️? verify/.test(readFileSync(join('_issues', file), 'utf8'))) {
      assert.ok(html.includes('id="unconfirmed-note"'), `${slug}: missing note`);
      assert.ok(html.includes('class="unconfirmed"'), `${slug}: missing dagger`);
    }
  }
});

test('feed content uses absolute links and renders unconfirmed markers as a dagger', { skip }, () => {
  const feed = page('feed.xml');
  assert.ok(!/⚠️? verify/.test(feed), 'literal marker left in feed');
  assert.ok(!/href=&quot;\//.test(feed), 'root-relative href in feed content breaks in feed readers');
  assert.ok(!/src=&quot;\//.test(feed), 'root-relative src in feed content breaks in feed readers');
});

test('pages load Fraunces and Inter, not the old fonts', { skip }, () => {
  const html = page('index.html');
  assert.match(html, /fonts\.googleapis\.com\/css2\?family=Fraunces[^"]*family=Inter/);
  assert.doesNotMatch(html, /Caveat|Nunito/);
});

test('nav offers Issues, Regulation Radar and About, with the wordmark', { skip }, () => {
  const nav = page('about/index.html').match(/<nav class="site-nav"[\s\S]*?<\/nav>/)[0];
  for (const label of ['Issues', 'Regulation Radar', 'About']) assert.ok(nav.includes(`>${label}<`), label);
  assert.match(nav, /class="brand"/);
});

test('Substack button only when substack_url is set', { skip }, () => {
  const config = parseYaml(readFileSync('_config.yml', 'utf8'));
  const html = page('index.html');
  if (config.substack_url) assert.ok(html.includes(config.substack_url));
  else assert.doesNotMatch(html, /Subscribe on Substack/);
});

test('every homepage card shows a cover image or the brand pattern, never nothing', { skip }, () => {
  const cards = page('index.html').match(/<a class="post-card"[\s\S]*?<\/a>/g) || [];
  assert.ok(cards.length >= 1, 'no post cards on homepage');
  for (const c of cards) assert.ok(/<img [^>]*src="[^"]+"/.test(c) || c.includes('class="brand-art'), c.slice(0, 120));
});

test('homepage hero, latest band, areas and radar strip', { skip }, () => {
  const html = page('index.html');
  assert.match(html, /Digital trust, decoded/i);
  assert.match(html, /<h1>Where AI, privacy and cyber risk meet practice\.<\/h1>/);
  assert.match(html, /Making sense of AI, privacy and cyber risk, before it lands on your desk\./);
  assert.match(html, /class="latest-band"/);
  assert.match(html, /href="\/grc-insights\/areas\/ai-governance\/"/);
  assert.match(html, /data-upcoming/);
  assert.match(html, /data-filter-root/);
  assert.match(html, /class="latest-card"/);
});

test('each area page exists and lists only published issues in that area', { skip }, () => {
  const areas = parseYaml(readFileSync('_data/areas.yml', 'utf8'));
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Vancouver' }).format(new Date());
  for (const a of areas) {
    const html = page(`areas/${a.id}/index.html`);
    for (const f of readdirSync('_issues')) {
      const src = readFileSync(join('_issues', f), 'utf8');
      const date = src.match(/^date: (\S+)$/m)[1];
      const cats = (src.match(/^categories: \[(.*)\]$/m)?.[1] || '').split(',').map(s => s.trim());
      const href = `/grc-insights/issues/${f.replace(/\.(md|html)$/, '')}/`;
      const expected = date <= today && cats.some(c => a.categories.includes(c));
      assert.equal(html.includes(href), expected, `${a.id} ${f}`);
    }
  }
});

test('issue pages show kicker, title, author line, cover and reading time', { skip }, () => {
  const html = page('issues/2026-10-11-canada-regulators-write-ai-rules/index.html');
  assert.match(html, /class="kicker"[^>]*>[^<]*Issue 1/);
  assert.match(html, /GRC &amp; AI Governance Practitioner · Vancouver, BC/);
  assert.match(html, /<figure class="cover"/);
  assert.match(html, /\d+ min read/);
  // † rendering survives the new layout (Issue 3 carries unconfirmed claims; Issue 1 no longer does)
  assert.match(page('issues/2026-10-18-europe-delayed-ai-rules-not-enforcement/index.html'), /class="unconfirmed"/);
});

test('legacy pages use the new palette and fonts', { skip }, () => {
  assert.doesNotMatch(readFileSync('css/style.css', 'utf8'), /Caveat|Nunito|--rose\b/);
  const s = page('sources.html');
  assert.match(s, /css\/style\.css/);
  assert.doesNotMatch(s, /Caveat|Nunito/);
});

test('the featured issue is not repeated in the Latest band', { skip }, () => {
  const html = page('index.html');
  const band = html.match(/<section class="latest-band"[\s\S]*?<\/section>/)[0];
  const featured = html.match(/<a class="latest-card" href="([^"]+)"/)[1];
  assert.ok(!band.includes(`href="${featured}"`), `featured ${featured} also in Latest band`);
});

test('card images request a small size; the issue cover loads eagerly', { skip }, () => {
  const cards = page('index.html').match(/<a class="post-card"[\s\S]*?<\/a>/g) || [];
  for (const c of cards) { const m = c.match(/<img [^>]*src="([^"]+)"/); if (m && m[1].includes('images.unsplash.com')) assert.match(m[1], /w=800/, m[1]); }
  const cover = page('issues/2026-10-11-canada-regulators-write-ai-rules/index.html').match(/<figure class="cover">[\s\S]*?<\/figure>/)[0];
  assert.doesNotMatch(cover, /loading="lazy"/);
  assert.match(cover, /fetchpriority="high"/);
});
