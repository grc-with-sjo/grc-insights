// Feed parsing and filtering for the Radar watch (scripts/radar-watch.mjs). No dependencies:
// the feeds we read are simple RSS 2.0, Atom, or the Federal Register's JSON API.

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function decode(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? decode(m[1]) : '';
}

function isoDay(s) {
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}

export function parseFeed(text, kind) {
  if (kind === 'fedreg') {
    return (JSON.parse(text).results ?? []).map(r => ({ title: r.title, link: r.html_url, date: r.publication_date }));
  }
  if (kind === 'atom') {
    return [...text.matchAll(/<entry[\s>][\s\S]*?<\/entry>/gi)].map(([b]) => ({
      title: tag(b, 'title'),
      link: (b.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"/i) || b.match(/<link[^>]*href="([^"]+)"/i) || [])[1] ?? '',
      date: isoDay(tag(b, 'updated') || tag(b, 'published')),
    }));
  }
  return [...text.matchAll(/<item[\s>][\s\S]*?<\/item>/gi)].map(([b]) => ({
    title: tag(b, 'title'),
    link: tag(b, 'link'),
    date: isoDay(tag(b, 'pubDate') || tag(b, 'dc:date')),
  }));
}

// Short keywords ("AI") match whole words only, so "air" or "said" do not count.
export function isRelevant(title, keywords) {
  const t = title.toLowerCase();
  return keywords.some(k => {
    const kw = String(k).trim().toLowerCase();
    return kw.length <= 3 ? new RegExp(`\\b${kw.replace(/[^a-z0-9]/g, '')}\\b`).test(t) : t.includes(kw);
  });
}

export function itemKey(item) {
  return `${item.link}|${item.title}`;
}

// Unseen, relevant items dated within `days` of `today`; marks each returned item as seen.
export function selectNew(items, { seen, keywords, today, days }) {
  const cutoff = new Date(Date.parse(today) - days * 86400000).toISOString().slice(0, 10);
  const out = [];
  for (const item of items) {
    const key = itemKey(item);
    if (seen.has(key) || !item.date || item.date < cutoff || !isRelevant(item.title, keywords)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}
