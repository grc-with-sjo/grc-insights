# Syndication: where each issue goes after it is live

The site is the original. Every copy points back to it, and the site has to be indexed first, so
Google treats the site, not Medium or Substack, as the source.

| Channel | How | When | Who |
|---|---|---|---|
| LinkedIn post + first comment | "LinkedIn post" and "LinkedIn first comment" from `social/issue-NN.md` | LinkedIn date in `linkedin-schedule.md`, ~08:40 PT | Syndicate workflow |
| Bluesky | "Bluesky post" (with a link card) or the numbered "Bluesky thread" | LinkedIn date + 1 | Syndicate workflow |
| Mastodon | Same text as Bluesky, issue link in the post | LinkedIn date + 1 | Syndicate workflow |
| Medium | Import a story (below) | LinkedIn date + 2 (a GitHub issue reminds you) | You |
| Substack | Shortened edition (below) | LinkedIn date + 2 (same reminder) | You |
| LinkedIn carousel | Carousel outline, exported as PDF | Thursday after the LinkedIn post, optional | You |
| Reddit / IAPP / ISACA | "Community summary", only where it adds value | When a thread fits; never automated | You |

Merging an issue PR approves its social file for automatic posting. To keep a channel from posting, add
a line under the issue URL listing only the channels you want, e.g. `Auto-post: linkedin, reminder`.
If a row in `linkedin-schedule.md` is marked `Posted`, the workflow skips that issue entirely.

All automatic links carry `?ref=<channel>` so GoatCounter shows which channel sent each reader.

## Before any copy: is the original indexed?

Search Console → URL Inspection → paste the issue URL. If it is not indexed, choose "Request indexing"
and wait a day or two before Medium and Substack. A copy on a big site can outrank an unindexed original.

## Medium (about 5 minutes)

1. medium.com → your avatar → Stories → **Import a story** → paste the issue URL (no `?ref`).
2. Medium copies the issue, keeps the original date and sets the canonical link to the site. Check in
   the story settings ("Advanced settings → Customize canonical link") that it shows the issue URL.
3. Fix anything the import mangled (tables become images or plain text; check the sector guide).
4. Add a closing line: *Originally published in GRC Insights: <issue URL>. The Regulation Radar tracks
   every date in this issue: https://grc-with-sjo.github.io/grc-insights/radar/*
5. Up to 5 tags: start with `Governance`, `Privacy`, `Cybersecurity`, `AI Regulation`, `Compliance`.
6. Optional: submit to a publication that takes GRC or security writing, for reach beyond your followers.
7. Do not paste AI-drafted text without saying so; Medium limits undisclosed AI writing to followers.

Medium's API no longer issues tokens to new writers, so this step stays manual.

## Substack (about 10 minutes)

Substack cannot point a canonical link back to the site, so post a **shortened edition**, never the full issue.

1. New post → title = the issue title, subtitle = the issue's `description`.
2. Body = the "LinkedIn newsletter edition" section of `social/issue-NN.md` (In brief, What happened,
   How I'd approach it, Questions, What to do this quarter).
3. End with: *The full issue, with the sector guide, upcoming dates and all sources, is on GRC Insights:
   <issue URL>*
4. Send to subscribers and publish. Then share one line from it as a Substack Note.
5. Recommend two or three Substacks you read in the same space; recommendations are how Substacks grow.

## Fediverse: letting people follow you

- **Mastodon:** post from your own account (the workflow does this). infosec.exchange is the largest
  instance for security and GRC people.
- **Bluesky into the Fediverse (optional):** following `@ap.brid.gy` from Bluesky (Bridgy Fed) makes your
  Bluesky account followable from Mastodon and Threads. Skip it if you post natively on Mastodon, or
  Fediverse readers will see every post twice.
- **The blog itself:** Bridgy Fed can make a website followable, but it works per domain, and this blog
  lives under a path on `github.io`. Revisit it if the blog moves to its own domain. Until then, the
  Atom feed (`/feed.xml`) is how feed-reader and Fediverse users subscribe.
