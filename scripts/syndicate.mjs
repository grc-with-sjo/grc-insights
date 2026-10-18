// Posts the reviewed social drafts (social/issue-NN.md) on the dates in social/linkedin-schedule.md.
// Run by .github/workflows/syndicate.yml. A channel whose secrets are missing runs as a dry run.
//
//   node scripts/syndicate.mjs --state <posted.json> [--dry-run] [--ignore-hour] [--today YYYY-MM-DD]
//
// Channels and when they post (Vancouver time, from 08:00):
//   linkedin  LinkedIn date: the "LinkedIn post", then the "LinkedIn first comment" as a comment
//   bluesky   LinkedIn date + 1: the "Bluesky post" (with a link card), or the "Bluesky thread"
//   mastodon  LinkedIn date + 1: the same text as Bluesky, with the link in the post
//   reminder  LinkedIn date + 2: a GitHub issue with the Medium import and Substack checklist
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { todayIn } from './lib/dates.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TZ = 'America/Vancouver';
const POST_HOUR = 8;
const CATCH_UP_DAYS = 2; // a missed run still posts up to 2 days late, never older posts
const FEED_URL = process.env.SITE_FEED_URL || 'https://grc-with-sjo.github.io/grc-insights/feed.xml';
const LINKEDIN_VERSION = process.env.LINKEDIN_VERSION || '202606';
const LINKEDIN_TOKEN_DAYS = 60;

export const CHANNELS = [
  { name: 'linkedin', offset: 0 },
  { name: 'bluesky', offset: 1 },
  { name: 'mastodon', offset: 1 },
  { name: 'reminder', offset: 2 },
];

// ── Parsing ─────────────────────────────────────────────────────────────

export function parseSchedule(md) {
  const rows = [];
  for (const line of md.split('\n')) {
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map(c => c.trim());
    if (cells.length < 5) continue;
    const date = cells[1].match(/\d{4}-\d{2}-\d{2}/);
    const issue = cells[2].match(/^Issue (\d+)\b/);
    if (!date || !issue) continue;
    rows.push({ issue: Number(issue[1]), linkedinDate: date[0], status: cells[4] });
  }
  return rows;
}

function sections(md) {
  const out = {};
  let name = null;
  for (const line of md.split('\n')) {
    const h = line.match(/^## (.+)$/);
    if (h) { name = h[1].trim(); out[name] = []; continue; }
    if (name) out[name].push(line);
  }
  return Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.join('\n').trim()]));
}

function find(secs, re) {
  const key = Object.keys(secs).find(k => re.test(k));
  return key === undefined ? null : secs[key];
}

// Instruction lines the drafts carry for a human, not for the post.
const NOTE = /^(Card link:|Paste the link first|Voice:|Kept back on purpose)/;

function clean(text) {
  if (text === null) return null;
  const body = text.split('\n').filter(l => !NOTE.test(l.trim())).join('\n').trim();
  return body || null;
}

export function parseSocial(md) {
  const secs = sections(md);
  const url = (md.match(/^Issue URL: (\S+)/m) || [])[1] || null;
  const linkedinPost = clean(find(secs, /^LinkedIn post(\s*\(|$)/));
  const linkedinComment = clean(find(secs, /^LinkedIn first comment/));
  let blueskyPosts = null;
  const single = clean(find(secs, /^Bluesky post/));
  const thread = clean(find(secs, /^(X \/ )?Bluesky thread/));
  if (single) blueskyPosts = [single];
  else if (thread) {
    blueskyPosts = thread.split(/\n(?=\d+\/ )/).map(p => p.trim()).filter(p => /^\d+\/ /.test(p));
  }
  // "Auto-post: linkedin, bluesky" limits the channels; without the line, every channel posts.
  const only = (md.match(/^Auto-post: (.+)$/m) || [])[1];
  const autoPost = only ? only.split(/[,\s]+/).filter(Boolean).map(c => c.toLowerCase()) : null;
  return { url, linkedinPost, linkedinComment, blueskyPosts, autoPost };
}

// "<...>" means the draft still has a template placeholder.
export function hasPlaceholder(text) {
  return /<[^<>\n]{2,}>/.test(text);
}

// ── Planning ────────────────────────────────────────────────────────────

export function addDays(iso, n) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  return Math.round((new Date(`${b}T00:00:00Z`) - new Date(`${a}T00:00:00Z`)) / 86400000);
}

export const jobKey = (issue, channel) => `issue-${String(issue).padStart(2, '0')}:${channel}`;

