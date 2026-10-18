// Opens a GitHub issue reminding Surabhi to syndicate each issue to Medium and Substack, two days after
// its LinkedIn date in social/linkedin-schedule.md. Nothing is posted anywhere automatically: LinkedIn and
// Bluesky are posted by hand, and Medium and Substack follow social/syndication.md.
// Run by .github/workflows/syndicate.yml.
//
//   node scripts/syndicate.mjs --state <posted.json> [--dry-run] [--ignore-hour] [--today YYYY-MM-DD]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { todayIn } from './lib/dates.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TZ = 'America/Vancouver';
const POST_HOUR = 8;
const CATCH_UP_DAYS = 2; // a missed run still opens the reminder up to 2 days late
const REMINDER_OFFSET = 2; // days after the LinkedIn date
const FEED_URL = process.env.SITE_FEED_URL || 'https://grc-with-sjo.github.io/grc-insights/feed.xml';

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

export function issueUrl(md) {
  return (md.match(/^Issue URL: (\S+)/m) || [])[1] || null;
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

export const jobKey = issue => `issue-${String(issue).padStart(2, '0')}:reminder`;

// Reminders due today (or missed in the last CATCH_UP_DAYS) that the state file has not recorded.
export function planJobs(schedule, today, done) {
  const jobs = [];
  for (const row of schedule) {
    const due = addDays(row.linkedinDate, REMINDER_OFFSET);
    const late = daysBetween(due, today);
    if (late < 0 || late > CATCH_UP_DAYS) continue;
    const key = jobKey(row.issue);
    if (done[key]) continue;
    jobs.push({ key, issue: row.issue, due });
  }
  return jobs;
}

export function reminderBody(issue, url) {
  const nn = String(issue).padStart(2, '0');
  return [
    `Issue ${nn} is live: ${url}`,
    '',
    'Follow `social/syndication.md`, or ask Claude to prepare both versions from the issue:',
    '',
    '- [ ] Search Console shows the issue as indexed (URL Inspection). If not, request indexing and wait a day.',
    `- [ ] Medium: Import a story → \`${url}\` → check the canonical link, add 5 tags, publish`,
    `- [ ] Substack: shortened edition (In brief, How I'd approach it, questions) ending with "The full issue is on GRC Insights: ${url}"`,
    '- [ ] Close this issue',
  ].join('\n');
}

// ── Main ────────────────────────────────────────────────────────────────

async function http(url, opts = {}, label = url) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`${label}: HTTP ${res.status} ${(await res.text().catch(() => '')).slice(0, 300)}`);
  return res;
}

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
  const jobs = planJobs(parseSchedule(readFileSync(join(ROOT, 'social/linkedin-schedule.md'), 'utf8')), today, state.posted);
  console.log(`${today}: ${jobs.length} reminder(s) due${jobs.length ? `: ${jobs.map(j => j.key).join(', ')}` : ''}`);
  if (!jobs.length) return;

  const feed = await (await http(FEED_URL, {}, 'feed')).text();
  for (const job of jobs) {
    const file = join(ROOT, `social/issue-${String(job.issue).padStart(2, '0')}.md`);
    const url = existsSync(file) ? issueUrl(readFileSync(file, 'utf8')) : null;
    if (!url) { console.log(`::warning::${job.key}: no social file or "Issue URL:" line; skipped`); continue; }
    if (!feed.includes(`<link href="${url}"`)) { console.log(`${job.key}: issue not live yet; will retry`); continue; }
    const title = `Syndicate Issue ${String(job.issue).padStart(2, '0')} to Medium and Substack`;
    const body = reminderBody(job.issue, url);
    if (a.dryRun || !env.GITHUB_TOKEN || !env.GITHUB_REPOSITORY) {
      console.log(`[dry run] would open "${title}":\n${body}\n`);
      continue;
    }
    const res = await (await http(`https://api.github.com/repos/${env.GITHUB_REPOSITORY}/issues`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    }, 'GitHub issue')).json();
    state.posted[job.key] = { at: new Date().toISOString(), ids: [res.html_url] };
    writeFileSync(a.state, `${JSON.stringify(state, null, 2)}\n`);
    console.log(`${job.key}: opened ${res.html_url}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(e => { console.error(e); process.exit(1); });
}
