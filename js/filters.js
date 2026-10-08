export function matches(tokens, active) {
  const set = new Set(tokens);
  return Object.entries(active).every(([group, value]) => !value || set.has(`${group}:${value}`));
}

if (typeof document !== 'undefined') {
  for (const root of document.querySelectorAll('[data-filter-root]')) {
    const active = {};
    const items = [...root.querySelectorAll('[data-filters]')];
    const empty = root.querySelector('[data-filter-empty]');
    root.addEventListener('click', event => {
      const button = event.target.closest('[data-filter-group]');
      if (!button) return;
      const group = button.dataset.filterGroup;
      active[group] = button.dataset.filterValue || null;
      for (const b of root.querySelectorAll(`[data-filter-group="${group}"]`)) {
        b.setAttribute('aria-pressed', String(b === button));
      }
      let shown = 0;
      for (const item of items) {
        const ok = matches(item.dataset.filters.trim().split(/\s+/), active);
        item.hidden = !ok;
        if (ok) shown += 1;
      }
      if (empty) empty.hidden = shown > 0;
    });
  }
}