// Jobs due today (or missed in the last CATCH_UP_DAYS) that the state file has not recorded.
export function planJobs(schedule, today, posted) {
  const jobs = [];
  for (const row of schedule) {
    if (/posted/i.test(row.status)) continue; // posted by hand
    for (const ch of CHANNELS) {
      const due = addDays(row.linkedinDate, ch.offset);
      const late = daysBetween(due, today);
      if (late < 0 || late > CATCH_UP_DAYS) continue;
      const key = jobKey(row.issue, ch.name);
      if (posted[key]) continue;
      jobs.push({ key, issue: row.issue, channel: ch.name, due });
    }
  }
  return jobs;
}

// ── Formatting ──────────────────────────────────────────────────────────

// GoatCounter reads ?ref= as the referrer, so each channel shows up in the dashboard.
export function withRef(url, channel) {
  return `${url}${url.includes('?') ? '&' : '?'}ref=${channel}`;
}

const HASHTAG = /(^|\s)#([\p{L}\p{N}_]+)/gu;
const LINK = /https?:\/\/[^\s<>"]+[^\s<>".,;:!?)]/g;

// Bluesky needs byte offsets (UTF-8) for clickable hashtags and links.
export function bskyFacets(text) {
  const enc = new TextEncoder();
  const bytes = i => enc.encode(text.slice(0, i)).length;
  const facets = [];
  for (const m of text.matchAll(LINK)) {
    facets.push({
      index: { byteStart: bytes(m.index), byteEnd: bytes(m.index + m[0].length) },
      features: [{ $type: 'app.bsky.richtext.facet#link', uri: m[0] }],
    });
  }
  for (const m of text.matchAll(HASHTAG)) {
    const start = m.index + m[1].length;
    facets.push({
      index: { byteStart: bytes(start), byteEnd: bytes(start + 1 + m[2].length) },
      features: [{ $type: 'app.bsky.richtext.facet#tag', tag: m[2] }],
    });
  }
  return facets;
}

export function graphemes(text) {
  return [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(text)].length;
}

