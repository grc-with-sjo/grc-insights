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

  if (issues.some(i => (i.calendarDate ?? i.date) === today || i.date === today) || pending.some(p => p.date === today)) {
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
    .map(d => ({ issue: d.data.issue, date: String(d.data.date), calendarDate: d.data.calendar_date ? String(d.data.calendar_date) : undefined }));
  console.log(JSON.stringify(planRun({ today, editorial, issues, pending }), null, 2));
}
