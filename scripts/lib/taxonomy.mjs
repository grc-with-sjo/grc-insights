import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

export function loadTaxonomy(root) {
  const t = parse(readFileSync(join(root, '_data/taxonomy.yml'), 'utf8'));
  const ids = list => new Set(list.map(x => x.id));
  return {
    regions: ids(t.regions),
    sectors: ids(t.sectors),
    categories: ids(t.categories),
    series: ids(t.series),
    trackerTypes: new Set(t.tracker_types),
    trackerStatuses: new Set(t.tracker_statuses),
    relevance: new Set(t.relevance),
    standingSectors: t.sectors.filter(s => s.standing).map(s => s.id),
  };
}