// LinkedIn's Posts API reads "little text": reserved characters need a backslash, and a
// hashtag must be written as {hashtag|\#|Tag} or it is dropped or truncates the post.
export function linkedinCommentary(text) {
  const escape = s => s.replace(/[\\|{}@[\]()<>#*_~]/g, c => `\\${c}`);
  let out = '';
  let last = 0;
  for (const m of text.matchAll(HASHTAG)) {
    const start = m.index + m[1].length;
    out += escape(text.slice(last, start)) + `{hashtag|\\#|${m[2]}}`;
    last = start + 1 + m[2].length;
  }
  return out + escape(text.slice(last));
}

function decodeEntities(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

export function ogTags(html) {
  const tags = {};
  for (const m of html.matchAll(/<meta property="og:([a-z:_]+)" content="([^"]*)"/g)) {
    tags[m[1]] ??= decodeEntities(m[2]);
  }
  return tags;
}

// ── HTTP ────────────────────────────────────────────────────────────────

async function http(url, opts = {}, label = url) {
  const res = await fetch(url, opts);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const err = new Error(`${label}: HTTP ${res.status} ${body.slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }
  return res;
}

// ── Channels ────────────────────────────────────────────────────────────

async function bskyCard(service, jwt, pageUrl, linkUrl) {
  const og = ogTags(await (await http(pageUrl, {}, 'issue page')).text());
  const external = { uri: linkUrl, title: og.title || '', description: og.description || '' };
  if (og.image) {
    const img = await http(og.image, {}, 'card image');
    const bytes = Buffer.from(await img.arrayBuffer());
    if (bytes.length < 1_000_000) {
      const up = await http(`${service}/xrpc/com.atproto.repo.uploadBlob`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': img.headers.get('content-type') || 'image/png' },
        body: bytes,
      }, 'Bluesky image upload');
      external.thumb = (await up.json()).blob;
    }
  }
  return { $type: 'app.bsky.embed.external', external };
}

async function postBluesky(draft, env) {
  const service = env.BLUESKY_SERVICE || 'https://bsky.social';
  const link = withRef(draft.url, 'bluesky');
  const texts = draft.blueskyPosts.map(t => t.replaceAll(draft.url, link));
  for (const t of texts) {
    if (graphemes(t) > 300) throw new Error(`Bluesky post is ${graphemes(t)} characters (max 300): "${t.slice(0, 60)}…"`);
  }
  const session = await (await http(`${service}/xrpc/com.atproto.server.createSession`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: env.BLUESKY_HANDLE, password: env.BLUESKY_APP_PASSWORD }),
  }, 'Bluesky login')).json();
  const auth = { Authorization: `Bearer ${session.accessJwt}`, 'Content-Type': 'application/json' };
  let root = null;
  let parent = null;
  const uris = [];
  for (const [i, text] of texts.entries()) {
    const record = {
      $type: 'app.bsky.feed.post', text, createdAt: new Date().toISOString(), langs: ['en'],
      facets: bskyFacets(text),
    };
    // A single post gets a link card; a thread already carries the link in its last post.
    if (texts.length === 1) record.embed = await bskyCard(service, session.accessJwt, draft.url, link);
    if (root) record.reply = { root, parent };
    const res = await (await http(`${service}/xrpc/com.atproto.repo.createRecord`, {
      method: 'POST', headers: auth,
      body: JSON.stringify({ repo: session.did, collection: 'app.bsky.feed.post', record }),
    }, `Bluesky post ${i + 1}`)).json();
    parent = { uri: res.uri, cid: res.cid };
    root ??= parent;
    uris.push(res.uri);
  }
  return { ids: uris };
}

async function postMastodon(draft, env, key) {
  const instance = env.MASTODON_INSTANCE.replace(/\/+$/, '');
  const link = withRef(draft.url, 'mastodon');
  const texts = draft.blueskyPosts.map(t => t.replaceAll(draft.url, link));
  if (texts.length === 1) texts[0] = `${texts[0]}\n\n${link}`;
  let replyTo = null;
  const ids = [];
  for (const [i, status] of texts.entries()) {
    const res = await (await http(`${instance}/api/v1/statuses`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.MASTODON_TOKEN}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `${key}:${i}`, // Mastodon drops a retried duplicate
      },
      body: JSON.stringify({ status, visibility: 'public', language: 'en', in_reply_to_id: replyTo }),
    }, `Mastodon post ${i + 1}`)).json();
    replyTo = res.id;
    ids.push(res.url || res.id);
  }
  return { ids };
}

function warnLinkedinToken(env, today) {
  if (!env.LINKEDIN_TOKEN_ISSUED) return;
  const left = LINKEDIN_TOKEN_DAYS - daysBetween(env.LINKEDIN_TOKEN_ISSUED, today);
  if (left <= 10) {
    console.log(`::warning::LinkedIn token expires in ${left} day(s). Create a new one and update LINKEDIN_TOKEN and LINKEDIN_TOKEN_ISSUED (README).`);
  }
}

async function postLinkedin(draft, env) {
  const headers = {
    Authorization: `Bearer ${env.LINKEDIN_TOKEN}`,
    'Content-Type': 'application/json',
    'LinkedIn-Version': LINKEDIN_VERSION,
    'X-Restli-Protocol-Version': '2.0.0',
  };
  let person = env.LINKEDIN_PERSON_URN;
  try {
    if (!person) {
      const me = await (await http('https://api.linkedin.com/v2/userinfo', { headers: { Authorization: headers.Authorization } }, 'LinkedIn userinfo')).json();
      person = `urn:li:person:${me.sub}`;
    }
    const res = await http('https://api.linkedin.com/rest/posts', {
      method: 'POST', headers,
      body: JSON.stringify({
        author: person,
        commentary: linkedinCommentary(draft.linkedinPost),
        visibility: 'PUBLIC',
        distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
        lifecycleState: 'PUBLISHED',
        isReshareDisabledByAuthor: false,
      }),
    }, 'LinkedIn post');
    const postUrn = res.headers.get('x-restli-id');
    const result = { ids: [postUrn] };
    if (draft.linkedinComment) {
      try {
        await http(`https://api.linkedin.com/rest/socialActions/${encodeURIComponent(postUrn)}/comments`, {
          method: 'POST', headers,
          body: JSON.stringify({
            actor: person, object: postUrn,
            message: { text: draft.linkedinComment.replaceAll(draft.url, withRef(draft.url, 'linkedin')) },
          }),
        }, 'LinkedIn first comment');
      } catch (e) {
        // The post is live, so record it anyway and never post it twice; add the comment by hand.
        console.log(`::warning::LinkedIn post is live but the first comment failed; add it by hand. ${e.message}`);
        result.commentFailed = true;
      }
    }
    return result;
  } catch (e) {
    if (e.status === 401) e.message = `LinkedIn token expired or invalid; create a new one (README, "Automatic syndication"). ${e.message}`;
    throw e;
  }
}

async function postReminder(draft, env, issue) {
  const nn = String(issue).padStart(2, '0');
  const body = [
    `Issue ${nn} is live: ${draft.url}`,
    '',
    'Follow `social/syndication.md`:',
    '',
    '- [ ] Search Console shows the issue as indexed (URL Inspection). If not, request indexing and wait.',
    `- [ ] Medium: Import a story → \`${draft.url}\` → check the canonical link and add 5 tags → publish`,
    `- [ ] Substack: new post from the "LinkedIn newsletter edition" in \`social/issue-${nn}.md\`, ending with "Originally published at ${draft.url}"`,
    '- [ ] Close this issue',
  ].join('\n');
  const res = await (await http(`https://api.github.com/repos/${env.GITHUB_REPOSITORY}/issues`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: `Syndicate Issue ${nn} to Medium and Substack`, body }),
  }, 'GitHub issue')).json();
  return { ids: [res.html_url] };
}

