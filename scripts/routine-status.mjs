// What the scheduled routines need to know, in one command with no shell variables
// (Claude Code asks for approval on `$(…)`, so unattended runs call this instead).
// Usage: node scripts/routine-status.mjs   → JSON: today, tomorrow (Vancouver), issues due tomorrow,
//        open issue/* PRs and the comma-separated `pending` value for plan-run.mjs.
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readIssues } from './lib/issues.mjs';

export function vancouverDate(offsetDays = 0, now = new Date()) {
  const shifted = new Date(now.getTime() + offsetDays * 86400000);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Vancouver', year: 'numeric', month: '2-digit', day: '2-digit' }).format(shifted);
}

export function dueOn(issues, day) {
  return issues
    .filter(d => (d.data?.date instanceof Date ? d.data.date.toISOString().slice(0, 10) : String(d.data?.date)) === day)
    .map(d => d.file);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const tomorrow = vancouverDate(1);
  let openIssuePrs = [];
  let ghError = null;
  try {
    const out = execFileSync('gh', ['pr', 'list', '-R', 'grc-with-sjo/grc-insights', '--state', 'open', '--json', 'number,title,headRefName,createdAt'], { encoding: 'utf8' });
    openIssuePrs = JSON.parse(out).filter(p => p.headRefName.startsWith('issue/'));
  } catch (err) {
    ghError = String(err.message ?? err).split('\n')[0];
  }
  console.log(JSON.stringify({
    today: vancouverDate(0),
    tomorrow,
    dueTomorrow: dueOn(readIssues(root), tomorrow),
    openIssuePrs,
    pending: openIssuePrs.map(p => p.headRefName).join(','),
    ghError,
  }, null, 2));
}
