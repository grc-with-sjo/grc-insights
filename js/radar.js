function addDays(iso, days) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function upcomingDates(rows, todayIso, days = 90) {
  const end = addDays(todayIso, days);
  return rows
    .flatMap(r => (r.key_dates || []).map(k => ({ date: String(k.date), what: k.what, name: r.name, id: r.id, region: r.region })))
    .filter(x => x.date >= todayIso && x.date <= end)
    .sort((a, b) => a.date.localeCompare(b.date));
}

const escapeHtml = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function localToday() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

if (typeof document !== 'undefined') {
  const dataEl = document.getElementById('radar-data');
  if (dataEl) {
    let rows = [];
    try { rows = JSON.parse(dataEl.textContent || '[]') || []; } catch { rows = []; }
    const radarUrl = dataEl.dataset.radarUrl;
    for (const list of document.querySelectorAll('[data-upcoming]')) {
      const days = Number(list.dataset.days || 90);
      const limit = Number(list.dataset.limit || 0) || Infinity;
      const items = upcomingDates(rows, localToday(), days).slice(0, limit);
      list.innerHTML = items.length
        ? items.map(x => `<li><time datetime="${x.date}">${x.date}</time><a href="${radarUrl}#${escapeHtml(x.id)}">${escapeHtml(x.name)}</a>: ${escapeHtml(x.what)}</li>`).join('')
        : `<li class="muted">Nothing scheduled in the next ${days} days.</li>`;
    }
  }
}