const CHANNEL_IMPL = {
  linkedin: { secrets: ['LINKEDIN_TOKEN'], needs: d => d.linkedinPost, run: (d, env) => postLinkedin(d, env) },
  bluesky: { secrets: ['BLUESKY_HANDLE', 'BLUESKY_APP_PASSWORD'], needs: d => d.blueskyPosts, run: (d, env) => postBluesky(d, env) },
  mastodon: { secrets: ['MASTODON_INSTANCE', 'MASTODON_TOKEN'], needs: d => d.blueskyPosts, run: (d, env, job) => postMastodon(d, env, job.key) },
  reminder: { secrets: ['GITHUB_TOKEN', 'GITHUB_REPOSITORY'], needs: () => true, run: (d, env, job) => postReminder(d, env, job.issue) },
};

// ── Main ────────────────────────────────────────────────────────────────

function args(argv) {
  const a = { dryRun: false, ignoreHour: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--state') a.state = argv[++i];
    else if (argv[i] === '--today') a.today = argv[++i];
    else if (argv[i] === '--dry-run') a.dryRun = true;
    else if (argv[i] === '--ignore-hour') a.ignoreHour = true;
  }
  return a;
}

function vancouverHour() {
  return Number(new Intl.DateTimeFormat('en-CA', { timeZone: TZ, hour: '2-digit', hourCycle: 'h23' }).format(new Date()));
}

async function main() {
  const a = args(process.argv.slice(2));
  if (!a.state) throw new Error('--state <posted.json> is required');
  const env = process.env;
  const today = a.today || todayIn(TZ);
  if (!a.ignoreHour && vancouverHour() < POST_HOUR) {
    console.log(`Before ${POST_HOUR}:00 in Vancouver; nothing to do until the next run.`);
    return;
  }
  const state = existsSync(a.state) ? JSON.parse(readFileSync(a.state, 'utf8')) : { posted: {} };
  const save = () => writeFileSync(a.state, `${JSON.stringify(state, null, 2)}\n`);
  const schedule = parseSchedule(readFileSync(join(ROOT, 'social/linkedin-schedule.md'), 'utf8'));
  const jobs = planJobs(schedule, today, state.posted);
  console.log(`${today}: ${jobs.length} job(s) due${jobs.length ? `: ${jobs.map(j => j.key).join(', ')}` : ''}`);
  if (!jobs.length) return;

  if (jobs.some(j => j.channel === 'linkedin')) warnLinkedinToken(env, today);
  const feed = await (await http(FEED_URL, {}, 'feed')).text();
  let failed = 0;
  for (const job of jobs) {
    const impl = CHANNEL_IMPL[job.channel];
    const file = join(ROOT, `social/issue-${String(job.issue).padStart(2, '0')}.md`);
    if (!existsSync(file)) { console.log(`::warning::${job.key}: no ${file}; skipped`); continue; }
    const draft = parseSocial(readFileSync(file, 'utf8'));
    if (!draft.url) { console.log(`::warning::${job.key}: no "Issue URL:" line; skipped`); continue; }
    // Held or not-yet-published issues are not in the feed: never post a link that 404s.
    if (!feed.includes(`<link href="${draft.url}"`)) { console.log(`${job.key}: issue not live yet; will retry`); continue; }
    if (draft.autoPost && !draft.autoPost.includes(job.channel)) {
      console.log(`::notice::${job.key}: not in this file's "Auto-post:" line; skipped`);
      continue;
    }
    const content = impl.needs(draft);
    if (!content) { console.log(`::notice::${job.key}: no draft for this channel in the social file; skipped`); continue; }
    if ([content].flat().some(t => typeof t === 'string' && hasPlaceholder(t))) {
      console.log(`::warning::${job.key}: draft still has a <placeholder>; skipped`);
      continue;
    }
    const missing = impl.secrets.filter(s => !env[s]);
    if (a.dryRun || missing.length) {
      console.log(`[dry run${missing.length ? `, missing ${missing.join(', ')}` : ''}] ${job.key} would post:\n${[content].flat().join('\n---\n')}\n`);
      continue;
    }
    try {
      const result = await impl.run(draft, env, job);
      state.posted[job.key] = { at: new Date().toISOString(), ...result };
      save(); // after every post, so a later failure never causes a repost
      console.log(`${job.key}: posted ${result.ids.join(' ')}`);
    } catch (e) {
      failed++;
      console.log(`::error::${job.key}: ${e.message}`);
    }
  }
  if (failed) process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(e => { console.error(e); process.exit(1); });
}
