# GRC Insights Live Notebook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-page GRC Field Notes site into a Jekyll-built living notebook (issues archive, Regulation Radar, RSS/SEO) fed by a scheduled routine that researches with `anthropic-skills:deep-research` and opens one review PR per issue.

**Architecture:** GitHub Pages' legacy Jekyll build publishes `main`. Content lives as data: `_issues/*.md` (one per issue), `_data/tracker.yml` (Radar rows), `_data/editorial.yml` (calendar/cadence), `_data/taxonomy.yml` (all enums). Node scripts (`scripts/`) validate content and decide what each weekly run does. A GitHub Actions workflow builds the site with `actions/jekyll-build-pages` and runs Node tests against `_site`. A Claude routine follows `routine/weekly-issue.md` to research, draft, validate, and open a PR. Surabhi merges to publish.

**Tech Stack:** Jekyll (github-pages gem: jekyll-seo-tag, jekyll-sitemap), Liquid, vanilla ES modules, Node 20 (`node:test`, `yaml@2.5.1`), Python 3 + Pillow (one-off OG image), GitHub Actions, `gh` CLI, Claude routines + `anthropic-skills:deep-research`.

**Spec:** `docs/superpowers/specs/2026-10-07-grc-insights-live-notebook-design.md`

## Global Constraints

- Repo: `~/projects/grc-insights` (`grc-with-sjo/grc-insights`). Work on branch `design/live-notebook`. Never push to `main`; it reaches `main` only through a PR Surabhi merges.
- Site URL `https://grc-with-sjo.github.io`, baseurl `/grc-insights`. Every internal link in templates uses `| relative_url` (or `| absolute_url` for feeds and share links).
- `sources.html` keeps its URL `/sources.html` and gets no front matter.
- Issue 0 lives at `/issues/2026-05-field-notes/`, with its content kept word-for-word.
- Research source rule (hard requirement): all content gathering, regulatory status checks, and tracker data verification go through the `anthropic-skills:deep-research` skill. No factual or regulatory claims from model memory.
- Every factual claim links to a source, preferring primary sources. Anything unresolved is marked `⚠️ verify`.
- No legal-advice framing. The footer keeps "Views are my own · Not legal or regulatory advice".
- Nothing is auto-posted to social platforms. Drafts only, in `social/`.
- Analytics: GoatCounter only (cookieless). No other third-party scripts.
- Calendar (run dates are Sundays, America/Vancouver): catch-up 2026-10-18, 10-25, 11-01, 11-08, 11-15, 11-22. `monthly_start: 2026-12-06`. Rotation `[banking, saas, cloud, tech, retail, hardware]`.
- Enums live only in `_data/taxonomy.yml`. Tracker dates are quoted strings (`"2026-09-22"`).
- Local machine: Node 20 and Python 3 + Pillow are available. There is no Jekyll, Homebrew, or Docker, and Ruby is 2.6. **Site builds are verified only in GitHub Actions** (`.github/workflows/check.yml`).
- Commit messages end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Outward actions need Surabhi's explicit OK in chat before the first occurrence: pushing the branch (Task 3), creating labels and opening the launch PR (Task 10), and creating any routine or scheduled task (Tasks 11, 13).

---

## File Structure

| Path | Responsibility |
|---|---|
| `package.json`, `package-lock.json`, `.gitignore` | Node dev tooling (`yaml` only) and npm scripts |
| `_data/taxonomy.yml` | Single source of truth for regions, sectors, categories, series, tracker enums |
| `_data/editorial.yml` | Cadence, catch-up calendar, monthly rotation, seed sources |
| `_data/tracker.yml` | Regulation Radar rows |
| `scripts/lib/frontmatter.mjs` | `parseFrontMatter(text)` |
| `scripts/lib/dates.mjs` | ISO date helpers (`isIsoDate`, `weekdayOf`, `isFirstSunday`, `monthsBetween`, `todayIn`) |
| `scripts/lib/taxonomy.mjs` | `loadTaxonomy(root)` gives Sets of allowed values |
| `scripts/lib/issues.mjs` | `readIssues(root)` gives `[{file, data, body}]` |
| `scripts/validate.mjs` | Content validators plus CLI (`npm run validate`, `--verify-count`) |
| `scripts/plan-run.mjs` | `planRun()` decides what a weekly run does, plus CLI |
| `scripts/make_og_card.py` | One-off generator for `assets/og-card.png` |
| `_config.yml` | Jekyll config, collection, defaults, excludes |
| `_layouts/default.html`, `_layouts/issue.html` | Page chrome, issue page |
| `_includes/*.html` | about, share, subscribe, filter-chips, radar-data |
| `_issues/2026-05-field-notes.html` | Issue 0 (migrated) |
| `index.html`, `about.html`, `radar.html`, `feed.xml` | Pages |
| `js/filters.js`, `js/radar.js` | Browser modules (pure functions exported for tests) |
| `css/style.css` | Existing styles plus appended "living notebook" section |
| `routine/*.md` | Routine prompt and issue/social/PR templates |
| `social/` | Per-issue social drafts (excluded from site) |
| `tests/*.test.mjs` | `node:test` suites; `site.test.mjs` runs only with `SITE_DIR` |
| `.github/workflows/check.yml` | Build site with Pages' Jekyll, run tests |
| `README.md` | Setup and operating guide for Surabhi (excluded from site) |

---

### Task 1: Node toolchain, taxonomy, and content validators

**Files:**
- Create: `package.json`, `.gitignore`, `_data/taxonomy.yml`, `_data/tracker.yml`
- Create: `scripts/lib/frontmatter.mjs`, `scripts/lib/dates.mjs`, `scripts/lib/taxonomy.mjs`, `scripts/lib/issues.mjs`, `scripts/validate.mjs`
- Test: `tests/frontmatter.test.mjs`, `tests/validate.test.mjs`

**Interfaces:**
- Produces:
  - `parseFrontMatter(text: string) → { data: object|null, body: string }`
  - `isIsoDate(v) → boolean`, `weekdayOf(iso) → 0..6`, `isFirstSunday(iso) → boolean`, `monthsBetween(fromIso, toIso) → int`, `todayIn(timeZone) → 'YYYY-MM-DD'`
  - `loadTaxonomy(root) → { regions, sectors, categories, series, trackerTypes, trackerStatuses, relevance: Set<string>, standingSectors: string[] }`
  - `readIssues(root) → [{ file, data, body }]` (empty if `_issues/` is missing)
  - `REQUIRED_SECTIONS: string[]`, `validateIssue({file,data,body}, tax) → string[]`, `validateTrackerRows(rows, tax) → string[]`, `validateEditorial(ed, tax) → string[]`, `countVerifyFlags(body) → int`, `validateRepo(root) → { errors: string[], verifyFlags: {file: int} }`

- [ ] **Step 1: Branch check and tooling files**

```bash
cd ~/projects/grc-insights && git switch design/live-notebook && git status --short
```
Expected: on `design/live-notebook`, clean tree.

Create `package.json`:

```json
{
  "name": "grc-insights",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test tests/*.test.mjs",
    "validate": "node scripts/validate.mjs",
    "plan-run": "node scripts/plan-run.mjs"
  },
  "devDependencies": {
    "yaml": "2.5.1"
  }
}
```

Create `.gitignore`:

```
node_modules/
_site/
.jekyll-cache/
.sass-cache/
```

Run: `npm install`. Expected: `package-lock.json` is created and `yaml@2.5.1` is installed.

- [ ] **Step 2: Create `_data/taxonomy.yml` and an empty tracker**

```yaml
# Single source of truth for every enum used by templates (Liquid) and scripts/validate.mjs.
regions:
  - { id: CA, label: "🇨🇦 Canada" }
  - { id: US, label: "🇺🇸 United States" }
  - { id: EU, label: "🇪🇺 EU" }
  - { id: UK, label: "🇬🇧 UK" }
  - { id: APAC, label: "🌏 APAC" }
  - { id: IN, label: "🇮🇳 India" }
  - { id: GLOBAL, label: "🌐 Global standards" }
sectors:
  - { id: tech, label: "Tech", standing: true }
  - { id: saas, label: "Product / SaaS", standing: true }
  - { id: cloud, label: "Cloud", standing: true }
  - { id: hardware, label: "Hardware", standing: true }
  - { id: banking, label: "Banking / FinServ", standing: true }
  - { id: retail, label: "Retail", standing: true }
  - { id: healthcare, label: "Healthcare", standing: false }
  - { id: public-sector, label: "Public sector", standing: false }
categories:
  - { id: ai-governance, label: "AI governance" }
  - { id: privacy-law, label: "Privacy law" }
  - { id: enforcement, label: "Enforcement" }
  - { id: frameworks, label: "Frameworks" }
  - { id: third-party-risk, label: "Third-party risk" }
  - { id: practitioner, label: "Practitioner" }
series:
  - { id: field-notes, label: "Field Notes" }
  - { id: catch-up, label: "Catch-up series" }
  - { id: weekly, label: "Weekly" }
  - { id: monthly, label: "Monthly" }
  - { id: flash, label: "Flash" }
tracker_types: [privacy-law, ai-law, sector-rule, standard, guidance]
tracker_statuses: [proposed, passed, in-force, phasing-in, amended, lapsed, repealed]
relevance: [high, medium, watch]
```

Create `_data/tracker.yml`:

```yaml
# Regulation Radar rows. Schema: docs/superpowers/specs/2026-10-07-grc-insights-live-notebook-design.md §3.
# Quote every date ("YYYY-MM-DD"). Seeded in Task 7 via anthropic-skills:deep-research.
[]
```

- [ ] **Step 3: Write failing tests**

`tests/frontmatter.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontMatter } from '../scripts/lib/frontmatter.mjs';

test('parses YAML front matter and body', () => {
  const { data, body } = parseFrontMatter('---\ntitle: Hi\nissue: 1\ndate: 2026-10-18\n---\n## TL;DR\n');
  assert.deepEqual(data, { title: 'Hi', issue: 1, date: '2026-10-18' });
  assert.equal(body, '## TL;DR\n');
});

test('returns null data when there is no front matter', () => {
  const { data, body } = parseFrontMatter('<p>plain</p>');
  assert.equal(data, null);
  assert.equal(body, '<p>plain</p>');
});
```

