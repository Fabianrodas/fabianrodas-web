#!/usr/bin/env bash
# Mide Lighthouse (móvil y escritorio) sobre `npm run preview` en / /proyectos/ /notas/.
# Uso: npm run build && npm run preview &  luego  bash scripts/lighthouse.sh
set -euo pipefail
BASE=${BASE:-http://localhost:4321}
for ruta in / /proyectos/ /notas/; do
  for modo in mobile desktop; do
    extra=""; [ "$modo" = desktop ] && extra="--preset=desktop"
    npx -y lighthouse "$BASE$ruta" $extra --quiet --chrome-flags="--headless=new --no-sandbox" \
      --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lh.json >/dev/null
    node -e 'const r=require("/tmp/lh.json");console.log(process.argv[1],Object.values(r.categories).map(c=>c.title+": "+Math.round(c.score*100)).join(" · "))' "$ruta ($modo)"
  done
done
