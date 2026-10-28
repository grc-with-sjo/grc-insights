#!/usr/bin/env bash
# Serve the site exactly as CI built it, for previews before publishing.
# Usage: bash scripts/preview-site.sh <branch> [port]   → http://127.0.0.1:<port>/grc-insights/
set -euo pipefail
branch="${1:?usage: preview-site.sh <branch> [port]}"
port="${2:-4000}"
root="$(git rev-parse --show-toplevel)"
run_id="$(gh run list --branch "$branch" --workflow check.yml --status success --limit 1 --json databaseId --jq '.[0].databaseId // empty')"
if [ -z "$run_id" ]; then
  echo "No successful 'Check site' run found for branch '$branch'. Push it and wait for CI." >&2
  exit 1
fi
dir="$root/.superpowers/preview/${branch//\//-}"
rm -rf "$dir" && mkdir -p "$dir/grc-insights"
gh run download "$run_id" -n site -D "$dir/grc-insights"
echo "Serving CI run $run_id at http://127.0.0.1:$port/grc-insights/"
exec python3 -m http.server "$port" --bind 127.0.0.1 -d "$dir"
