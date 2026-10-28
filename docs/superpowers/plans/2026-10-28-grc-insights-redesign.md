# GRC Insights Redesign (Mix 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved "Mix 1" look to every page of the GRC Insights site (homepage, issues incl. Field Notes, area pages, Regulation Radar, About, sources) and restyle every link-preview card, with a local preview so Surabhi approves before anything goes live.

**Architecture:** Jekyll on GitHub Pages (legacy build, Jekyll 3.10). One rewritten stylesheet built on CSS custom properties; shared includes for the post card, brand art and cover image; a new `area` layout fed by `_data/areas.yml`. Link-preview PNGs come from Python/Pillow scripts sharing one palette module. No local Jekyll: CI builds `_site` and uploads it as an artifact that a script downloads for local preview.

**Tech Stack:** Jekyll 3.10 / Liquid, HTML, CSS, vanilla JS (existing `filters.js`, `radar.js`), Node 20 `node:test` + `yaml`, Python 3 + Pillow, GitHub Actions, `gh`.

**Spec:** `docs/superpowers/specs/2026-10-28-grc-insights-v2-design.md` (§8 Look and feel; §13 delivery order). Mockup: `.superpowers/brainstorm/40901-1793199849/content/mix-v4.html`, "Mix 1".

## Global Constraints

- Colours, verbatim from §8: canvas `#FBFAF7`, ink `#13202B`, muted text `#3D4B57`, hairlines `#E7E2D9`, deep teal `#0E4A57` (buttons, chips, "Latest" band), amber `#F2B544` + ink diamond pattern (brand art, fallback card image, OG cards), amber-brown `#B7791F` (type labels). Card surface `#FBF6EC` (mockup). Coral is dropped.
- Type: Fraunces (headlines, wordmark) + Inter (UI and body), Google Fonts. Caveat and Nunito are removed.
- Images: topic-related only (people, laptops, relevant objects; never landscapes/scenery); free-licence sources (Unsplash) with visible credit; no AI-generated images of people; brand pattern when no honest photo fits.
- Existing URLs keep working: `/`, `/issues/<name>/`, `/radar/`, `/about/`, `/sources.html`, `/feed.xml`.
- Carry-over rules (spec §10): † rendering of `⚠️ verify`, footer disclaimer text, author line "GRC & AI Governance Practitioner · Vancouver, BC", nothing goes live before Surabhi approves previews in date order.
- Mobile: works at 375px wide with a 16px side gutter and no horizontal page scroll (wide tables scroll inside their own container).
- Every internal href/src uses `relative_url` (existing site test enforces it).
- Nav never links to a page that doesn't exist yet (Essays and Notes arrive in Project 2).
- Commits end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`; PRs end with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.

## Review Focus

1. A phone at 375px: no horizontal scroll on any page; hero headline and cards readable. → Task 10 checks every page at 375px in the preview.
2. An issue with no `cover`: shows the brand pattern, never a broken image. → Task 3 site test.
3. A future-dated issue: never appears on the homepage, an area page or the feed before its date. → Task 5 site test (homepage/feed already tested).
4. A very long title: wraps to at most 3 lines on cards and link-preview images without overflowing. → Task 8 card test; Task 4 CSS clamp.
5. Legacy markup (Issue 0's trend cards, `sources.html`) stays readable in the new palette. → Task 7 site tests plus the Task 10 preview.

---

### Task 1: Previewable CI build

**Files:**
- Modify: `.github/workflows/check.yml`
- Create: `scripts/preview-site.sh`

**Interfaces:**
- Produces: `bash scripts/preview-site.sh <branch> [port]` → downloads the newest successful `site` artifact for `<branch>` into `.superpowers/preview/<branch>/` and serves it at `http://127.0.0.1:<port>/grc-insights/` (default 4000). Used by Task 10.

- [ ] **Step 1:** Add an `actions/upload-artifact@v4` step after the Jekyll build in `check.yml`: `name: site`, `path: _site`, `retention-days: 7`.
- [ ] **Step 2:** Write `scripts/preview-site.sh`: `gh run list --branch "$1" --workflow check.yml --status success --limit 1` → `gh run download <id> -n site -D <dir>/grc-insights` → `python3 -m http.server <port> -d <dir>`. Fail with a clear message if no successful run exists.
- [ ] **Step 3:** Push the branch and run `bash scripts/preview-site.sh <branch>`. Expected: `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4000/grc-insights/` prints `200`.
- [ ] **Step 4:** Commit: `ci: upload built site and add local preview script`.

