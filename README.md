# GRC Insights

Living notebook by Surabhi Joshi: https://grc-with-sjo.github.io/grc-insights/

## How publishing works

1. A scheduled routine (Sundays, 18:00 Vancouver) follows `routine/weekly-issue.md`. It researches with
   `anthropic-skills:deep-research`, drafts the issue, updates the Radar, and opens a PR labelled `issue`
   (or `radar` for tracker-only updates).
2. You review the PR using its checklist and edit in GitHub's web editor if needed.
3. Merge = publish, on the issue's `date`. Issues dated in the future stay hidden; a nightly workflow (`.github/workflows/scheduled-publish.yml`, 00:05 PT) rebuilds the site so each issue appears on its date.
4. The Syndicate workflow posts the reviewed drafts from `social/issue-NN.md` to LinkedIn, Bluesky and Mastodon on the
   dates in `social/linkedin-schedule.md`, and opens a GitHub issue reminding you to import into Medium and post a
   shortened Substack edition. See `social/syndication.md`.

## Pre-release guardrail

Every day at 12:00 PT a scheduled task follows `routine/prerelease-check.md`. It re-checks, with deep-research,
any issue going live the next day, and any issue PR waiting more than 3 days. If a law, date or status in the issue
has changed, it **holds** the release by moving the issue's date back 2 days and opens an update PR. For minor
additions it publishes as planned and offers an optional update PR. You get a notification either way.

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
7. **Labels.** Create the `issue` and `radar` labels (the routine's `gh pr create --label` needs them):
   `gh label create issue` and `gh label create radar`.
8. **Protect `main`.** Settings → Branches → require the "Check site" status check before merging, so a
   broken build can't publish.
9. **Branch push restrictions.** If the routine runs in Claude Code cloud and pushes are restricted to
   `claude/`-prefixed branches, enable unrestricted branch pushes for this repo's environment (the routine
   pushes `issue/*` and `radar/*`).

## Automatic syndication

`.github/workflows/syndicate.yml` runs daily at ~08:40 PT and runs `scripts/syndicate.mjs`. It posts only issues that are
live in the feed, only on their scheduled day (or up to 2 days late after a missed run), and records each post on the
`syndication-log` branch so it never posts twice. Any channel without its secrets runs as a dry run, so set up only the
ones you want. Test with Actions → Syndicate → Run workflow (dry run is on by default).

Settings → Secrets and variables → Actions:

| Channel | Secrets | Variables | How to get them |
|---|---|---|---|
| Bluesky | `BLUESKY_HANDLE` (e.g. `you.bsky.social`), `BLUESKY_APP_PASSWORD` | | Bluesky → Settings → Privacy and security → App passwords. Never your main password. |
| Mastodon | `MASTODON_TOKEN` | `MASTODON_INSTANCE` (e.g. `https://infosec.exchange`) | Mastodon → Preferences → Development → New application, scope `write:statuses` only → copy the access token. |
| LinkedIn | `LINKEDIN_TOKEN`; optional `LINKEDIN_PERSON_URN` | `LINKEDIN_TOKEN_ISSUED` (`YYYY-MM-DD`) | See below. |

LinkedIn (personal profile):
1. https://www.linkedin.com/developers/apps → Create app. LinkedIn requires linking a Company Page; create a free
   "GRC Insights" page if you have none.
2. Products tab → add **Share on LinkedIn** and **Sign In with LinkedIn using OpenID Connect** (both self-serve).
3. Auth tab → OAuth 2.0 tools → create a token with scopes `openid profile w_member_social` → save it as `LINKEDIN_TOKEN`.
4. Set `LINKEDIN_TOKEN_ISSUED` to today. Tokens last 60 days: the workflow warns 10 days before, and fails with a
   clear message once it has expired (GitHub emails you). Repeat step 3 to renew.
5. Optional: if the API version stops being accepted, set the `LINKEDIN_VERSION` env in the workflow to a newer
   `YYYYMM` month.

To keep one issue or channel from posting, see "Auto-post" in `social/syndication.md`.

## Local checks

```bash
npm ci
npm run validate
npm test
```

Full site build checks run in GitHub Actions (`.github/workflows/check.yml`).
