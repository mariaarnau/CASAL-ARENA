#!/usr/bin/env bash
# Ejecutar en TU ordenador (con internet normal), desde la raíz del repositorio:
#   bash scripts/descargar-datos.sh
# Descarga el calendario del Valencia Basket y la ficha de Google Maps a datos-terminal/
# para que Claude pueda analizarlos. Después: git add datos-terminal && git commit && git push
set -u
OUT="datos-terminal"; mkdir -p "$OUT"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 Safari/605.1.15"
get() { curl -sL -A "$UA" -H "Accept-Language: es-ES,es;q=0.9" --max-time 30 "$1" -o "$OUT/$2" && echo "OK  $2 ($(wc -c < "$OUT/$2") bytes)" || echo "FALLO $2"; }
get "https://www.valenciabasket.com/en/male-calendar" calendario-valenciabasket.html
get "https://www.valenciabasket.com/en/calendar" calendario-valenciabasket-2.html
get "https://www.google.com/maps/place/Casal+Arena+Valencia/@39.4479015,-0.3682963,17z/data=!4m7!3m6!1s0xd6049000ac446b3:0x76cd4de045ecf34f!8m2!3d39.4479015!4d-0.3657214!10e9!16s%2Fg%2F11nw2dgl39?hl=es" maps-casal-arena.html
echo "Hecho. Sube la carpeta $OUT al repositorio."