### Task 2: Design tokens, fonts and site chrome

**Files:**
- Modify: `css/style.css` (rewrite foundation sections; legacy sections are restyled in Task 7), `_layouts/default.html`, `_config.yml`
- Test: `tests/site.test.mjs`

**Interfaces:**
- Produces CSS custom properties used by every later task: `--canvas --ink --muted --line --teal --amber --label --card` (values per Global Constraints), `--serif: 'Fraunces', Georgia, serif`, `--sans: 'Inter', system-ui, sans-serif`.
- Produces classes: `.site-nav` (kept), `.brand`, `.btn`, `.btn--secondary`, `.chip`, `.kicker`, `.container` (max-width 1120px, 32px padding, 16px under 600px), `.page-footer` (kept).
- Produces config key `substack_url` (string, default `""`): when empty, Substack buttons are not rendered.

- [ ] **Step 1: Write failing site tests**

```js
test('pages load Fraunces and Inter, not the old fonts', { skip }, () => {
  const html = page('index.html');
  assert.match(html, /fonts\.googleapis\.com\/css2\?family=Fraunces[^"]*family=Inter/);
  assert.doesNotMatch(html, /Caveat|Nunito/);
});
test('nav offers Issues, Regulation Radar and About, with the Fraunces wordmark', { skip }, () => {
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
```

- [ ] **Step 2:** Push; CI fails on the three new tests (site tests run only in CI).
- [ ] **Step 3:** In `default.html`, replace the Caveat/Nunito font link with `family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800`; nav = brand wordmark + Issues (`/#archive`) + Regulation Radar + About + a teal `.btn` "Subscribe" pointing to `site.substack_url` if set, else to `site.author.url` labelled "Follow on LinkedIn". Footer text unchanged. Add `substack_url: ""` to `_config.yml`.
- [ ] **Step 4:** Rewrite the foundation of `css/style.css`: `:root` tokens; `body { background: var(--canvas); color: var(--ink); font-family: var(--sans) }`; headings use `--serif`; nav, buttons, chips, kicker, container, footer per mockup; `@media (max-width: 600px)` gutter 16px; `html, body { overflow-x: hidden }` is NOT allowed (fix overflow at its source instead).
- [ ] **Step 5:** `npm test` locally (non-site tests pass), push, CI green.
- [ ] **Step 6:** Commit: `feat(design): Mix 1 tokens, fonts and site chrome`.

### Task 3: Covers, brand art and the post card

**Files:**
- Create: `_includes/brand-art.html`, `_includes/cover.html`, `_includes/post-card.html`
- Modify: `scripts/validate.mjs`, `tests/validate.test.mjs`, `tests/site.test.mjs`, `css/style.css`

