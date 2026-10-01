#!/usr/bin/env bash
# Ver la web en tu ordenador y que se actualice sola.
# Uso (una sola vez, desde la carpeta del repositorio):  bash scripts/ver-web.sh
# Luego abre http://localhost:8000 y, cuando haya cambios, solo recarga la pestaña (Cmd+R).
# Cada 10 segundos baja los cambios nuevos de la rama. Para parar: Ctrl+C.
BRANCH="claude/inspiring-einstein-ezq7tr"
cd "$(dirname "$0")/.." || exit 1
git checkout "$BRANCH" >/dev/null 2>&1
git pull -q origin "$BRANCH"
( while true; do sleep 10; git pull -q origin "$BRANCH" >/dev/null 2>&1; done ) &
PULLER=$!
trap 'kill $PULLER 2>/dev/null' EXIT
echo "Web en http://localhost:8000  (Ctrl+C para parar)"
python3 -m http.server 8000
