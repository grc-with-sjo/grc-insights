# Radar watch: verifying leads

The **Radar watch** workflow (`.github/workflows/radar-watch.yml`) runs daily at 14:00 UTC. It reads the
feeds in `_data/watch_sources.yml` and opens a GitHub issue labelled `radar-watch` listing new leads.
A lead is a headline, not a fact. Nothing reaches the Radar until its primary source has been read.

## For each open `radar-watch` issue

1. Open each lead and find the **primary source**: the regulator, legislature, gazette or standards body
   page (the `Verify at` site in the issue). AICPA, iso.org, ftc.gov and canada.ca block scripts; read them
   in the built-in browser. Never conclude "no change" because a site would not load.
2. Decide: does this change a Radar row (status, a key date, the summary or the source), or is it a new
   law, rule or standard a GRC programme would act on? Most leads are not (training-efficiency standards,
   agency staffing news, unrelated rules). Tick each lead and note the outcome in the issue.
3. For each real change:
   - edit the row in `_data/tracker.yml` and set `last_reviewed` to today, **only** because the primary
     source was read today;
   - add an entry at the top of `_data/radar_changes.yml` with the date, row id, a one-sentence change and
     the primary source URL (`npm run validate` checks this);
   - put the primary-source sentence the change rests on in that entry's `quote` (required from
     29 Oct 2026; `npm run validate` fails without it);
   - anything that rests only on secondary sources keeps a `⚠️ verify` marker and its old `last_reviewed`.
4. **Wording check, claim by claim.** Reading the source is not enough. The Radar went wrong on
   28 Oct 2026 because a source was read but its words were upgraded: "rolling out" with "full launch
   expected early 2027" became "launch" and "now available". Before pushing, check every sentence you
   wrote in `key_dates[].what`, `summary` and `radar_changes` against the source text:
   - **Stage:** use the source's own stage words. Proposed, exposure draft, consultation, pilot, rolling
     out, full launch, in force and effective are different things; never move one step up.
   - **Qualifiers:** keep "if approved", "expected", "several", "early adoption permitted" and similar.
     Dates the source calls expected or proposed say so.
   - **Lists:** a list (points of focus, principles, sectors) is either complete or says "including".
   - **Names:** organisations and instruments use the name in the source.
   - **Row status vs news:** a proposal on an in-force row is described as a proposal; the summary says
     what applies today.
   - **No inference:** nothing the source does not say (for example "since <date>" when it says "now").
   Then have a separate subagent do the same check cold: give it only the primary-source text and the
   diff, and ask it to list every claim the source does not support word for word. Fix each one, or
   mark it `⚠️ verify`, before opening the PR.
5. Run `npm run validate` and `npm test`, push a `radar/watch-<date>` branch and open a PR. Factual Radar
   updates verified this way may be merged once CI passes (Surabhi approved this on 2026-10-28); anything
   with opinion goes to her first.
6. Close the issue with a one-line summary: what changed, or "no Radar change".

## Sources that could not be read

The issue also lists feeds that failed. One bad day is noise. If the same source fails three days running,
find a replacement feed and update `_data/watch_sources.yml`.

## Weekly

Draft a short "Radar changes this week" Substack note from `_data/radar_changes.yml` for Surabhi to post.