**Interfaces:**
- Front matter (optional on issues): `cover` (site path or https URL), `cover_alt` (string), `cover_credit` (string, e.g. "Photo: Name / Unsplash"), `cover_credit_url` (https URL).
- `validateIssue` adds: if `cover` is present then `cover_alt`, `cover_credit`, `cover_credit_url` are required non-empty strings; otherwise no error.
- `{% include brand-art.html class="..." %}` → `<div class="brand-art {{ include.class }}" role="img" aria-label="GRC Insights pattern"></div>` (CSS: amber `#F2B544` + ink diamond pattern from the mockup's `.artA`).
- `{% include cover.html post=page %}` → `<figure class="cover">` with `<img>` + `<figcaption>` credit link, or brand art when no `cover`.
- `{% include post-card.html post=issue %}` → `<a class="post-card" href>` with image area (cover or brand art), type label (`Field Notes` for `series: field-notes`, else `Issue N`), title, area line (category labels from taxonomy, max 2), date.

- [ ] **Step 1: Write failing tests**

```js
// tests/validate.test.mjs
test('cover requires alt text and credit', () => {
  const errs = validateIssue(issue({ cover: '/assets/covers/x.jpg' }), tax);
  assert.ok(errs.some(e => e.includes('cover_alt')));
  assert.ok(errs.some(e => e.includes('cover_credit')));
  assert.deepEqual(validateIssue(issue({ cover: '/assets/covers/x.jpg', cover_alt: 'A padlock on a laptop',
    cover_credit: 'Photo: A / Unsplash', cover_credit_url: 'https://unsplash.com/photos/x' }), tax), []);
});
// tests/site.test.mjs
test('every homepage card shows a cover image or the brand pattern, never nothing', { skip }, () => {
  const cards = page('index.html').match(/<a class="post-card"[\s\S]*?<\/a>/g) || [];
  assert.ok(cards.length >= 1);
  for (const c of cards) assert.ok(/<img [^>]*src="[^"]+"/.test(c) || c.includes('class="brand-art'), c.slice(0, 120));
});
```

- [ ] **Step 2:** `npm test` → the validator test fails; push → the site test fails.
- [ ] **Step 3:** Implement the validator rule and the three includes; add `.post-card`, `.cover`, `.brand-art` CSS (card surface `--card`, 12px radius, soft shadow, image 16:9 with `object-fit: cover`, title in `--serif` clamped to 3 lines).
- [ ] **Step 4:** `npm test` passes locally; CI green after Task 4 uses the card on the homepage.
- [ ] **Step 5:** Commit: `feat(design): covers, brand art and post card`.

### Task 4: Homepage

**Files:**
- Modify: `index.html`, `css/style.css`, `tests/site.test.mjs`

**Interfaces:**
- Consumes: `post-card.html`, `brand-art.html` (Task 3); `_data/areas.yml` (Task 5; add a one-line placeholder file in this task if Task 5 hasn't landed, then Task 5 fills it).

- [ ] **Step 1: Failing site test**

```js
test('homepage hero, latest band, areas and radar strip', { skip }, () => {
  const html = page('index.html');
  assert.match(html, /Digital trust, decoded/);
  assert.match(html, /Independent thinking on AI, privacy &amp; cyber risk\./);
  assert.match(html, /class="latest-band"/);
  assert.match(html, /href="\/grc-insights\/areas\/ai-governance\/"/);
  assert.match(html, /data-upcoming/);
  assert.match(html, /data-filter-root/);           // archive kept
  assert.match(html, /class="latest-card"/);         // kept for existing test; may wrap the featured card
});
```

- [ ] **Step 2:** Push; the test fails.
- [ ] **Step 3:** Rebuild `index.html` in this order (copy verbatim from mockup Mix 1):
  - Hero: chip "DIGITAL TRUST, DECODED"; H1 "Independent thinking on AI, privacy & cyber risk."; lede "Field notes by Surabhi Joshi, a GRC practitioner in Vancouver. What's changing, what it means, and what I'd do next."; buttons (Substack if set, Follow on LinkedIn); brand art.
  - Credibility markers (from the About bio): over a decade in compliance, technology and risk; SOC 2 · ISO 27001 · SOX-ICFR; GDPR · CCPA · PIPEDA · FOIPPA; Vancouver, BC · views are my own.
  - "Latest" deep-teal band (`.latest-band`) with the 3 newest published issues as post cards.
  - Featured: the newest published issue, as a large `.latest-card`.
  - Areas: one card per entry in `_data/areas.yml` linking `/areas/<id>/`.
  - Radar strip: `<ul class="upcoming" data-upcoming data-days="90" data-limit="3">` + "Regulation Radar →".
  - Archive with the existing filters and `data-filters` tokens, unchanged in behaviour.
  - Published-only filter stays: `where_exp: "i", "i.date <= site.time"`.
- [ ] **Step 4:** CI green.
- [ ] **Step 5:** Commit: `feat(design): Mix 1 homepage`.

### Task 5: Area pages

**Files:**
- Create: `_data/areas.yml`, `_layouts/area.html`, `areas/ai-governance.html`, `areas/privacy.html`, `areas/cybersecurity.html`
- Modify: `tests/site.test.mjs`, `css/style.css`

**Interfaces:**
- `_data/areas.yml`: list of `{ id, label, intro, categories: [taxonomy category ids] }`. Values: `ai-governance` → `[ai-governance]`; `privacy` → `[privacy-law]`; `cybersecurity` → `[cybersecurity, frameworks]`. Intros are one plain sentence each; Climate is NOT added (spec non-goal).
- Area page front matter: `layout: area`, `area: <id>`, `permalink: /areas/<id>/`, `title`, `description`.
- Layout lists published issues (`i.date <= site.time`) whose `categories` intersect the area's categories, newest first, as post cards; empty state "No posts in this area yet."; links to the Radar. (The spec's per-area Radar slice needs an `areas` field on tracker rows; that arrives with the scout in Project 2, so this task links to the full Radar instead.)

- [ ] **Step 1: Failing site tests**

```js
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
```

- [ ] **Step 2:** Push; fails.
- [ ] **Step 3:** Implement data, layout and the three pages.
- [ ] **Step 4:** CI green.
- [ ] **Step 5:** Commit: `feat(design): area pages for AI governance, privacy and cybersecurity`.

### Task 6: Issue page

**Files:**
- Modify: `_layouts/issue.html`, `css/style.css`, `tests/site.test.mjs`

**Interfaces:**
- Consumes `cover.html` (Task 3).
- Reading time: `{{ content | number_of_words | divided_by: 200 | at_least: 1 }} min read`.

- [ ] **Step 1: Failing site test**

```js
test('issue pages show kicker, Fraunces title, author line, cover and reading time', { skip }, () => {
  const html = page('issues/2026-10-11-canada-regulators-write-ai-rules/index.html');
  assert.match(html, /class="kicker"[^>]*>[^<]*Issue 1/);
  assert.match(html, /GRC &amp; AI Governance Practitioner · Vancouver, BC/);
  assert.match(html, /<figure class="cover"|class="brand-art/);
  assert.match(html, /\d+ min read/);
  assert.match(html, /class="unconfirmed"/);   // † rendering intact
});
```

- [ ] **Step 2:** Push; fails.
- [ ] **Step 3:** Light hero (no dark band): kicker (series · Issue N · date, existing date formats), H1 (Fraunces), dek, author row, area chips, reading time; cover below hero; body in a 720px measure with Fraunces `h2`/`h3`, Inter body 18px/1.7, styled tables, blockquote, `**Takeaway:**`/`**Open question:**` paragraphs unchanged in markup; share/subscribe/about blocks restyled.
- [ ] **Step 4:** CI green (existing Issue 0 test "Field Notes · May 2026" must still pass).
- [ ] **Step 5:** Commit: `feat(design): Mix 1 issue page`.

### Task 7: Radar, About, Issue 0 legacy and sources

**Files:**
- Modify: `radar.html`, `about.html`, `css/style.css` (legacy `.trend-card`, `.takeaway`, `.sources-link-*`, `.about*` sections), `sources.html` (inline `<style>` only if needed), `tests/site.test.mjs`

- [ ] **Step 1: Failing site test**

```js
test('legacy pages use the new palette and fonts', { skip }, () => {
  assert.doesNotMatch(readFileSync('css/style.css', 'utf8'), /Caveat|Nunito|--rose\b/);
  const s = page('sources.html');
  assert.match(s, /css\/style\.css/);
  assert.doesNotMatch(s, /Caveat|Nunito/);
});
```

- [ ] **Step 2:** Push; fails.
- [ ] **Step 3:** Radar: light hero with kicker "Living tracker · Last reviewed …", H1 "Regulation Radar", table in `.table-wrap` (scrolls inside on mobile), status/relevance badges in teal/amber/neutral. About: same light hero, prose, LinkedIn button as `.btn`. Issue 0 trend cards: cream cards with a teal top rule, Fraunces titles; remove the old colour variants. `sources.html`: swap its Google Fonts link to Fraunces + Inter and its inline colours to tokens; content untouched (legacy word-for-word test).
- [ ] **Step 4:** CI green (existing Issue 0 and sources tests still pass).
- [ ] **Step 5:** Commit: `feat(design): restyle Radar, About, Field Notes and sources`.

### Task 8: Link-preview cards in the new style

**Files:**
- Create: `scripts/cards_style.py`, `tests/test_cards.py`
- Modify: `scripts/make_og_cards.py`, `scripts/make_radar_card.py`, `scripts/make_og_card.py`, `_config.yml` (default image), `radar.html`, `about.html`, all `_issues/*` `image:` lines
- Output: `assets/og-v2/*.png` (new folder so LinkedIn and others fetch fresh images; old `assets/og*` files stay so old shares still resolve)

**Interfaces:**
- `cards_style.py`: constants `CANVAS, INK, TEAL, AMBER, LABEL` (spec hex), `SERIF = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"` (closest installed serif to Fraunces), `SANS = "/System/Library/Fonts/Helvetica.ttc"`; functions `canvas() -> (Image, ImageDraw)` (ink background with an amber diamond band on the right), `wrap_title(draw, text, max_width, sizes=(68,60,54,48), max_lines=3) -> (font, lines)`.
- `make_og_cards.py` writes `assets/og-v2/<issue-stem>.png`, `assets/og-v2/about.png`, `assets/og-v2/home.png`; sets each issue's `image:` to `/assets/og-v2/<stem>.png` (replacing an existing `/assets/og/` value).

- [ ] **Step 1: Failing test** (`python3 -m unittest tests/test_cards.py`)

```python
def test_long_title_wraps_to_three_lines_max(self):
    img, draw = canvas()
    font, lines = wrap_title(draw, "word " * 60, 1000)
    self.assertLessEqual(len(lines), 3)
    self.assertTrue(all(draw.textlength(l, font=font) <= 1000 for l in lines))
def test_generated_cards_are_1200x630(self):
    for p in Path("assets/og-v2").glob("*.png"):
        self.assertEqual(Image.open(p).size, (1200, 630))
```

- [ ] **Step 2:** Run; fails (module missing).
- [ ] **Step 3:** Implement `cards_style.py`; refactor the three scripts onto it; regenerate all cards; update `image:` lines, `_config.yml` default image `/assets/og-v2/home.png`, Radar `/assets/og-v2/radar.png`, About `/assets/og-v2/about.png`. Update the existing site test that expects `assets/og-card.png` on the homepage to expect `og-v2/home.png`.
- [ ] **Step 4:** Tests pass; open each PNG and check it visually (title legible, no overlap with the pattern).
- [ ] **Step 5:** Commit: `feat(design): Mix 1 link-preview cards (og-v2)`.

### Task 9: Cover photos for existing issues

**Files:**
- Modify: `_issues/2026-10-11-canada-regulators-write-ai-rules.md`, `_issues/2026-11-22-cyber-deadlines-slip-assurance-travels.md`, `_issues/2026-10-18-europe-delayed-ai-rules-not-enforcement.md` (front matter only); Field Notes keeps the brand pattern.
- Create: `assets/covers/<issue-stem>.jpg` (downloaded, 1600px wide max, ≤300 KB)

- [ ] **Step 1:** In a session with the browser pane, pick one Unsplash photo per issue under the image rules (Canada: people reviewing documents or a laptop with a privacy/consent theme; Cyber: padlock/laptop/security object; EU: EU flags or EU institution with people/objects, no scenery). Record photographer, photo URL.
- [ ] **Step 2:** Download (with Surabhi's OK for each file, per download rules) to `assets/covers/`, resize with `sips -Z 1600`, set `cover`, `cover_alt`, `cover_credit` ("Photo: <name> / Unsplash"), `cover_credit_url`.
- [ ] **Step 3:** `npm run validate && npm test` pass.
- [ ] **Step 4:** Commit: `content: topic cover photos for Issues 1–3`.

### Task 10: Preview, approval and publish

- [ ] **Step 1:** Push the branch; wait for green CI; `bash scripts/preview-site.sh <branch>`.
- [ ] **Step 2:** Open in the browser pane, in this order: homepage, Field Notes, Issue 1, Issue 2, Issue 3, the three area pages, Radar, About, sources. For each: desktop width, then `resize_window` preset `mobile` (375px) and confirm `document.documentElement.scrollWidth <= window.innerWidth`. Send Surabhi a phone-friendly screenshot set and list any issue found.
- [ ] **Step 3:** Fix anything she or the check flags (each fix: test if automatable, commit).
- [ ] **Step 4:** On her explicit "publish": open the PR, merge after CI, confirm live pages return 200 and serve `og-v2` images; tell her to run linkedin.com/post-inspector on any link she has already shared.
