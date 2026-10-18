import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseSchedule, parseSocial, planJobs, hasPlaceholder, withRef, bskyFacets, graphemes,
  linkedinCommentary, ogTags, addDays, jobKey,
} from '../scripts/syndicate.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(join(root, p), 'utf8');

test('schedule rows map issues to LinkedIn dates and skip non-issue rows', () => {
  const rows = parseSchedule(read('social/linkedin-schedule.md'));
  assert.deepEqual(rows[0], { issue: 1, linkedinDate: '2026-10-13', status: 'Posted' });
  assert.ok(rows.every(r => Number.isInteger(r.issue) && /^\d{4}-\d{2}-\d{2}$/.test(r.linkedinDate)));
  assert.ok(!rows.some(r => r.issue === 0), 'the Radar row has no issue number');
});

test('every scheduled issue with a social file has a reviewed LinkedIn post and comment', () => {
  for (const { issue } of parseSchedule(read('social/linkedin-schedule.md'))) {
    let md;
    try { md = read(`social/issue-${String(issue).padStart(2, '0')}.md`); } catch { continue; }
    const d = parseSocial(md);
    assert.match(d.url, /^https:\/\/grc-with-sjo\.github\.io\/grc-insights\/issues\/.+\/$/);
    assert.ok(d.linkedinPost && !hasPlaceholder(d.linkedinPost), `issue ${issue}: LinkedIn post`);
    assert.ok(d.linkedinComment.includes(d.url), `issue ${issue}: first comment links the issue`);
    for (const p of d.blueskyPosts || []) assert.ok(graphemes(p) <= 300, `issue ${issue}: Bluesky post too long`);
  }
});

test('social parsing drops instructions and the held LinkedIn angle', () => {
  const one = parseSocial(read('social/issue-01.md'));
  assert.equal(one.blueskyPosts.length, 1);
  assert.doesNotMatch(one.blueskyPosts[0], /Card link|Paste the link/);
  assert.match(one.blueskyPosts[0], /#privacy #AIgovernance$/);
  const two = parseSocial(read('social/issue-02.md'));
  assert.doesNotMatch(two.linkedinPost, /held for later|incident/i);
  assert.equal(two.blueskyPosts.length, 5);
  assert.deepEqual(two.autoPost, ['linkedin', 'reminder'], 'thread covers the held incident angle');
  assert.equal(one.autoPost, null);
});

test('a Bluesky thread becomes one post per numbered item', () => {
  const d = parseSocial(read('social/issue-03.md'));
  assert.equal(d.blueskyPosts.length, 5);
  assert.ok(d.blueskyPosts.every((p, i) => p.startsWith(`${i + 1}/ `)));
  assert.ok(d.blueskyPosts[4].includes(d.url));
});

test('jobs: LinkedIn on its date, Bluesky/Mastodon the day after, reminder two days after', () => {
  const schedule = [{ issue: 3, linkedinDate: '2026-10-27', status: '' }];
  assert.deepEqual(planJobs(schedule, '2026-10-26', {}), []);
  assert.deepEqual(planJobs(schedule, '2026-10-27', {}).map(j => j.channel), ['linkedin']);
  assert.deepEqual(planJobs(schedule, '2026-10-28', {}).map(j => j.channel), ['linkedin', 'bluesky', 'mastodon']);
  assert.deepEqual(planJobs(schedule, '2026-10-28', { [jobKey(3, 'linkedin')]: {} }).map(j => j.channel), ['bluesky', 'mastodon']);
  assert.deepEqual(planJobs(schedule, '2026-11-05', {}), [], 'old posts never fire');
  assert.deepEqual(planJobs([{ ...schedule[0], status: 'Posted' }], '2026-10-27', {}), [], 'posted by hand');
});

test('addDays crosses month ends', () => {
  assert.equal(addDays('2026-10-31', 1), '2026-11-01');
});

test('placeholders are detected, arrows are not', () => {
  assert.ok(hasPlaceholder('<Series line for the week it runs.> Link in the comments.'));
  assert.ok(!hasPlaceholder('→ FedRAMP is swapping reviews'));
});

test('ref tags', () => {
  assert.equal(withRef('https://x.io/a/', 'bluesky'), 'https://x.io/a/?ref=bluesky');
  assert.equal(withRef('https://x.io/a/?q=1', 'mastodon'), 'https://x.io/a/?q=1&ref=mastodon');
});

test('Bluesky facets use UTF-8 byte offsets', () => {
  const text = 'Europe → privacy https://x.io/a/?ref=bluesky. #privacy #AIgovernance';
  const bytes = new TextEncoder().encode(text);
  const slice = f => new TextDecoder().decode(bytes.slice(f.index.byteStart, f.index.byteEnd));
  const facets = bskyFacets(text);
  assert.deepEqual(facets.map(slice), ['https://x.io/a/?ref=bluesky', '#privacy', '#AIgovernance']);
  assert.equal(facets[1].features[0].tag, 'privacy');
});

test('LinkedIn commentary escapes reserved characters and keeps hashtags', () => {
  assert.equal(
    linkedinCommentary('ISO 42001 (AI) uses_x\n#GRC #EUAIAct'),
    'ISO 42001 \\(AI\\) uses\\_x\n{hashtag|\\#|GRC} {hashtag|\\#|EUAIAct}',
  );
});

test('og tags are read and decoded', () => {
  const og = ogTags('<meta property="og:title" content="Rules &amp; findings"><meta property="og:image" content="https://x.io/c.png">');
  assert.deepEqual(og, { title: 'Rules & findings', image: 'https://x.io/c.png' });
});
