// Daily Radar watch: read every feed in _data/watch_sources.yml, keep unseen relevant items from the
// last N days, and write a Markdown report for the GitHub issue the workflow opens.
// Usage: node scripts/radar-watch.mjs --state .radar-watch/seen.json --out report.md [--days 14] [--today YYYY-MM-DD]
import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { parse } from 'yaml';
import { parseFeed, selectNew, itemKey } from './lib/feeds.mjs';

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []));
const statePath = args.state ?? '.radar-watch/seen.json';
const outPath = args.out ?? 'radar-watch-report.md';
const days = Number(args.days ?? 14);
const today = args.today ?? new Date().toISOString().slice(0, 10);
const UA = 'Mozilla/5.0 (compatible; GRC-Insights-RadarWatch/1.0; +https://grc-with-sjo.github.io/grc-insights/radar/)';

const cfg = parse(readFileSync('_data/watch_sources.yml', 'utf8'));
const seen = new Set(existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : []);
const firstRun = seen.size === 0;

const found = [];
const failed = [];
for (const s of cfg.sources) {
  try {
    const res = await fetch(s.url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = parseFeed(await res.text(), s.kind);
    if (items.length === 0) throw new Error('feed returned no items');
    for (const item of selectNew(items, { seen, keywords: cfg.keywords, today, days: s.days ?? days })) found.push({ source: s, item });
    // Remember everything the feed shows, relevant or not, so old items never resurface.
    for (const item of items) seen.add(itemKey(item));
  } catch (err) {
    failed.push({ source: s, error: String(err.message ?? err) });
  }
}

mkdirSync(dirname(statePath), { recursive: true });
writeFileSync(statePath, JSON.stringify([...seen].slice(-20000)));

const lines = [
  `Radar watch for ${today}: ${found.length} new lead(s) from ${cfg.sources.length - failed.length}/${cfg.sources.length} sources${firstRun ? ' (first run: last ' + days + ' days)' : ''}.`,
  '',
  'Each lead is unverified until it is checked on the primary site. For each one: open the primary source, update `_data/tracker.yml` and `_data/radar_changes.yml` if the Radar changes, and close this issue with a note on what changed (or "no Radar change").',
  '',
];
const bySource = new Map();
for (const f of found) bySource.set(f.source, [...(bySource.get(f.source) ?? []), f.item]);
for (const [s, items] of bySource) {
  lines.push(`### ${s.name}`, `Verify at: ${s.verify_at}`, '');
  for (const i of items) lines.push(`- [ ] ${i.date}: [${i.title.replace(/[[\]]/g, '')}](${i.link})`);
  lines.push('');
}
if (failed.length) {
  lines.push('### Sources that could not be read today', '');
  for (const f of failed) lines.push(`- ${f.source.name}: ${f.error}`);
  lines.push('');
}
writeFileSync(outPath, lines.join('\n'));
console.log(lines[0]);
if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `leads=${found.length}\nfailed=${failed.length}\n`);
}
