import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { parseFrontMatter } from './lib/frontmatter.mjs';
import { isIsoDate, weekdayOf } from './lib/dates.mjs';
import { loadTaxonomy } from './lib/taxonomy.mjs';
import { readIssues } from './lib/issues.mjs';

export const REQUIRED_SECTIONS = [
  '## In brief', '## The story so far', '## What happened', '## Where I land',
  '## The questions still open', '## What to do this quarter', '## On the radar', '## Sources',
];
const URL_RE = /^https?:\/\/[^\s"<>]+$/;

function subsetErrors(label, values, allowed) {
  if (!Array.isArray(values) || values.length === 0) return [`${label} must be a non-empty list`];
  return values.filter(v => !allowed.has(v)).map(v => `${label}: unknown value "${v}"`);
}

function sectionBody(body, heading) {
  const lines = body.split('\n');
  const start = lines.findIndex(l => l.trim() === heading);
  if (start === -1) return null;
  const rest = lines.slice(start + 1);
  const end = rest.findIndex(l => /^## /.test(l));
  return (end === -1 ? rest : rest.slice(0, end)).join('\n');
}

// Returns [{ heading, text }] for each "### " story inside "## What happened".
export function parseStories(body) {
  const section = sectionBody(body, '## What happened');
  if (section === null) return [];
  const stories = [];
  for (const line of section.split('\n')) {
    if (/^### /.test(line)) stories.push({ heading: line.trim(), text: '' });
    else if (stories.length) stories.at(-1).text += `${line}\n`;
  }
  return stories;
}

export function validateIssue({ file, data, body }, tax) {
  const errors = [];
  const fail = m => errors.push(`${file}: ${m}`);
  if (!data) { fail('missing front matter'); return errors; }
  if (typeof data.title !== 'string' || !data.title.trim()) fail('title is required');
  if (!Number.isInteger(data.issue) || data.issue < 0) fail('issue must be a non-negative integer');
  if (!tax.series.has(data.series)) fail(`series: unknown value "${data.series}"`);
  if (!isIsoDate(data.date)) fail('date must be YYYY-MM-DD');
  else if (!file.startsWith(data.date.slice(0, 7))) fail('filename must start with the issue date (YYYY-MM)');
  if (typeof data.description !== 'string' || !data.description.trim()) fail('description is required');
  else if (data.description.length > 200) fail('description must be 200 characters or fewer');
  for (const m of subsetErrors('regions', data.regions, tax.regions)) fail(m);
  for (const m of subsetErrors('sectors', data.sectors, tax.sectors)) fail(m);
  for (const m of subsetErrors('categories', data.categories, tax.categories)) fail(m);

  if (data.series !== 'field-notes') {
    const lines = body.split('\n').map(l => l.trim());
    let last = -1;
    for (const heading of REQUIRED_SECTIONS) {
      const i = lines.indexOf(heading);
      if (i === -1) fail(`missing section "${heading}"`);
      else if (i < last) fail(`section "${heading}" is out of order`);
      else last = i;
    }
    if (lines.includes('## What happened')) {
      const stories = parseStories(body);
      if (stories.length < 2 || stories.length > 4) fail(`"## What happened" needs 2–4 ### stories (found ${stories.length})`);
      for (const { heading, text } of stories) {
        for (const marker of ['**Takeaway:**', '**Open question:**']) {
          if (!text.split('\n').some(l => l.trimStart().startsWith(marker))) fail(`story "${heading}" is missing ${marker}`);
        }
      }
    }
    const open = sectionBody(body, '## The questions still open');
    if (open !== null && open.split('\n').filter(l => /^\s*- /.test(l)).length < 2) {
      fail('"## The questions still open" needs at least 2 bullet lines');
    }
    const sources = body.split(/^## Sources\s*$/m)[1] ?? '';
    if (!/\]\(https?:\/\//.test(sources)) fail('Sources section must contain at least one http(s) link');
  }
  return errors;
}

export function validateTrackerRows(rows, tax) {
  if (!Array.isArray(rows)) return ['tracker.yml must be a list'];
  const errors = [];
  const seen = new Set();
  rows.forEach((raw, i) => {
    const r = raw ?? {};
    const fail = m => errors.push(`tracker[${i}] ${r.id ?? '?'}: ${m}`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.id ?? '')) fail('id must be kebab-case');
    else if (seen.has(r.id)) fail('duplicate id');
    else seen.add(r.id);
    for (const f of ['name', 'jurisdiction', 'summary']) {
      if (typeof r[f] !== 'string' || !r[f].trim()) fail(`${f} is required`);
    }
    if (!tax.regions.has(r.region)) fail(`region: unknown value "${r.region}"`);
    if (!tax.trackerTypes.has(r.type)) fail(`type: unknown value "${r.type}"`);
    if (!tax.trackerStatuses.has(r.status)) fail(`status: unknown value "${r.status}"`);
    if (!tax.relevance.has(r.applies_to_me)) fail(`applies_to_me: unknown value "${r.applies_to_me}"`);
    for (const m of subsetErrors('sectors', r.sectors, tax.sectors)) fail(m);
    if (!URL_RE.test(r.source ?? '')) fail('source must be an http(s) URL');
    if (!isIsoDate(r.last_reviewed)) fail('last_reviewed must be YYYY-MM-DD');
    if (!Array.isArray(r.key_dates)) fail('key_dates must be a list (may be empty)');
    else r.key_dates.forEach((k, j) => {
      if (!isIsoDate(k?.date)) fail(`key_dates[${j}].date must be YYYY-MM-DD`);
      if (typeof k?.what !== 'string' || !k.what.trim()) fail(`key_dates[${j}].what is required`);
    });
  });
  return errors;
}

export function validateEditorial(ed, tax) {
  if (!ed || typeof ed !== 'object') return ['editorial.yml: must be a mapping'];
  const errors = [];
  const fail = m => errors.push(`editorial.yml: ${m}`);
  if (!['weekly', 'monthly'].includes(ed.cadence)) fail('cadence must be weekly or monthly');
  if (!isIsoDate(ed.monthly_start)) fail('monthly_start must be YYYY-MM-DD');
  else if (weekdayOf(ed.monthly_start) !== 0) fail('monthly_start must be a Sunday');
  for (const [date, entry] of Object.entries(ed.calendar ?? {})) {
    if (!isIsoDate(date)) fail(`calendar key "${date}" must be YYYY-MM-DD`);
    else if (weekdayOf(date) !== 0) fail(`calendar date ${date} must be a Sunday`);
    if (!tax.series.has(entry?.series)) fail(`calendar ${date}: unknown series "${entry?.series}"`);
    if (typeof entry?.theme !== 'string' || !entry.theme.trim()) fail(`calendar ${date}: theme is required`);
  }
  for (const m of subsetErrors('monthly_feature_rotation', ed.monthly_feature_rotation, tax.sectors)) fail(m);
  for (const k of ['regulators', 'standards', 'trackers']) {
    if (!Array.isArray(ed.sources?.[k]) || ed.sources[k].length === 0) fail(`sources.${k} must be a non-empty list`);
  }
  return errors;
}

export function countVerifyFlags(body) {
  return (body.match(/⚠️? verify/g) || []).length;
}

function readYaml(path) {
  return existsSync(path) ? parse(readFileSync(path, 'utf8')) : undefined;
}

export function validateRepo(root) {
  const tax = loadTaxonomy(root);
  const errors = [];
  const verifyFlags = {};
  const issues = readIssues(root);
  for (const doc of issues) {
    errors.push(...validateIssue(doc, tax));
    verifyFlags[doc.file] = countVerifyFlags(doc.body);
  }
  const numbers = issues.filter(d => Number.isInteger(d.data?.issue)).map(d => [d.file, d.data.issue]);
  numbers.forEach(([file, n], i) => {
    if (numbers.findIndex(([, m]) => m === n) !== i) errors.push(`${file}: duplicate issue number ${n}`);
  });
  errors.push(...validateTrackerRows(readYaml(join(root, '_data/tracker.yml')), tax));
  const editorialPath = join(root, '_data/editorial.yml');
  if (existsSync(editorialPath)) errors.push(...validateEditorial(readYaml(editorialPath), tax));
  return { errors, verifyFlags };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const args = process.argv.slice(2);
  if (args[0] === '--verify-count') {
    const { body } = parseFrontMatter(readFileSync(args[1], 'utf8'));
    console.log(countVerifyFlags(body));
  } else {
    const { errors, verifyFlags } = validateRepo(root);
    for (const [file, n] of Object.entries(verifyFlags)) {
      if (n) console.log(`${file}: ${n} item(s) marked "⚠️ verify"`);
    }
    if (errors.length) {
      console.error(errors.join('\n'));
      process.exit(1);
    }
    console.log('OK: content is valid');
  }
}
