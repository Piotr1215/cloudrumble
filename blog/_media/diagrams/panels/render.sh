#!/usr/bin/env bash
# Render each panel HTML to PNG; the height comes from <body data-h>.
set -eo pipefail
cd "$(dirname "$0")"
files=("$@"); [[ ${#files[@]} -gt 0 ]] || files=(*.html)
for f in "${files[@]}"; do
  [[ -f $f ]] || continue
  h=$(grep -o 'data-h="[0-9]*"' "$f" | grep -o '[0-9]*' || true)
  google-chrome --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=4000 \
    --window-size=1400,"${h:-900}" --screenshot="../${f%.html}.png" "file://$PWD/$f" 2>/dev/null
  echo "rendered ../${f%.html}.png"
done