`tests/validate.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTaxonomy } from '../scripts/lib/taxonomy.mjs';
import { isIsoDate } from '../scripts/lib/dates.mjs';
import {
  REQUIRED_SECTIONS, validateIssue, validateTrackerRows, validateEditorial, countVerifyFlags,
} from '../scripts/validate.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tax = loadTaxonomy(root);

const goodData = {
  title: 'Canada privacy reset', issue: 1, series: 'catch-up', date: '2026-10-18',
  regions: ['CA'], sectors: ['saas'], categories: ['privacy-law'], description: 'A hook.',
};
const goodBody = REQUIRED_SECTIONS.map(h => `${h}\n\ntext\n`).join('\n') + '\n- [OPC](https://www.priv.gc.ca/)\n';
const issue = (over = {}, body = goodBody, file = '2026-10-18-canada.md') => ({ file, data: { ...goodData, ...over }, body });

test('isIsoDate accepts real dates only', () => {
  assert.equal(isIsoDate('2026-10-18'), true);
  assert.equal(isIsoDate('2026-02-30'), false);
  assert.equal(isIsoDate('Oct 18'), false);
});

test('a well-formed issue has no errors', () => {
  assert.deepEqual(validateIssue(issue(), tax), []);
});

test('unknown enum values are reported', () => {
  const errs = validateIssue(issue({ regions: ['MARS'], sectors: ['crypto'], categories: [] }), tax);
  assert.ok(errs.some(e => e.includes('regions: unknown value "MARS"')));
  assert.ok(errs.some(e => e.includes('sectors: unknown value "crypto"')));
  assert.ok(errs.some(e => e.includes('categories must be a non-empty list')));
});

test('missing and out-of-order sections are reported', () => {
  const body = goodBody.replace('## My take', '## Opinion');
  assert.ok(validateIssue(issue({}, body), tax).some(e => e.includes('missing section "## My take"')));
  const swapped = ['## TL;DR', '## Sector lens', '## What changed', '## My take', '## What to do now', '## On the radar', '## Sources']
    .map(h => `${h}\n\nx\n`).join('\n') + '[a](https://a.b)\n';
  assert.ok(validateIssue(issue({}, swapped), tax).some(e => e.includes('out of order')));
});

test('Sources section must contain a link', () => {
  const body = goodBody.replace('- [OPC](https://www.priv.gc.ca/)', '- OPC website');
  assert.ok(validateIssue(issue({}, body), tax).some(e => e.includes('at least one http(s) link')));
});

test('description over 200 chars and filename/date mismatch are reported', () => {
  const errs = validateIssue(issue({ description: 'x'.repeat(201) }, goodBody, '2026-11-01-x.md'), tax);
  assert.ok(errs.some(e => e.includes('200 characters')));
  assert.ok(errs.some(e => e.includes('filename must start with the issue date')));
});

test('field-notes issues skip the section-structure check', () => {
  const errs = validateIssue(issue({ series: 'field-notes', issue: 0, date: '2026-05-01' }, '<div>legacy</div>', '2026-05-field-notes.html'), tax);
  assert.deepEqual(errs, []);
});

const row = {
  id: 'ca-qc-law25', name: 'Québec Law 25', region: 'CA', jurisdiction: 'Québec', type: 'privacy-law',
  status: 'in-force', key_dates: [{ date: '2024-09-22', what: 'Portability right in force' }],
  sectors: ['tech'], applies_to_me: 'high', summary: 'Québec private-sector privacy law.',
  source: 'https://www.legisquebec.gouv.qc.ca/', last_reviewed: '2026-10-07',
};

test('valid tracker rows pass; duplicates and bad fields fail', () => {
  assert.deepEqual(validateTrackerRows([row], tax), []);
  const errs = validateTrackerRows([row, { ...row, status: 'dead', key_dates: [{ date: '2024/09/22' }], source: 'www.x' }], tax);
  assert.ok(errs.some(e => e.includes('duplicate id')));
  assert.ok(errs.some(e => e.includes('status: unknown value "dead"')));
  assert.ok(errs.some(e => e.includes('key_dates[0].date')));
  assert.ok(errs.some(e => e.includes('key_dates[0].what')));
  assert.ok(errs.some(e => e.includes('source must be an http(s) URL')));
  assert.deepEqual(validateTrackerRows(null, tax), ['tracker.yml must be a list']);
});

const editorial = {
  cadence: 'monthly',
  calendar: { '2026-10-18': { series: 'catch-up', theme: 'Canada' } },
  monthly_start: '2026-12-06',
  monthly_feature_rotation: ['banking', 'saas'],
  sources: { regulators: ['OPC'], standards: ['NIST'], trackers: ['IAPP'] },
};

test('valid editorial passes; non-Sunday dates fail', () => {
  assert.deepEqual(validateEditorial(editorial, tax), []);
  const errs = validateEditorial({ ...editorial, cadence: 'daily', calendar: { '2026-10-19': { series: 'catch-up', theme: 'x' } } }, tax);
  assert.ok(errs.some(e => e.includes('cadence must be weekly or monthly')));
  assert.ok(errs.some(e => e.includes('2026-10-19 must be a Sunday')));
});

test('countVerifyFlags counts markers with or without the emoji variation selector', () => {
  assert.equal(countVerifyFlags('a ⚠️ verify b ⚠ verify c'), 2);
  assert.equal(countVerifyFlags('clean'), 0);
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL with `Cannot find module .../scripts/lib/frontmatter.mjs` (and similar for the others).

- [ ] **Step 5: Implement the libraries**

`scripts/lib/frontmatter.mjs`:

```js
import { parse } from 'yaml';

