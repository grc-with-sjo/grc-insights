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
