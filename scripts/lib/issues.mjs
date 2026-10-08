import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseFrontMatter } from './frontmatter.mjs';

export function readIssues(root) {
  const dir = join(root, '_issues');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => /\.(md|html)$/.test(f))
    .sort()
    .map(file => ({ file, ...parseFrontMatter(readFileSync(join(dir, file), 'utf8')) }));
}