export function parseFrontMatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: null, body: text };
  return { data: parse(m[1]) ?? {}, body: m[2] };
}
```

`scripts/lib/dates.mjs`:

```js
const ISO = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDate(v) {
  if (typeof v !== 'string' || !ISO.test(v)) return false;
  const d = new Date(`${v}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}

export function weekdayOf(iso) {
  return new Date(`${iso}T00:00:00Z`).getUTCDay();
}

export function isFirstSunday(iso) {
  return weekdayOf(iso) === 0 && Number(iso.slice(8, 10)) <= 7;
}

export function monthsBetween(fromIso, toIso) {
  const [fy, fm] = fromIso.split('-').map(Number);
  const [ty, tm] = toIso.split('-').map(Number);
  return (ty * 12 + tm) - (fy * 12 + fm);
}

export function todayIn(timeZone) {
  return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
```

`scripts/lib/taxonomy.mjs`:

```js
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

export function loadTaxonomy(root) {
  const t = parse(readFileSync(join(root, '_data/taxonomy.yml'), 'utf8'));
  const ids = list => new Set(list.map(x => x.id));
  return {
    regions: ids(t.regions),
    sectors: ids(t.sectors),
    categories: ids(t.categories),
    series: ids(t.series),
    trackerTypes: new Set(t.tracker_types),
    trackerStatuses: new Set(t.tracker_statuses),
    relevance: new Set(t.relevance),
    standingSectors: t.sectors.filter(s => s.standing).map(s => s.id),
  };
}
```

`scripts/lib/issues.mjs`:

```js
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseFrontMatter } from './frontmatter.mjs';

export function readIssues(root) {
  const dir = join(root, '_issues');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => /\.(md|html)$/.test(f))
    .sort()
    .map(file => ({ file, ...parseFrontMatter(readFileSync(join(dir, file), 'utf8')) }));
}
```

- [ ] **Step 6: Implement `scripts/validate.mjs`**

```js
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { parseFrontMatter } from './lib/frontmatter.mjs';
import { isIsoDate, weekdayOf } from './lib/dates.mjs';
import { loadTaxonomy } from './lib/taxonomy.mjs';
import { readIssues } from './lib/issues.mjs';

export const REQUIRED_SECTIONS = [
  '## TL;DR', '## What changed', '## Sector lens', '## My take',
  '## What to do now', '## On the radar', '## Sources',
];
const URL_RE = /^https?:\/\/\S+$/;

function subsetErrors(label, values, allowed) {
  if (!Array.isArray(values) || values.length === 0) return [`${label} must be a non-empty list`];
  return values.filter(v => !allowed.has(v)).map(v => `${label}: unknown value "${v}"`);
}

export function validateIssue({ file, data, body }, tax) {
  const errors = [];
  const fail = m => errors.push(`${file}: ${m}`);
  if (!data) { fail('missing front matter'); return errors; }
  if (typeof data.title !== 'string' || !data.title.trim()) fail('title is required');
  if (!Number.isInteger(data.issue) || data.issue < 0) fail('issue must be a non-negative integer');
  if (!tax.series.has(data.series)) fail(`series: unknown value "${data.series}"`);
  if (!isIsoDate(data.date)) fail('date must be YYYY-MM-DD');
  else if (!file.startsWith(data.date.slice(0, 7))) fail('filename must start with the issue date (YYYY-MM)');
  if (typeof data.description !== 'string' || !data.description.trim()) fail('description is required');
  else if (data.description.length > 200) fail('description must be 200 characters or fewer');
  for (const m of subsetErrors('regions', data.regions, tax.regions)) fail(m);
  for (const m of subsetErrors('sectors', data.sectors, tax.sectors)) fail(m);
  for (const m of subsetErrors('categories', data.categories, tax.categories)) fail(m);

  if (data.series !== 'field-notes') {
    const lines = body.split('\n').map(l => l.trim());
    let last = -1;
    for (const heading of REQUIRED_SECTIONS) {
      const i = lines.indexOf(heading);
      if (i === -1) fail(`missing section "${heading}"`);
      else if (i < last) fail(`section "${heading}" is out of order`);
      else last = i;
    }
    const sources = body.split(/^## Sources\s*$/m)[1] ?? '';
    if (!/\]\(https?:\/\//.test(sources)) fail('Sources section must contain at least one http(s) link');
  }
  return errors;
}

export function validateTrackerRows(rows, tax) {
  if (!Array.isArray(rows)) return ['tracker.yml must be a list'];
  const errors = [];
  const seen = new Set();
  rows.forEach((raw, i) => {
    const r = raw ?? {};
    const fail = m => errors.push(`tracker[${i}] ${r.id ?? '?'}: ${m}`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.id ?? '')) fail('id must be kebab-case');
    else if (seen.has(r.id)) fail('duplicate id');
    else seen.add(r.id);
    for (const f of ['name', 'jurisdiction', 'summary']) {
      if (typeof r[f] !== 'string' || !r[f].trim()) fail(`${f} is required`);
    }
    if (!tax.regions.has(r.region)) fail(`region: unknown value "${r.region}"`);
    if (!tax.trackerTypes.has(r.type)) fail(`type: unknown value "${r.type}"`);
    if (!tax.trackerStatuses.has(r.status)) fail(`status: unknown value "${r.status}"`);
    if (!tax.relevance.has(r.applies_to_me)) fail(`applies_to_me: unknown value "${r.applies_to_me}"`);
    for (const m of subsetErrors('sectors', r.sectors, tax.sectors)) fail(m);
    if (!URL_RE.test(r.source ?? '')) fail('source must be an http(s) URL');
    if (!isIsoDate(r.last_reviewed)) fail('last_reviewed must be YYYY-MM-DD');
    if (!Array.isArray(r.key_dates)) fail('key_dates must be a list (may be empty)');
    else r.key_dates.forEach((k, j) => {
      if (!isIsoDate(k?.date)) fail(`key_dates[${j}].date must be YYYY-MM-DD`);
      if (typeof k?.what !== 'string' || !k.what.trim()) fail(`key_dates[${j}].what is required`);
    });
  });
  return errors;
}

export function validateEditorial(ed, tax) {
  if (!ed || typeof ed !== 'object') return ['editorial.yml: must be a mapping'];
  const errors = [];
  const fail = m => errors.push(`editorial.yml: ${m}`);
  if (!['weekly', 'monthly'].includes(ed.cadence)) fail('cadence must be weekly or monthly');
  if (!isIsoDate(ed.monthly_start)) fail('monthly_start must be YYYY-MM-DD');
  else if (weekdayOf(ed.monthly_start) !== 0) fail('monthly_start must be a Sunday');
  for (const [date, entry] of Object.entries(ed.calendar ?? {})) {
    if (!isIsoDate(date)) fail(`calendar key "${date}" must be YYYY-MM-DD`);
    else if (weekdayOf(date) !== 0) fail(`calendar date ${date} must be a Sunday`);
    if (!tax.series.has(entry?.series)) fail(`calendar ${date}: unknown series "${entry?.series}"`);
    if (typeof entry?.theme !== 'string' || !entry.theme.trim()) fail(`calendar ${date}: theme is required`);
  }
  for (const m of subsetErrors('monthly_feature_rotation', ed.monthly_feature_rotation, tax.sectors)) fail(m);
  for (const k of ['regulators', 'standards', 'trackers']) {
    if (!Array.isArray(ed.sources?.[k]) || ed.sources[k].length === 0) fail(`sources.${k} must be a non-empty list`);
  }
  return errors;
}

export function countVerifyFlags(body) {
  return (body.match(/⚠️? verify/g) || []).length;
}

function readYaml(path) {
  return existsSync(path) ? parse(readFileSync(path, 'utf8')) : undefined;
}

export function validateRepo(root) {
  const tax = loadTaxonomy(root);
  const errors = [];
  const verifyFlags = {};
  const issues = readIssues(root);
  for (const doc of issues) {
    errors.push(...validateIssue(doc, tax));
    verifyFlags[doc.file] = countVerifyFlags(doc.body);
  }
  const numbers = issues.filter(d => Number.isInteger(d.data?.issue)).map(d => [d.file, d.data.issue]);
  numbers.forEach(([file, n], i) => {
    if (numbers.findIndex(([, m]) => m === n) !== i) errors.push(`${file}: duplicate issue number ${n}`);
  });
  errors.push(...validateTrackerRows(readYaml(join(root, '_data/tracker.yml')), tax));
  const editorialPath = join(root, '_data/editorial.yml');
  if (existsSync(editorialPath)) errors.push(...validateEditorial(readYaml(editorialPath), tax));
  return { errors, verifyFlags };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const args = process.argv.slice(2);
  if (args[0] === '--verify-count') {
    const { body } = parseFrontMatter(readFileSync(args[1], 'utf8'));
    console.log(countVerifyFlags(body));
  } else {
    const { errors, verifyFlags } = validateRepo(root);
    for (const [file, n] of Object.entries(verifyFlags)) {
      if (n) console.log(`${file}: ${n} item(s) marked "⚠️ verify"`);
    }
    if (errors.length) {
      console.error(errors.join('\n'));
      process.exit(1);
    }
    console.log('OK: content is valid');
  }
}
```

- [ ] **Step 7: Run tests and the CLI**

Run: `npm test && npm run validate`
Expected: all tests pass, then `OK: content is valid`.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json .gitignore _data/taxonomy.yml _data/tracker.yml scripts tests
git commit -m "feat: content taxonomy and validators for issues, tracker and editorial data

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Editorial calendar and run planner

**Files:**
- Create: `_data/editorial.yml`, `scripts/plan-run.mjs`
- Test: `tests/plan-run.test.mjs`, `tests/repo.test.mjs`

**Interfaces:**
- Consumes: `readIssues`, `isFirstSunday`, `monthsBetween`, `todayIn`, `validateRepo` (Task 1)
- Produces:
  - `parsePendingBranches(names: string[]) → [{ issue: int, date: 'YYYY-MM-DD' }]` (branch format `issue/NN-YYYY-MM-DD-slug`)
  - `planRun({ today, editorial, issues: [{issue, date}], pending }) → { today, nextIssue, windowStart, pendingCount, mode: 'issue'|'radar-check', series?, theme?, feature?, reason? }`
  - CLI: `node scripts/plan-run.mjs [--today YYYY-MM-DD] [--pending "issue/01-2026-10-18-x,..."]` prints the JSON

- [ ] **Step 1: Create `_data/editorial.yml`**

```yaml
# Controls what the weekly routine does. See scripts/plan-run.mjs for the exact rules.
# cadence: monthly → calendar entries publish; otherwise first Sunday of each month from monthly_start.
# cadence: weekly  → an issue every Sunday (calendar themes still apply on their dates).
cadence: monthly
calendar:
  2026-10-18: { series: catch-up, theme: "Canada privacy & AI: federal reform, Law 25, BC PIPA" }
  2026-10-25: { series: catch-up, theme: "EU AI Act phase-ins, GDPR enforcement, UK" }
  2026-11-01: { series: catch-up, theme: "US state privacy & AI laws + FTC (incl. retail & consumer data)" }
  2026-11-08: { series: catch-up, theme: "Banking/FinServ: OSFI E-23, DORA, model risk, AI in credit" }
  2026-11-15: { series: catch-up, theme: "Tech, SaaS, cloud, hardware: AI supply chain, chips, vendor AI clauses" }
  2026-11-22: { series: catch-up, theme: "APAC, India DPDP, global standards + 2027 outlook" }
monthly_start: "2026-12-06"
monthly_feature_rotation: [banking, saas, cloud, tech, retail, hardware]
sources:
  regulators: [OPC, BC OIPC, CAI Québec, IPC Ontario, Alberta OIPC, OSFI, FTC, CPPA, State AGs, EDPB, EU AI Office, ICO, PDPC Singapore, OAIC, MeitY / Data Protection Board of India]
  standards: [NIST, ISO/IEC JTC 1/SC 42, OECD.AI]
  trackers: [IAPP]
```

- [ ] **Step 2: Write failing tests**

`tests/plan-run.test.mjs`:

```js
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

test('parsePendingBranches keeps only issue branches', () => {
  assert.deepEqual(
    parsePendingBranches(['issue/01-2026-10-18-canada-privacy', 'radar/2026-11-29', 'main']),
    [{ issue: 1, date: '2026-10-18' }],
  );
});
```

`tests/repo.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateRepo } from '../scripts/validate.mjs';

test('repository content passes validation', () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  assert.deepEqual(validateRepo(root).errors, []);
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL with `Cannot find module .../scripts/plan-run.mjs`. `repo.test.mjs` passes.

- [ ] **Step 4: Implement `scripts/plan-run.mjs`**

```js
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { isFirstSunday, monthsBetween, todayIn } from './lib/dates.mjs';
import { readIssues } from './lib/issues.mjs';

export function parsePendingBranches(names) {
  return names
    .map(n => n.trim().match(/^issue\/(\d+)-(\d{4}-\d{2}-\d{2})-/))
    .filter(Boolean)
    .map(m => ({ issue: Number(m[1]), date: m[2] }));
}

export function planRun({ today, editorial, issues, pending = [] }) {
  const nextIssue = Math.max(-1, ...issues.map(i => i.issue), ...pending.map(p => p.issue)) + 1;
  const windowStart = issues.map(i => i.date).sort().at(-1) ?? null;
  const base = { today, nextIssue, windowStart, pendingCount: pending.length };

  if ([...issues, ...pending].some(i => i.date === today)) {
    return { ...base, mode: 'radar-check', reason: 'an issue for this date already exists' };
  }
  const entry = editorial.calendar?.[today];
  if (entry) return { ...base, mode: 'issue', series: entry.series, theme: entry.theme };
  if (editorial.cadence === 'weekly') {
    return { ...base, mode: 'issue', series: 'weekly', theme: 'This week in AI governance and privacy' };
  }
  if (today >= editorial.monthly_start && isFirstSunday(today)) {
    const rotation = editorial.monthly_feature_rotation;
    const feature = rotation[monthsBetween(editorial.monthly_start, today) % rotation.length];
    return { ...base, mode: 'issue', series: 'monthly', theme: `Monthly roundup + feature: ${feature}`, feature };
  }
  return { ...base, mode: 'radar-check', reason: 'not a publishing week' };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const arg = name => {
    const i = process.argv.indexOf(name);
    return i === -1 ? undefined : process.argv[i + 1];
  };
  const today = arg('--today') ?? todayIn('America/Vancouver');
  const pending = parsePendingBranches((arg('--pending') ?? '').split(',').filter(Boolean));
  const editorial = parse(readFileSync(join(root, '_data/editorial.yml'), 'utf8'));
  const issues = readIssues(root)
    .filter(d => d.data && Number.isInteger(d.data.issue))
    .map(d => ({ issue: d.data.issue, date: String(d.data.date) }));
  console.log(JSON.stringify(planRun({ today, editorial, issues, pending }), null, 2));
}
```

- [ ] **Step 5: Run tests and a CLI smoke check**

Run: `npm test && node scripts/plan-run.mjs --today 2026-10-18`
Expected: all tests pass. The JSON shows `"mode": "issue"`, `"series": "catch-up"`, `"nextIssue": 0` (Issue 0 isn't migrated yet), and `"windowStart": null`.

- [ ] **Step 6: Commit**

```bash
git add _data/editorial.yml scripts/plan-run.mjs tests/plan-run.test.mjs tests/repo.test.mjs
git commit -m "feat: editorial calendar and deterministic weekly run planner

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Jekyll scaffold, About page, feed, and CI check workflow

**Files:**
- Create: `_config.yml`, `_layouts/default.html`, `_includes/about.html`, `about.html`, `feed.xml`, `.github/workflows/check.yml`
- Modify: `css/style.css` (append the "LIVING NOTEBOOK" section)
- Test: `tests/site.test.mjs`

**Interfaces:**
- Consumes: none (static)
- Produces:
  - Layout `default` (chrome: `<nav class="site-nav">`, footer). Pages set `title` and `description`.
  - Include `about.html` (the author block)
  - `site.author.{name,role,location,url}`, `site.goatcounter`, `site.linkedin_newsletter`
  - CSS classes: `site-nav`, `hero-compact`, `content-wide`, `prose`, `muted`, `issue-body`, `chip`, `filter-row`, `filter-label`, `latest-card`, `archive-list`, `archive-meta`, `share-row`, `subscribe`, `subscribe-title`, `subscribe-links`, `back-to-archive`, `upcoming`, `table-wrap`, `radar-table`, `radar-type`, `status-*`, `relevance-*`
  - `tests/site.test.mjs` helpers `page(path)` and the internal-link check that later tasks extend

- [ ] **Step 1: Write the failing site test**

`tests/site.test.mjs`:

```js
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
```

Run: `npm test`
Expected: site tests are reported as **skipped** (no `SITE_DIR`) and everything else passes. The real failing run happens in CI at Step 7.

- [ ] **Step 2: Extract the author block from the current `index.html`**

```bash
mkdir -p _includes _layouts
awk '/About the Author/{f=1;next} /<\/main>/{f=0} f' index.html > _includes/about.html
head -3 _includes/about.html && grep -c "Connect on LinkedIn" _includes/about.html
```
Expected: the first line is `    <div class="about">`, and the count is `1`.

- [ ] **Step 3: Create `_config.yml`**

```yaml
title: GRC Insights
description: >-
  A GRC practitioner's living notebook on how AI is evolving and how governance should adapt:
  privacy law, AI regulation and what they mean for tech, SaaS, cloud, hardware, banking and retail.
url: https://grc-with-sjo.github.io
baseurl: /grc-insights
lang: en
timezone: America/Vancouver
author:
  name: Surabhi Joshi
  role: GRC Manager
  location: New Westminster, BC
  url: https://www.linkedin.com/in/surabhijo/
social:
  name: Surabhi Joshi
  links:
    - https://www.linkedin.com/in/surabhijo/
# Fill in during setup (README.md). Empty means the feature is hidden.
goatcounter: ""
linkedin_newsletter: ""

markdown: kramdown
future: true
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap

collections:
  issues:
    output: true
    permalink: /issues/:name/

defaults:
  - scope: { path: "", type: issues }
    values: { layout: issue }

exclude:
  - package.json
  - package-lock.json
  - node_modules
  - scripts
  - tests
  - routine
  - social
  - docs
  - README.md
  - Gemfile
  - Gemfile.lock
  - vendor
  - .github
```

- [ ] **Step 4: Create `_layouts/default.html`**

```html
<!DOCTYPE html>
<html lang="{{ site.lang | default: 'en' }}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  {% seo %}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{{ '/css/style.css' | relative_url }}" />
  <link rel="alternate" type="application/atom+xml" title="{{ site.title }}" href="{{ '/feed.xml' | relative_url }}" />
</head>
<body>
  <nav class="site-nav" aria-label="Site">
    <a class="brand" href="{{ '/' | relative_url }}">GRC Insights</a>
    <a href="{{ '/about/' | relative_url }}">About</a>
    <a href="{{ '/feed.xml' | relative_url }}">RSS</a>
  </nav>

  {{ content }}

  <footer class="page-footer">
    <p>© {{ site.time | date: '%Y' }} <strong>{{ site.author.name }}</strong> · GRC Practitioner, New Westminster, BC</p>
    <p style="margin-top:6px;">Views are my own · Not legal or regulatory advice</p>
  </footer>
</body>
</html>
```

- [ ] **Step 5: Create `about.html` and `feed.xml`**

`about.html`:

```html
---
layout: default
title: About
permalink: /about/
description: About Surabhi Joshi and how GRC Insights is researched, written and reviewed.
---
<section class="hero hero-compact">
  <div class="hero-inner">
    <div class="hero-tag">About</div>
    <h1>About this <span>notebook</span></h1>
  </div>
</section>

<main class="content">
  <p class="section-label">How it works</p>
  <div class="prose">
    <p>GRC Insights is my running notebook on how the AI world is evolving and how governance should adapt: privacy law, AI regulation, and what both mean for tech, product/SaaS, cloud, hardware, banking and retail.</p>
    <p><strong>Cadence.</strong> A six-part weekly catch-up series (October–November 2026), then one issue a month. The Regulation Radar is updated as laws move.</p>
    <p><strong>Method.</strong> Research and first drafts are AI-assisted. Every claim links to a source, and every issue is reviewed, edited and approved by me before it is published.</p>
  </div>
  {% include about.html %}
</main>
```

> Note for executor: the "Method" sentence discloses AI-assisted drafting. Keep it. Surabhi confirms or edits the wording at the launch review (Task 10).

`feed.xml`:

```xml
---
layout: null
permalink: /feed.xml
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>{{ site.title | xml_escape }}</title>
  <subtitle>{{ site.description | xml_escape }}</subtitle>
  <link href="{{ '/feed.xml' | absolute_url }}" rel="self"/>
  <link href="{{ '/' | absolute_url }}"/>
  <updated>{{ site.time | date_to_xmlschema }}</updated>
  <id>{{ '/' | absolute_url }}</id>
  <author><name>{{ site.author.name | xml_escape }}</name></author>
  {% assign issues = site.issues | sort: 'date' | reverse %}
  {% for issue in issues limit: 20 %}
  <entry>
    <title>{{ issue.title | xml_escape }}</title>
    <link href="{{ issue.url | absolute_url }}"/>
    <id>{{ issue.url | absolute_url }}</id>
    <updated>{{ issue.date | date_to_xmlschema }}</updated>
    <summary>{{ issue.description | xml_escape }}</summary>
    <content type="html">{{ issue.content | xml_escape }}</content>
  </entry>
  {% endfor %}
</feed>
```

- [ ] **Step 6: Append the shared CSS and create the CI workflow**

Append to the end of `css/style.css`:

```css

/* ══ LIVING NOTEBOOK (site chrome, issues, archive, radar) ══ */
[hidden] { display: none !important; }
.muted { color: var(--muted); }

.site-nav { display: flex; flex-wrap: wrap; gap: 6px 20px; align-items: center; padding: 14px 32px; background: #0F172A; border-bottom: 1px solid rgba(255,255,255,0.08); }
.site-nav a { color: rgba(255,255,255,0.78); text-decoration: none; font-weight: 700; font-size: 0.88rem; }
.site-nav a:hover { color: #fff; }
.site-nav .brand { font-family: 'Caveat', cursive; font-size: 1.5rem; color: #FDA4AF; margin-right: auto; }

.hero-compact { padding: 40px 32px 36px; }
.content-wide { max-width: 1200px; }
.prose p { margin-bottom: 14px; }
.prose a, .issue-body a { color: var(--rose); font-weight: 600; }

.issue-body { max-width: 800px; }
.issue-body p { margin-bottom: 14px; }
.issue-body h2 { font-family: 'Caveat', cursive; font-size: 2rem; margin: 40px 0 12px; color: var(--text); }
.issue-body ul, .issue-body ol { margin: 0 0 16px 22px; }
.issue-body li { margin-bottom: 6px; }
.issue-body blockquote { border-left: 4px solid var(--rose); background: var(--rose-l); padding: 12px 18px; border-radius: 0 10px 10px 0; margin: 16px 0; }
.issue-body table { width: 100%; border-collapse: collapse; margin: 12px 0 20px; font-size: 0.92rem; background: var(--white); display: block; overflow-x: auto; }
.issue-body th, .issue-body td { border: 1px solid var(--border); padding: 8px 12px; text-align: left; vertical-align: top; }
.issue-body th { background: var(--cream); }

.chip { display: inline-block; border: 1px solid var(--border); background: var(--white); color: var(--text); border-radius: 999px; padding: 5px 12px; font: 600 0.82rem 'Nunito', sans-serif; cursor: pointer; text-decoration: none; }
.chip[aria-pressed="true"] { background: var(--text); color: var(--white); border-color: var(--text); }
.filter-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-bottom: 10px; }
.filter-label { font-weight: 800; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); min-width: 70px; }

.latest-card { display: block; background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 24px 28px; text-decoration: none; color: var(--text); margin-bottom: 32px; transition: transform .15s; }
.latest-card:hover { transform: translateY(-2px); }
.latest-card .latest-meta { display: block; font-size: 0.78rem; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: var(--rose); }
.latest-card .latest-title { display: block; font-size: 1.35rem; font-weight: 800; margin: 6px 0; }
.latest-card .latest-desc { display: block; color: var(--muted); }

.archive-list { list-style: none; margin-top: 18px; display: flex; flex-direction: column; gap: 14px; }
.archive-list li { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 16px 20px; }
.archive-list a { font-weight: 800; color: var(--text); text-decoration: none; font-size: 1.05rem; }
.archive-list a:hover { color: var(--rose); }
.archive-meta { display: block; font-size: 0.8rem; color: var(--muted); font-weight: 700; margin: 2px 0 4px; }

.share-row, .subscribe { margin-top: 36px; padding: 20px 24px; border-radius: 14px; background: var(--white); border: 1px solid var(--border); display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.share-row a { color: var(--rose); font-weight: 700; text-decoration: none; }
.subscribe { flex-direction: column; align-items: flex-start; }
.subscribe-title { font-weight: 800; font-size: 1.05rem; }
.subscribe-links { display: flex; flex-wrap: wrap; gap: 8px; }
.back-to-archive { margin: 28px 0; }
.back-to-archive a { color: var(--rose); font-weight: 700; text-decoration: none; }

.upcoming { list-style: none; display: flex; flex-direction: column; gap: 8px; margin: 10px 0 28px; }
.upcoming time { font-weight: 800; color: var(--rose); margin-right: 6px; }
.upcoming a { color: var(--text); font-weight: 700; }
.table-wrap { overflow-x: auto; background: var(--white); border: 1px solid var(--border); border-radius: 14px; margin-top: 16px; }
.radar-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; min-width: 900px; }
.radar-table th, .radar-table td { padding: 10px 12px; border-bottom: 1px solid var(--border); text-align: left; vertical-align: top; }
.radar-table th { background: var(--cream); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; }
.radar-table td a { color: var(--text); font-weight: 800; }
.radar-type { display: block; font-size: 0.75rem; color: var(--muted); }
.status, .relevance { display: inline-block; border-radius: 999px; padding: 2px 10px; font-weight: 700; font-size: 0.78rem; background: var(--blue-l); color: var(--blue); white-space: nowrap; }
.status-in-force { background: var(--green-l); color: var(--green); }
.status-phasing-in { background: var(--amber-l); color: var(--amber); }
.status-lapsed, .status-repealed { background: #F1F1F1; color: var(--muted); }
.relevance-high { background: var(--rose-l); color: var(--rose); }
.relevance-medium { background: var(--amber-l); color: var(--amber); }
.relevance-watch { background: #F1F1F1; color: var(--muted); }

@media (max-width: 600px) {
  .site-nav { padding: 12px 16px; }
  .hero, .hero-compact { padding: 40px 16px 36px; }
  .content { padding: 36px 16px 64px; }
}
```

`.github/workflows/check.yml`:

```yaml
name: Check site
on:
  push:
  workflow_dispatch:
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Build with GitHub Pages' Jekyll
        uses: actions/jekyll-build-pages@v1
        with:
          source: ./
          destination: ./_site
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run validate
      - run: npm test
        env:
          SITE_DIR: _site
```

- [ ] **Step 7: Commit, push (first push needs Surabhi's OK), and watch CI**

Ask Surabhi once, in chat: "OK to push branch `design/live-notebook` to GitHub? It only runs the check workflow. The live site builds from `main` and is unaffected." Proceed on a yes.

```bash
npm test
git add _config.yml _layouts _includes about.html feed.xml css/style.css .github tests/site.test.mjs
git commit -m "feat: Jekyll scaffold, about page, Atom feed and CI site checks

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -u origin design/live-notebook
gh run watch "$(gh run list --branch design/live-notebook --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
```
Expected: the workflow passes, and all five site tests run (none skipped) and pass. If the build fails, read the log with `gh run view --log-failed`, fix, commit, and push again.

---

### Task 4: Issue layout and Issue 0 migration

**Files:**
- Create: `_layouts/issue.html`, `_includes/share.html`, `_includes/subscribe.html`, `_issues/2026-05-field-notes.html`
- Modify: `sources.html` (back link only)
- Test: `tests/legacy.test.mjs`; `tests/site.test.mjs` (append)

**Interfaces:**
- Consumes: layout `default`, include `about.html`, `site.data.taxonomy.series`, `site.author.*`, `site.linkedin_newsletter`
- Produces:
  - Layout `issue` (front matter: `title, issue, series, date, regions, sectors, categories, description`, optional `hero_title_html`, `hero_intro`)
  - Includes `share.html` and `subscribe.html`
  - Issue 0 URL `/issues/2026-05-field-notes/`

- [ ] **Step 1: Write the failing word-for-word test**

`tests/legacy.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGINAL_COMMIT = '575868b';

test('Issue 0 preserves every trend title and action item from the original page', () => {
  const original = execFileSync('git', ['show', `${ORIGINAL_COMMIT}:index.html`], { cwd: root, encoding: 'utf8' });
  const migrated = readFileSync(join(root, '_issues/2026-05-field-notes.html'), 'utf8');
  const fragments = [
    ...original.matchAll(/<div class="trend-title">([^<]+)<\/div>/g),
    ...original.matchAll(/<li>([^<]+)<\/li>/g),
  ].map(m => m[1].trim());
  assert.ok(fragments.length >= 7 + 30, `expected many fragments, got ${fragments.length}`);
  const missing = fragments.filter(f => !migrated.includes(f));
  assert.deepEqual(missing, []);
  assert.match(migrated, /Compliance is no longer a once-a-year event\./);
});
```

Append to `tests/site.test.mjs`:

```js
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
```

Run: `npm test`
Expected: `legacy.test.mjs` FAILS with `ENOENT ... _issues/2026-05-field-notes.html`.

- [ ] **Step 2: Create Issue 0 from the original markup**

```bash
mkdir -p _issues
{
cat <<'YAML'
---
title: "A GRC Practitioner's 2026 Field Notes"
issue: 0
series: field-notes
date: 2026-05-01
regions: [CA, US, EU, IN, GLOBAL]
sectors: [tech, saas, cloud, banking]
categories: [ai-governance, third-party-risk, privacy-law, frameworks, practitioner]
description: "Seven compliance shifts shaping GRC in 2026: AI governance, third-party risk, privacy enforcement, cyber governance, continuous controls, ESG and GRC tech."
hero_title_html: "A GRC Practitioner's<br><span>2026 Field Notes</span>"
hero_intro: >-
  The compliance landscape has shifted dramatically over the past two years.
  Regulations once described as "upcoming" are now in force and being enforced.
  Here are the seven trends shaping GRC programmes in 2026: what's changed,
  what's still coming, and the actions that separate prepared companies from reactive ones.
---
YAML
awk '/<p class="section-label">The Landscape<\/p>/{f=1} /About the Author/{f=0} f' index.html \
  | sed "s|href=\"sources.html\"|href=\"{{ '/sources.html' \| relative_url }}\"|"
} > _issues/2026-05-field-notes.html
grep -c 'trend-card ' _issues/2026-05-field-notes.html; grep -n "relative_url" _issues/2026-05-field-notes.html
```
Expected: `7`, and one line with `href="{{ '/sources.html' | relative_url }}"`. Check that the description is 200 characters or fewer (`npm run validate` enforces this in Step 5).

- [ ] **Step 3: Create the layout and includes**

`_layouts/issue.html`:

```html
---
layout: default
---
{% assign series = site.data.taxonomy.series | where: 'id', page.series | first %}
{% if page.series == 'field-notes' %}{% assign fmt = '%B %Y' %}{% else %}{% assign fmt = '%-d %B %Y' %}{% endif %}
<section class="hero">
  <div class="hero-inner">
    <div class="hero-tag">{{ series.label }}{% if page.issue > 0 %} · Issue {{ page.issue }}{% endif %} · {{ page.date | date: fmt }}</div>
    <h1>{% if page.hero_title_html %}{{ page.hero_title_html }}{% else %}{{ page.title }}{% endif %}</h1>
    <p class="hero-intro">{{ page.hero_intro | default: page.description }}</p>
    <div class="author-row">
      <div class="author-avatar">SJ</div>
      <div class="author-info">
        <div class="name">{{ site.author.name }}</div>
        <div class="meta">{{ site.author.role }} · {{ site.author.location }} · {{ page.date | date: '%B %Y' }}</div>
      </div>
    </div>
  </div>
</section>

<main class="content{% if page.series != 'field-notes' %} issue-body{% endif %}">
  {{ content }}
  {% include share.html %}
  {% include subscribe.html %}
  <p class="back-to-archive"><a href="{{ '/' | relative_url }}#archive">← All issues</a></p>
  {% include about.html %}
</main>
```

`_includes/share.html`:

```html
{% assign share_url = page.url | absolute_url | url_encode %}
{% assign share_text = page.title | url_encode %}
<div class="share-row">
  <strong>Share this issue:</strong>
  <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ share_url }}" target="_blank" rel="noopener">LinkedIn</a>
  <a href="https://twitter.com/intent/tweet?url={{ share_url }}&amp;text={{ share_text }}" target="_blank" rel="noopener">X</a>
  <a href="https://bsky.app/intent/compose?text={{ share_text }}%20{{ share_url }}" target="_blank" rel="noopener">Bluesky</a>
  <a href="mailto:?subject={{ share_text }}&amp;body={{ share_url }}">Email</a>
</div>
```

`_includes/subscribe.html`:

```html
<div class="subscribe">
  <p class="subscribe-title">Get the next issue</p>
  <p class="muted">A new issue every month, plus Regulation Radar updates as laws move.</p>
  <div class="subscribe-links">
    {% if site.linkedin_newsletter and site.linkedin_newsletter != "" %}<a class="chip" href="{{ site.linkedin_newsletter }}" target="_blank" rel="noopener">Subscribe on LinkedIn</a>{% endif %}
    <a class="chip" href="{{ site.author.url }}" target="_blank" rel="noopener">Follow on LinkedIn</a>
    <a class="chip" href="{{ '/feed.xml' | relative_url }}">RSS feed</a>
  </div>
</div>
```

- [ ] **Step 4: Point the sources back link at Issue 0**

```bash
sed -i '' 's|<a class="back-link" href="index.html">|<a class="back-link" href="issues/2026-05-field-notes/">|' sources.html
git diff --stat sources.html && head -1 sources.html
```
Expected: 1 line changed, and the first line is still `<!DOCTYPE html>` (no front matter).

- [ ] **Step 5: Run local tests and validation**

Run: `npm test && npm run validate`
Expected: PASS (`legacy.test.mjs` passes, site tests skipped), then `OK: content is valid`.

- [ ] **Step 6: Commit, push, and watch CI**

```bash
git add _layouts/issue.html _includes/share.html _includes/subscribe.html _issues sources.html tests
git commit -m "feat: issue layout; migrate May 2026 Field Notes to Issue 0

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push
gh run watch "$(gh run list --branch design/live-notebook --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
```
Expected: CI passes, including the two new site tests.

---

### Task 5: Homepage with latest issue and filterable archive

**Files:**
- Create: `js/filters.js`, `_includes/filter-chips.html`
- Modify: `index.html` (full replacement), `_layouts/default.html` (nav)
- Test: `tests/filters.test.mjs`; `tests/site.test.mjs` (append)

**Interfaces:**
- Consumes: `site.issues`, `site.data.taxonomy`, includes `subscribe.html`
- Produces:
  - `matches(tokens: string[], active: {group: value|null}) → boolean` (exported from `js/filters.js`)
  - DOM contract: container `[data-filter-root]`; buttons `[data-filter-group][data-filter-value]` (`""` = All); items `[data-filters="group:value group:value …"]`; optional `[data-filter-empty]`
  - Include `filter-chips.html` params: `label`, `group`, `items` (list of `{id,label}` objects or plain strings)

- [ ] **Step 1: Write the failing tests**

`tests/filters.test.mjs`:

```js
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
```

Append to `tests/site.test.mjs`:

```js
test('homepage shows the latest issue and an archive linking every issue', { skip }, () => {
  const html = page('index.html');
  assert.match(html, /data-filter-root/);
  assert.match(html, /href="\/grc-insights\/issues\/2026-05-field-notes\/"/);
  assert.match(html, /data-filters="[^"]*category:ai-governance/);
  assert.match(html, /class="latest-card"/);
});
```

Run: `npm test`
Expected: FAIL with `Cannot find module .../js/filters.js`.

- [ ] **Step 2: Implement `js/filters.js`**

```js
export function matches(tokens, active) {
  const set = new Set(tokens);
  return Object.entries(active).every(([group, value]) => !value || set.has(`${group}:${value}`));
}

if (typeof document !== 'undefined') {
  for (const root of document.querySelectorAll('[data-filter-root]')) {
    const active = {};
    const items = [...root.querySelectorAll('[data-filters]')];
    const empty = root.querySelector('[data-filter-empty]');
    root.addEventListener('click', event => {
      const button = event.target.closest('[data-filter-group]');
      if (!button) return;
      const group = button.dataset.filterGroup;
      active[group] = button.dataset.filterValue || null;
      for (const b of root.querySelectorAll(`[data-filter-group="${group}"]`)) {
        b.setAttribute('aria-pressed', String(b === button));
      }
      let shown = 0;
      for (const item of items) {
        const ok = matches(item.dataset.filters.trim().split(/\s+/), active);
        item.hidden = !ok;
        if (ok) shown += 1;
      }
      if (empty) empty.hidden = shown > 0;
    });
  }
}
```

- [ ] **Step 3: Create `_includes/filter-chips.html`**

```html
<div class="filter-row" role="group" aria-label="Filter by {{ include.label }}">
  <span class="filter-label">{{ include.label }}</span>
  <button type="button" class="chip" data-filter-group="{{ include.group }}" data-filter-value="" aria-pressed="true">All</button>
  {% for item in include.items %}{% assign id = item.id | default: item %}{% assign label = item.label | default: item %}
  <button type="button" class="chip" data-filter-group="{{ include.group }}" data-filter-value="{{ id }}" aria-pressed="false">{{ label }}</button>
  {% endfor %}
</div>
```

- [ ] **Step 4: Replace `index.html` and extend the nav**

`index.html` (full replacement; its old content now lives in Issue 0):

```html
---
layout: default
title: GRC Insights
description: A GRC practitioner's living notebook on how AI is evolving and how governance should adapt, covering privacy law, AI regulation and sector impact.
---
{% assign issues = site.issues | sort: 'date' | reverse %}
{% assign latest = issues | first %}
{% assign founding = site.issues | where: 'issue', 0 | first %}
<section class="hero">
  <div class="hero-inner">
    <div class="hero-tag">Living notebook · AI governance &amp; privacy</div>
    <h1>GRC <span>Insights</span></h1>
    <p class="hero-intro">How the AI world is evolving, and how governance should adapt. Privacy law, AI regulation and what they mean for tech, SaaS, cloud, hardware, banking and retail, from a practitioner who has to make it work.</p>
    <div class="author-row">
      <div class="author-avatar">SJ</div>
      <div class="author-info">
        <div class="name">{{ site.author.name }}</div>
        <div class="meta">{{ site.author.role }} · {{ site.author.location }}</div>
      </div>
    </div>
  </div>
</section>

<main class="content">
  <p class="section-label">Latest issue</p>
  {% assign latest_series = site.data.taxonomy.series | where: 'id', latest.series | first %}
  <a class="latest-card" href="{{ latest.url | relative_url }}">
    <span class="latest-meta">{{ latest_series.label }}{% if latest.issue > 0 %} · Issue {{ latest.issue }}{% endif %} · {{ latest.date | date: '%-d %B %Y' }}</span>
    <span class="latest-title">{{ latest.title }}</span>
    <span class="latest-desc">{{ latest.description }}</span>
  </a>

  {% if founding and founding.url != latest.url %}
  <p class="section-label">Where it started</p>
  <a class="latest-card" href="{{ founding.url | relative_url }}">
    <span class="latest-meta">Field Notes · {{ founding.date | date: '%B %Y' }}</span>
    <span class="latest-title">{{ founding.title }}</span>
    <span class="latest-desc">{{ founding.description }}</span>
  </a>
  {% endif %}

  <section id="archive" data-filter-root>
    <p class="section-label">All issues</p>
    {% include filter-chips.html label="Topic" group="category" items=site.data.taxonomy.categories %}
    {% assign standing = site.data.taxonomy.sectors | where: 'standing', true %}
    {% include filter-chips.html label="Sector" group="sector" items=standing %}
    {% include filter-chips.html label="Region" group="region" items=site.data.taxonomy.regions %}
    <ul class="archive-list">
      {% for issue in issues %}
      <li data-filters="{% for c in issue.categories %}category:{{ c }} {% endfor %}{% for s in issue.sectors %}sector:{{ s }} {% endfor %}{% for r in issue.regions %}region:{{ r }} {% endfor %}">
        <a href="{{ issue.url | relative_url }}">{{ issue.title }}</a>
        <span class="archive-meta">{{ issue.date | date: '%-d %b %Y' }}{% if issue.issue > 0 %} · Issue {{ issue.issue }}{% endif %}</span>
        <p class="muted">{{ issue.description }}</p>
      </li>
      {% endfor %}
    </ul>
    <p class="muted" data-filter-empty hidden>No issues match these filters yet.</p>
  </section>

  {% include subscribe.html %}
</main>
<script type="module" src="{{ '/js/filters.js' | relative_url }}"></script>
```

In `_layouts/default.html`, replace the nav line `<a href="{{ '/about/' | relative_url }}">About</a>` with:

```html
    <a href="{{ '/' | relative_url }}#archive">Issues</a>
    <a href="{{ '/about/' | relative_url }}">About</a>
```

- [ ] **Step 5: Run local tests**

Run: `npm test`
Expected: PASS (site tests skipped locally).

- [ ] **Step 6: Commit, push, watch CI**

```bash
git add index.html js/filters.js _includes/filter-chips.html _layouts/default.html tests
git commit -m "feat: homepage with latest issue, founding issue and filterable archive

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push
gh run watch "$(gh run list --branch design/live-notebook --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
```
Expected: CI passes.

---

### Task 6: Regulation Radar page and upcoming-dates strip

**Files:**
- Create: `radar.html`, `js/radar.js`, `_includes/radar-data.html`
- Modify: `index.html` (radar teaser), `_layouts/default.html` (nav)
- Test: `tests/radar.test.mjs`; `tests/site.test.mjs` (append)

**Interfaces:**
- Consumes: `site.data.tracker`, `site.data.taxonomy`, `js/filters.js`, include `filter-chips.html`
- Produces:
  - `upcomingDates(rows, todayIso, days = 90) → [{date, what, name, id, region}]` sorted ascending (exported from `js/radar.js`)
  - DOM contract: `<script type="application/json" id="radar-data" data-radar-url="…">` holds the tracker JSON; `<ul data-upcoming data-days="90" [data-limit="3"]>` gets filled
  - Radar rows have anchor `id="<tracker id>"`, so `/radar/#ca-qc-law25` deep-links

- [ ] **Step 1: Write the failing tests**

`tests/radar.test.mjs`:

```js
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
```

Append to `tests/site.test.mjs`:

```js
import { parse as parseYaml } from 'yaml';

test('radar page renders one row per tracker entry and embeds the data', { skip }, () => {
  const rows = parseYaml(readFileSync('_data/tracker.yml', 'utf8')) ?? [];
  const html = page('radar/index.html');
  assert.equal((html.match(/<tr id="/g) || []).length, rows.length);
  assert.match(html, /id="radar-data"/);
  assert.match(page('index.html'), /data-upcoming/);
  assert.match(page('index.html'), /href="\/grc-insights\/radar\/"/);
});
```

(Move that `import` line to the top of `tests/site.test.mjs` with the other imports.)

Run: `npm test`
Expected: FAIL with `Cannot find module .../js/radar.js`.

- [ ] **Step 2: Implement `js/radar.js`**

```js
function addDays(iso, days) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function upcomingDates(rows, todayIso, days = 90) {
  const end = addDays(todayIso, days);
  return rows
    .flatMap(r => (r.key_dates || []).map(k => ({ date: String(k.date), what: k.what, name: r.name, id: r.id, region: r.region })))
    .filter(x => x.date >= todayIso && x.date <= end)
    .sort((a, b) => a.date.localeCompare(b.date));
}

const escapeHtml = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function localToday() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

if (typeof document !== 'undefined') {
  const dataEl = document.getElementById('radar-data');
  if (dataEl) {
    const rows = JSON.parse(dataEl.textContent || '[]') || [];
    const radarUrl = dataEl.dataset.radarUrl;
    for (const list of document.querySelectorAll('[data-upcoming]')) {
      const days = Number(list.dataset.days || 90);
      const limit = Number(list.dataset.limit || 0) || Infinity;
      const items = upcomingDates(rows, localToday(), days).slice(0, limit);
      list.innerHTML = items.length
        ? items.map(x => `<li><time datetime="${x.date}">${x.date}</time><a href="${radarUrl}#${escapeHtml(x.id)}">${escapeHtml(x.name)}</a>: ${escapeHtml(x.what)}</li>`).join('')
        : `<li class="muted">Nothing scheduled in the next ${days} days.</li>`;
    }
  }
}
```

- [ ] **Step 3: Create `_includes/radar-data.html` and `radar.html`**

`_includes/radar-data.html`:

```html
<script type="application/json" id="radar-data" data-radar-url="{{ '/radar/' | relative_url }}">{{ site.data.tracker | jsonify }}</script>
<script type="module" src="{{ '/js/radar.js' | relative_url }}"></script>
```

`radar.html`:

```html
---
layout: default
title: Regulation Radar
permalink: /radar/
description: A living tracker of privacy and AI laws, regulations and standards across Canada, the US, EU/UK, APAC and India, with status, key dates and sector impact.
---
{% assign reviewed = site.data.tracker | map: 'last_reviewed' | sort | last %}
<section class="hero hero-compact">
  <div class="hero-inner">
    <div class="hero-tag">Living tracker{% if reviewed %} · Last reviewed {{ reviewed }}{% endif %}</div>
    <h1>Regulation <span>Radar</span></h1>
    <p class="hero-intro">Every privacy and AI law, rule and standard I'm watching, with status, key dates and who it hits. Each entry links to its primary source.</p>
  </div>
</section>

<main class="content content-wide">
  <p class="section-label">Coming up in the next 90 days</p>
  <ul class="upcoming" data-upcoming data-days="90"></ul>

  <section data-filter-root>
    <p class="section-label">Everything on the radar</p>
    {% include filter-chips.html label="Region" group="region" items=site.data.taxonomy.regions %}
    {% assign standing = site.data.taxonomy.sectors | where: 'standing', true %}
    {% include filter-chips.html label="Sector" group="sector" items=standing %}
    {% include filter-chips.html label="Status" group="status" items=site.data.taxonomy.tracker_statuses %}
    {% include filter-chips.html label="Relevance" group="relevance" items=site.data.taxonomy.relevance %}
    <div class="table-wrap">
      <table class="radar-table">
        <thead>
          <tr><th>Law / framework</th><th>Jurisdiction</th><th>Status</th><th>Key dates</th><th>Sectors</th><th>Relevance</th><th>What it is</th></tr>
        </thead>
        <tbody>
          {% assign rows = site.data.tracker | sort: 'region' %}
          {% for r in rows %}
          <tr id="{{ r.id }}" data-filters="region:{{ r.region }} status:{{ r.status }} relevance:{{ r.applies_to_me }}{% for s in r.sectors %} sector:{{ s }}{% endfor %}">
            <td><a href="{{ r.source }}" target="_blank" rel="noopener">{{ r.name }}</a><span class="radar-type">{{ r.type }}</span></td>
            <td>{{ r.jurisdiction }} <span class="muted">({{ r.region }})</span></td>
            <td><span class="status status-{{ r.status }}">{{ r.status }}</span></td>
            <td>{% for k in r.key_dates %}<div><time datetime="{{ k.date }}">{{ k.date }}</time> {{ k.what }}</div>{% endfor %}</td>
            <td>{{ r.sectors | join: ', ' }}</td>
            <td><span class="relevance relevance-{{ r.applies_to_me }}">{{ r.applies_to_me }}</span></td>
            <td>{{ r.summary }}<div class="muted">Reviewed {{ r.last_reviewed }}</div></td>
          </tr>
          {% endfor %}
        </tbody>
      </table>
    </div>
    <p class="muted" data-filter-empty hidden>No entries match these filters.</p>
  </section>
</main>
{% include radar-data.html %}
<script type="module" src="{{ '/js/filters.js' | relative_url }}"></script>
```

- [ ] **Step 4: Add the homepage teaser and nav link**

In `index.html`, insert immediately before `<section id="archive" data-filter-root>`:

```html
  <p class="section-label">On the radar</p>
  <ul class="upcoming" data-upcoming data-days="90" data-limit="3"></ul>
  <p><a class="chip" href="{{ '/radar/' | relative_url }}">Open the Regulation Radar →</a></p>

```

and before the final `<script type="module" src="{{ '/js/filters.js' | relative_url }}"></script>` line add:

```html
{% include radar-data.html %}
```

In `_layouts/default.html`, after the `Issues` nav link, add:

```html
    <a href="{{ '/radar/' | relative_url }}">Regulation Radar</a>
```

- [ ] **Step 5: Run local tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit, push, watch CI**

```bash
git add radar.html js/radar.js _includes/radar-data.html index.html _layouts/default.html tests
git commit -m "feat: Regulation Radar page with filters and upcoming-dates strip

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push
gh run watch "$(gh run list --branch design/live-notebook --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
```
Expected: CI passes, and the radar has 0 rows (seeded in Task 7).

---

### Task 7: Seed the Regulation Radar via deep-research

**Files:**
- Modify: `_data/tracker.yml`
- Test: existing `tests/repo.test.mjs` (validation) and the CI radar row count

**Interfaces:**
- Consumes: the tracker schema (Task 1 validator), taxonomy enums
- Produces: 25–40 verified rows that Issue 1+ and the radar page rely on

- [ ] **Step 1: Run deep-research (required: invoke the Skill tool with `anthropic-skills:deep-research`)**

Brief to pass as the skill's args, verbatim:

> Build a verified regulatory tracker as of 2026-10-07 for a GRC manager based in British Columbia, Canada, working across tech, product/SaaS, cloud, hardware, banking/FinServ and retail. For EACH item below, confirm from primary sources (legislature, official gazette/journal, regulator site): official name; jurisdiction; type (privacy-law | ai-law | sector-rule | standard | guidance); current status (proposed | passed | in-force | phasing-in | amended | lapsed | repealed); key dates (YYYY-MM-DD, with what happens on each, including dates in the next 12 months); affected sectors from that list; a one-line plain-English summary; and the best primary-source URL. Flag anything you could not confirm from a primary source. Also add any major privacy/AI law or regulator rule from 2025–2026 in these jurisdictions that is missing from the list.
>
> Canada: PIPEDA; status of federal privacy/AI reform after Bill C-27 lapsed (any successor bill); BC PIPA; BC FIPPA; Québec Law 25; Ontario Bill 194 (Strengthening Cyber Security and Building Trust in the Public Sector Act); Alberta PIPA reform; OSFI Guideline E-23 (model risk); OSFI Guideline B-13 (technology & cyber risk); Canada's Voluntary Code of Conduct on generative AI.
> United States: CCPA/CPRA incl. CPPA automated decision-making regulations; Colorado AI Act (SB 24-205) and its effective date; Texas Responsible AI Governance Act; Utah AI Policy Act; NYC Local Law 144; comprehensive state privacy laws (summarise as one row listing states and 2025–2027 effective dates); FTC AI-related enforcement posture; SEC cybersecurity disclosure rules; GLBA Safeguards Rule.
> EU: EU AI Act (all phase-in dates incl. GPAI and high-risk); GDPR (notable 2025–2026 enforcement trend); DORA; NIS2 transposition; EU Data Act; Cyber Resilience Act; any 2025–2026 "digital omnibus"/simplification changes affecting the above.
> UK: Data (Use and Access) Act 2025; UK approach to AI regulation (any bill).
> APAC: Singapore PDPA + Model AI Governance Framework; Australia Privacy Act reforms (tranche status); Japan AI Promotion Act; China AI-generated content labelling measures.
> India: DPDP Act 2023 and DPDP Rules (phased dates).
> Global standards: ISO/IEC 42001; ISO/IEC 27001:2022 transition; NIST AI RMF (incl. GenAI profile); NIST CSF 2.0; OECD AI Principles.

- [ ] **Step 2: Convert the report to `_data/tracker.yml` rows**

Rules:
- Each id is `<region-lowercase>-<short-kebab-name>` (e.g. `ca-qc-law25`, `eu-ai-act`, `us-co-ai-act`).
- Quote every date. `last_reviewed: "2026-10-07"`.
- `applies_to_me`: `high` for Canada federal, BC, and anything hitting SaaS/cloud vendors selling into Canada/US/EU; `medium` for other Tier 1–2 items; `watch` for Tier 3.
- Leave out any item the research could not confirm from a primary source, and list those in the commit message body.

Example row (shape only; values must come from the research):

```yaml
- id: ca-qc-law25
  name: "Québec Law 25 (Act to modernize legislative provisions as regards the protection of personal information)"
  region: CA
  jurisdiction: Québec
  type: privacy-law
  status: in-force
  key_dates:
    - { date: "2024-09-22", what: "Data portability right in force" }
  sectors: [tech, saas, cloud, banking, retail]
  applies_to_me: high
  summary: "Québec's private-sector privacy law: consent, PIAs, privacy officer, breach reporting."
  source: "https://www.legisquebec.gouv.qc.ca/en/document/cs/P-39.1"
  last_reviewed: "2026-10-07"
```

- [ ] **Step 3: Validate**

Run: `npm run validate && npm test`
Expected: `OK: content is valid`, and all tests pass.

- [ ] **Step 4: Commit, push, watch CI**

```bash
git add _data/tracker.yml
git commit -m "content: seed Regulation Radar from deep-research (verified 2026-10-07)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push
gh run watch "$(gh run list --branch design/live-notebook --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
```
Expected: CI passes, and the radar row count equals the number of tracker entries.

---

### Task 8: Social preview image and privacy-friendly analytics

**Files:**
- Create: `scripts/make_og_card.py`, `assets/og-card.png`
- Modify: `_config.yml` (default image), `_layouts/default.html` (GoatCounter snippet)
- Test: `tests/site.test.mjs` (append)

**Interfaces:**
- Consumes: `site.goatcounter`
- Produces: `og:image` on every page; the GoatCounter script only when `goatcounter` is set

- [ ] **Step 1: Write the failing site tests**

Append to `tests/site.test.mjs`:

```js
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
```

- [ ] **Step 2: Create the OG card generator and image**

`scripts/make_og_card.py`:

```python
"""Generate the default 1200x630 social preview image (assets/og-card.png)."""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
TOP, BOTTOM = (15, 23, 42), (30, 27, 75)
FONT = "/System/Library/Fonts/Helvetica.ttc"


def gradient():
    img = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)
    for y in range(H):
        t = y / (H - 1)
        draw.line([(0, y), (W, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(TOP, BOTTOM)))
    return img


def main(out: Path):
    img = gradient()
    draw = ImageDraw.Draw(img)
    draw.ellipse([W - 260, -140, W + 140, 260], fill=(36, 38, 70))
    tag = ImageFont.truetype(FONT, 30, index=1)
    title = ImageFont.truetype(FONT, 96, index=1)
    body = ImageFont.truetype(FONT, 38)
    draw.text((80, 110), "LIVING NOTEBOOK · AI GOVERNANCE & PRIVACY", font=tag, fill=(253, 164, 175))
    draw.text((80, 170), "GRC Insights", font=title, fill=(255, 255, 255))
    draw.text((80, 300), "How the AI world is evolving,", font=body, fill=(226, 232, 240))
    draw.text((80, 350), "and how governance should adapt.", font=body, fill=(226, 232, 240))
    draw.text((80, 520), "Surabhi Joshi · GRC · New Westminster, BC", font=tag, fill=(203, 213, 225))
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, optimize=True)


if __name__ == "__main__":
    main(Path(sys.argv[1] if len(sys.argv) > 1 else "assets/og-card.png"))
```

Run: `python3 -I scripts/make_og_card.py assets/og-card.png && sips -g pixelWidth -g pixelHeight assets/og-card.png`
Expected: `pixelWidth: 1200`, `pixelHeight: 630`. Open the PNG with the Read tool and check that the text is legible and doesn't overlap.

- [ ] **Step 3: Wire the image and analytics**

In `_config.yml`, replace the `defaults:` block with:

```yaml
defaults:
  - scope: { path: "" }
    values: { image: /assets/og-card.png }
  - scope: { path: "", type: issues }
    values: { layout: issue }
```

In `_layouts/default.html`, before `</head>`, add:

```html
  {% if site.goatcounter and site.goatcounter != "" %}<script data-goatcounter="https://{{ site.goatcounter }}.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>{% endif %}
```

- [ ] **Step 4: Commit, push, watch CI**

```bash
npm test
git add scripts/make_og_card.py assets/og-card.png _config.yml _layouts/default.html tests/site.test.mjs
git commit -m "feat: default social preview card and opt-in GoatCounter analytics

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push
gh run watch "$(gh run list --branch design/live-notebook --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
```
Expected: CI passes.

---

### Task 9: Routine prompt and templates

**Files:**
- Create: `routine/weekly-issue.md`, `routine/issue-template.md`, `routine/social-template.md`, `routine/pr-body-template.md`, `social/.gitkeep`
- Test: `tests/routine.test.mjs`

**Interfaces:**
- Consumes: `npm run plan-run`, `npm run validate`, `scripts/validate.mjs --verify-count`, `REQUIRED_SECTIONS`, branch format `issue/NN-YYYY-MM-DD-slug` (Task 2), labels `issue`/`radar` (created in Task 10)
- Produces: the prompt that Tasks 11–13 schedule

- [ ] **Step 1: Write the failing test**

`tests/routine.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { REQUIRED_SECTIONS } from '../scripts/validate.mjs';

const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

test('issue template has exactly the required sections in order', () => {
  const headings = read('routine/issue-template.md').split('\n').filter(l => l.startsWith('## '));
  assert.deepEqual(headings, REQUIRED_SECTIONS);
});

test('routine prompt enforces deep-research and validation', () => {
  const prompt = read('routine/weekly-issue.md');
  assert.match(prompt, /anthropic-skills:deep-research/);
  assert.match(prompt, /npm run validate/);
  assert.match(prompt, /scripts\/plan-run\.mjs/);
  assert.match(prompt, /Never push to `main`/);
});

test('PR body template carries the review checklist', () => {
  const body = read('routine/pr-body-template.md');
  for (const item of ['TL;DR works as a LinkedIn opener', '"My take" sounds like me', '⚠️ verify', 'Tracker changes look right', 'Social drafts reviewed']) {
    assert.ok(body.includes(item), item);
  }
});
```

Run: `npm test`
Expected: FAIL with `ENOENT ... routine/issue-template.md`.

- [ ] **Step 2: Create `routine/issue-template.md`**

```markdown
---
title: "<Specific, opinionated headline (≤ 90 chars)>"
issue: <nextIssue>
series: <series>
date: <today>
regions: [<ids from _data/taxonomy.yml>]
sectors: [<ids, only sectors actually affected>]
categories: [<ids>]
description: "<One-sentence hook, ≤ 200 chars. Doubles as LinkedIn opener.>"
---

## TL;DR

- <Bullet 1>
- <Bullet 2>
- <Bullet 3>

## What changed

**<Development 1>** (<Jurisdiction>, effective <YYYY-MM-DD>). <What happened, in 1–3 sentences.> [Source](<primary URL>)

**<Development 2>** …

> **This week:** <Catch-up issues only: anything new in the last 7 days, with links. Delete this line otherwise.>

## Sector lens

| Sector | What it means | What to do |
|---|---|---|
| <Sector label> | <impact> | <action> |

## My take

<150–250 words. A clear position on how governance should adapt. First person.>

## What to do now

- <Action 1>
- <Action 2>
- <Action 3>
- <Action 4>

## On the radar

- **<YYYY-MM-DD>**: <Law>: <what happens> ([Radar](/grc-insights/radar/#<tracker-id>))

## Sources

1. <Org>: [<Title>](<URL>)
```

- [ ] **Step 3: Create `routine/social-template.md`**

```markdown
# Social drafts: Issue <NN>: <title>

Issue URL: https://grc-with-sjo.github.io/grc-insights/issues/<file-name-without-extension>/
Suggested posting time: Tuesday or Wednesday, 08:00–09:00 PT. Surabhi posts manually.

## LinkedIn post (≤ 1,300 characters; no link in the body)

<Hook line from `description`.>

<3 short takeaways, one line each.>

<One line from "My take".>

<Question to invite comments.>

#AIGovernance #Privacy #GRC <1–2 topical tags>

## LinkedIn first comment

Full issue + sources: <Issue URL>

## LinkedIn carousel outline (catch-up and feature issues; export as PDF)

1. Cover: <title>
2. <Development 1 in one line>
3. <Development 2>
4. Sector lens: <the most-affected sector>
5. My take: <one sentence>
6. What to do now: <top 3 actions>
7. Follow for the next issue + Radar link

## LinkedIn newsletter edition

<Two-sentence intro, then paste the issue body. End with: "Originally published at <Issue URL>">

## X / Bluesky thread (5 posts, ≤ 280 chars each)

1/ <hook>
2/ <development 1>
3/ <development 2>
4/ <my take in one line>
5/ Full issue + sources: <Issue URL>

## Community summary (optional: only if it adds value; no link-dumping)

<3–4 sentence value-first summary for r/privacy, r/grc or an IAPP/ISACA chapter channel.>
```

- [ ] **Step 4: Create `routine/pr-body-template.md`**

```markdown
## Issue <NN> — <series label>: <theme>

Publishes when you merge (GitHub Pages rebuilds in about a minute).
Preview the Markdown: `_issues/<file>` in the **Files changed** tab.

### Review checklist
- [ ] TL;DR works as a LinkedIn opener
- [ ] "My take" sounds like me and I agree with it
- [ ] `⚠️ verify` items resolved (<verify_count> flagged)
- [ ] Tracker changes look right (see below)
- [ ] Social drafts reviewed (`social/issue-<NN>.md`)

### Tracker changes
| Row | Change |
|---|---|
| `<id>` | <added / status X → Y / new key date …> |

### Research notes
- Research: `anthropic-skills:deep-research`, window <windowStart> → <today>
- Left out (low confidence or no primary source): <list, or "none">
<If pendingCount > 0:> - ⚠️ <pendingCount> earlier issue PR(s) are still open. Merge or close them first so numbering and the research window stay right.

<Monthly issues only:>
### What worked last month
Paste the top 5 pages and top referrers from GoatCounter here, then decide whether to adjust topics.
```

- [ ] **Step 5: Create `routine/weekly-issue.md`**

````markdown
# GRC Insights: weekly routine

You prepare the next GRC Insights update for Surabhi Joshi to review in the repo
`grc-with-sjo/grc-insights`. You never publish: your output is a pull request that she reviews and merges.

## Hard rules

1. ALL research (news, regulatory status, dates, tracker verification) MUST go through the
   `anthropic-skills:deep-research` skill (invoke it with the Skill tool). Never add a factual or regulatory
   claim from your own memory. If the skill is unavailable, stop and report "deep-research unavailable".
   Do not fall back to unsourced drafting.
2. Every factual claim in the issue links to its source. Prefer primary sources (legislature, official
   journal/gazette, regulator) over news.
3. Anything you cannot tie to a primary source after a second deep-research check gets the literal marker
   `⚠️ verify` right after the claim.
4. No legal-advice framing.
5. Only touch `_issues/<new file>`, `_data/tracker.yml`, and `social/issue-<NN>.md`. Never edit layouts, CSS,
   JS, `sources.html`, or `_issues/2026-05-field-notes.html`.
6. Never push to `main`. Never merge. Never post to social media.

## Step 1: Plan

```bash
npm ci
PENDING=$(gh pr list --state open --json headRefName --jq '[.[].headRefName | select(startswith("issue/"))] | join(",")')
node scripts/plan-run.mjs --pending "$PENDING"
```

Keep `mode`, `today`, `nextIssue`, `windowStart`, `series`, `theme`, `feature`, `pendingCount` from the JSON.
(For a dry run only, a human may add `--today YYYY-MM-DD`.)

## Step 2: Research (deep-research)

### If `mode` is `issue`

Invoke `anthropic-skills:deep-research` with this brief, filling in the brackets from Step 1 and `_data/editorial.yml`:

> GRC Insights <series> issue. Theme: "<theme>"<, monthly feature sector: <feature>>.
> Window: developments from <windowStart> to <today>.
> Audience: GRC practitioners; author is a GRC manager in British Columbia, Canada.
> Jurisdiction tiers. Tier 1 (depth): Canada (federal, BC, Québec, Ontario, Alberta). Tier 2 (when material):
> US federal and states, EU, UK. Tier 3 (headline unless major): APAC (Singapore, Australia, Japan), India,
> global standards (ISO/IEC 42001 and 27001, NIST AI RMF, OECD).
> Sectors: tech, product/SaaS, cloud, hardware, banking/FinServ, retail (healthcare/public sector only if material).
> Start from: <sources.regulators>, <sources.standards>, <sources.trackers>.
> Re-check current status and key dates of these tracker rows: <id, name, status for rows whose region or
> sectors overlap the theme, plus every row with a key date within 90 days of <today>>.
> For each finding return: what happened; jurisdiction; key dates (YYYY-MM-DD); affected sectors; primary-source
> URL; optional secondary URL; confidence (high/medium/low).
> Also return: 3 evidence-backed arguments for how governance should adapt, and anything new in the last 7 days.

### If `mode` is `radar-check`

Invoke `anthropic-skills:deep-research` with a short brief: re-check every tracker row with a key date within
30 days of <today>, and look for any major new privacy/AI law, regulator rule or enforcement action since
<windowStart> in Tier 1–2 jurisdictions. If nothing material changed, STOP and report
"radar check: no changes, no PR". Otherwise skip to Step 4b.

## Step 3: Dedupe

Read `_data/tracker.yml` and every file in `_issues/`. Anything an earlier issue already covered appears only as a
status update ("Update: …"), not as new news. Drop low-confidence findings unless a primary source confirms them.

## Step 4a: Draft the issue

1. Create `_issues/<today>-<slug>.md` from `routine/issue-template.md`. The slug is 3–6 kebab-case words from the headline.
   Front matter: `issue: <nextIssue>`, `series: <series>`, `date: <today>`; regions/sectors/categories use ids from
   `_data/taxonomy.yml`; `description` is ≤ 200 chars.
2. Voice: read `_issues/2026-05-field-notes.html` and the `## My take` sections of the three most recent issues
   (they include Surabhi's edits). Write direct, practitioner-first prose with short declarative sentences and
   concrete actions. Use "programme" spelling as in Issue 0. Address the reader as a peer.
3. Content rules:
   - TL;DR: 3 bullets, 60 words or fewer in total.
   - What changed: 3–6 items; catch-up issues end with the "This week" blockquote.
   - Sector lens: only affected sectors.
   - My take: 150–250 words with a clear position.
   - What to do now: 4–5 actions.
   - On the radar: dates within 90 days of <today> from the tracker.
   - Sources: numbered list of every URL cited.
4. Tracker: update changed rows (status, key_dates, summary, source) and add new rows. Quote all dates, and set
   `last_reviewed: "<today>"` on every row you re-checked.
5. Social: create `social/issue-<NN>.md` from `routine/social-template.md` (NN = nextIssue, zero-padded to 2).

## Step 4b: Radar-only update (radar-check with changes)

Update `_data/tracker.yml` only, following the tracker rule in Step 4a.4.

## Step 5: Self-check

```bash
npm run validate
npm test
```

Fix every error and re-run until both pass. For every factual sentence without a link, run one more targeted
deep-research query. If it is still unconfirmed, add `⚠️ verify`. Get the count:
`node scripts/validate.mjs --verify-count _issues/<file>`.

## Step 6: Open the PR

Issue:

```bash
BRANCH="issue/<NN>-<today>-<slug>"
git switch -c "$BRANCH"
git add "_issues/<file>" _data/tracker.yml "social/issue-<NN>.md"
git commit -m "Issue <NN> — <series label>: <theme>"
git push -u origin "$BRANCH"
gh pr create --base main --head "$BRANCH" --label issue \
  --title "Issue <NN> — <series label>: <theme>" --body-file /tmp/pr-body.md
```

Write `/tmp/pr-body.md` from `routine/pr-body-template.md` first, filling every bracket. Series labels come from
`_data/taxonomy.yml`.

Radar-only: branch `radar/<today>`, commit only `_data/tracker.yml`, label `radar`, title
`Radar update — <today>`, and a body with just the "Tracker changes" table and research notes.

## Step 7: Report

End with one short paragraph: the mode, PR URL (or "no PR"), number of `⚠️ verify` flags, and any problems.
````

```bash
mkdir -p social && touch social/.gitkeep
```

- [ ] **Step 6: Run tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Commit, push, watch CI**

```bash
git add routine social/.gitkeep tests/routine.test.mjs
git commit -m "feat: weekly routine prompt with deep-research rule, issue/social/PR templates

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push
gh run watch "$(gh run list --branch design/live-notebook --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
```
Expected: CI passes.

---

### Task 10: Setup guide and launch (Surabhi merges)

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: everything above
- Produces: the live site on `main`, and the `issue` and `radar` labels

- [ ] **Step 1: Create `README.md`**

````markdown
# GRC Insights

Living notebook by Surabhi Joshi: https://grc-with-sjo.github.io/grc-insights/

## How publishing works

1. A scheduled routine (Sundays, 18:00 Vancouver) follows `routine/weekly-issue.md`. It researches with
   `anthropic-skills:deep-research`, drafts the issue, updates the Radar, and opens a PR labelled `issue`
   (or `radar` for tracker-only updates).
2. You review the PR using its checklist and edit in GitHub's web editor if needed.
3. Merge = publish. GitHub Pages rebuilds in about a minute.
4. Post the drafts from `social/issue-NN.md` yourself.

## Changing the cadence or calendar

Edit `_data/editorial.yml`:
- `cadence: weekly` publishes every Sunday; `cadence: monthly` (default) publishes on the first Sunday of
  each month from `monthly_start`.
- Calendar entries always publish on their date with their theme.

## One-time setup

1. **Claude GitHub app.** Install it on `grc-with-sjo/grc-insights` with permission to push branches and open PRs
   (needed for the cloud routine).
2. **GoatCounter.** Create a free site at https://www.goatcounter.com, set `goatcounter: "<code>"` in
   `_config.yml`, and merge.
3. **Google Search Console.** Add the URL-prefix property `https://grc-with-sjo.github.io/grc-insights/`,
   verify it with the HTML-tag method (add the tag via a PR), then submit `sitemap.xml`.
4. **LinkedIn newsletter (optional).** Create it, then set `linkedin_newsletter: "<URL>"` in `_config.yml`.
5. **GitHub Pages.** Keep Settings → Pages → "Deploy from a branch", `main` / root.
6. **LinkedIn profile.** Add the Regulation Radar (`/radar/`) to Featured.

## Local checks

```bash
npm ci
npm run validate
npm test
```

Full site build checks run in GitHub Actions (`.github/workflows/check.yml`).
````

- [ ] **Step 2: Commit and push**

```bash
git add README.md
git commit -m "docs: setup and operating guide

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push
```

- [ ] **Step 3: Ask Surabhi before creating labels and the launch PR**

Ask in chat: "OK to create the `issue` and `radar` labels and open the launch PR from `design/live-notebook` to `main`?" On a yes:

```bash
gh label create issue --color C2185B --description "Draft newsletter issue for review" || true
gh label create radar --color 00796B --description "Regulation Radar tracker-only update" || true
gh pr create --base main --head design/live-notebook \
  --title "Launch GRC Insights living notebook" \
  --body "Jekyll site with Issue 0, archive, Regulation Radar, RSS/SEO, CI checks and the weekly routine prompt. Spec: docs/superpowers/specs/2026-10-07-grc-insights-live-notebook-design.md. Please check the About page's AI-assisted 'Method' sentence before merging.

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```

Then follow the ccd_pr flow (`get_status`, and `bind_pr` if needed). **Do not merge.** Surabhi reviews and merges.

- [ ] **Step 4: Verify the live site after Surabhi merges**

```bash
for p in "" "issues/2026-05-field-notes/" "sources.html" "radar/" "about/" "feed.xml" "sitemap.xml"; do
  printf "%s " "$p"; curl -s -o /dev/null -w "%{http_code}\n" "https://grc-with-sjo.github.io/grc-insights/$p"
done
```
Expected: `200` for every path (allow about 2 minutes after the merge for the Pages build).

---

### Task 11: Probe routine capabilities (deep-research in the cloud)

**Files:** none (decision is recorded in the spec's section 5, "Runner")

- [ ] **Step 1: Ask Surabhi before creating a cloud run**

Ask in chat: "OK to run a one-off cloud routine to test whether deep-research, `gh`, and git push work there? It only opens a throwaway branch, which it deletes afterwards."

- [ ] **Step 2: Create a one-off cloud run with the `schedule` skill**

Invoke the `schedule` skill to create a **one-time** cloud routine on `grc-with-sjo/grc-insights` with this prompt:

> Capability probe. Do not change any content.
> 1. Report whether the Skill tool lists `anthropic-skills:deep-research`. Invoke it with the brief "One paragraph: current legal status of Québec Law 25, citing the primary source URL." Report whether it ran, and whether it fanned out to research subagents.
> 2. Run `node -v`, `npm -v`, `gh auth status`, and `gh pr list --limit 1`, and report the results.
> 3. Run `git switch -c probe/delete-me && git commit --allow-empty -m probe && git push -u origin probe/delete-me && git push origin --delete probe/delete-me`, and report success or failure.
> 4. End with a table: capability | works? | notes.

- [ ] **Step 3: Decide the runner**

- All four capabilities work → **cloud routine** (Task 13, option A).
- deep-research is missing or failing → **desktop scheduled task** (Task 13, option B). Tell Surabhi that runs need the Mac awake on Sunday evenings.
- Only `gh` is missing → stay on cloud, but replace the `gh` calls in `routine/weekly-issue.md` with whatever PR-opening mechanism the probe reported as available. Commit that change via a small PR.

Record the decision in the spec under section 5 "Runner" (one line, with date), commit on a branch, and open a PR that Surabhi merges.

---

### Task 12: Dry run, Issue 1 (Canada catch-up)

**Files:**
- Produced by the routine: `_issues/2026-10-18-<slug>.md`, `_data/tracker.yml`, `social/issue-01.md`

- [ ] **Step 1: Run the routine prompt in a session, using the chosen runner's environment**

From an up-to-date `main` checkout, follow `routine/weekly-issue.md` exactly, with one change in Step 1:
`node scripts/plan-run.mjs --pending "$PENDING" --today 2026-10-18`.
Expected plan JSON: `"mode": "issue"`, `"series": "catch-up"`, `"nextIssue": 1`, `"windowStart": "2026-05-01"`.

- [ ] **Step 2: Confirm the PR**

```bash
gh pr list --label issue --json number,title,headRefName,url
gh run watch "$(gh run list --branch "$(gh pr list --label issue --json headRefName --jq '.[0].headRefName')" --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
```
Expected: one PR titled `Issue 01 — Catch-up series: Canada privacy & AI…` (or `Issue 1 — …`), and CI passes.

- [ ] **Step 3: Hand to Surabhi**

Send her the PR link and ask for feedback on voice, length and structure. Feed any template or voice changes back into `routine/issue-template.md` and `routine/weekly-issue.md` through a separate small PR. Because Issue 1 now exists for 2026-10-18 (pending or merged), the scheduled run that day will do a radar check instead of a duplicate (see `planRun`).

---

### Task 13: Schedule the weekly routine

**Files:** none in the repo

- [ ] **Step 1: Ask Surabhi before creating the schedule**

Ask in chat: "OK to create the weekly routine: Sundays 18:00 Vancouver, following `routine/weekly-issue.md`?"

- [ ] **Step 2A (cloud runner): create it with the `schedule` skill**

Create a recurring cloud routine on `grc-with-sjo/grc-insights`:
- Schedule: Sundays 18:00 America/Vancouver. If the scheduler only takes UTC cron, use `0 2 * * 1` (Monday 02:00 UTC = Sunday 18:00 PST / 19:00 PDT). `plan-run` computes the date in Vancouver time, so either is safe.
- Prompt: `Follow routine/weekly-issue.md in this repository exactly. It is your complete instruction set.`

- [ ] **Step 2B (desktop runner): create it with the scheduled-tasks tool**

Load `mcp__scheduled-tasks__create_scheduled_task` via ToolSearch, then create a weekly task: Sundays 18:00 local time, working directory `~/projects/grc-insights`. The prompt is `git switch main && git pull --ff-only`, then `Follow routine/weekly-issue.md exactly.`

- [ ] **Step 3: Confirm**

List the routine or scheduled task and report to Surabhi: the next run time (2026-10-18 18:00 PT), which runner was used, and that on 10-18 it will do a radar check because Issue 1 already exists.
