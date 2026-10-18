# Syndication: where each issue goes after it is live

The site is the original. Every copy points back to it, and the site has to be indexed first, so
Google treats the site, not Medium or Substack, as the source. Nothing is posted automatically.

| Channel | How | When | Who |
|---|---|---|---|
| LinkedIn post + first comment | "LinkedIn post" and "LinkedIn first comment" from `social/issue-NN.md` | LinkedIn date in `linkedin-schedule.md`, 08:00–09:00 PT | Surabhi |
| Bluesky | "Bluesky post" from `social/issue-NN.md`, with the link card | The day after LinkedIn | Surabhi |
| Medium | Import a story (below) | Two days after LinkedIn; a GitHub issue reminds you | Surabhi, with Claude preparing the checklist and closing line |
| Substack | Shortened edition (below) | Same reminder | Surabhi, with Claude drafting the edition |
| LinkedIn carousel | Carousel outline, exported as PDF | Thursday after the LinkedIn post, optional | Surabhi |
| Reddit / IAPP / ISACA | "Community summary", only where it adds value | When a thread fits | Surabhi |

The reminder comes from `.github/workflows/syndicate.yml` (`scripts/syndicate.mjs`). It only opens a GitHub
issue, only for issues that are live in the feed, and never twice for the same issue.

## Before any copy: is the original indexed?

Search Console → URL Inspection → paste the issue URL. If it is not indexed, choose "Request indexing"
and wait a day or two before Medium and Substack. A copy on a big site can outrank an unindexed original.

## Medium (about 5 minutes)

1. medium.com → your avatar → Stories → **Import a story** → paste the issue URL.
2. Medium copies the issue, keeps the original date and sets the canonical link to the site. Check in
   the story settings ("Advanced settings → Customize canonical link") that it shows the issue URL.
3. Fix anything the import mangled (tables become images or plain text; check the sector guide).
4. Add a closing line: *Originally published in GRC Insights: <issue URL>. The Regulation Radar tracks
   every date in this issue: https://grc-with-sjo.github.io/grc-insights/radar/*
5. Up to 5 tags: start with `Governance`, `Privacy`, `Cybersecurity`, `AI Regulation`, `Compliance`.
6. Optional: submit to a publication that takes GRC or security writing, for reach beyond your followers.
7. The site says it is built with AI assistance; keep that disclosure on Medium too.

## Substack (about 10 minutes)

Substack cannot point a canonical link back to the site, so post a **shortened edition**, never the full issue.

1. New post → title = the issue title, subtitle = the issue's `description`.
2. Body = the "LinkedIn newsletter edition" section of `social/issue-NN.md` (In brief, What happened,
   How I'd approach it, Questions, What to do this quarter). Ask Claude to refresh it in `routine/voice.md`
   style if the issue has been updated since.
3. End with: *The full issue, with the sector guide, upcoming dates and all sources, is on GRC Insights:
   <issue URL>*
4. Send to subscribers and publish. Then share one line from it as a Substack Note.
5. Recommend two or three Substacks you read in the same space; recommendations are how Substacks grow.
