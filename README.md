# Casal Arena València – web

Web estática de 6 páginas (HTML + CSS + JS, sin dependencias ni servidor). Abrir `index.html` o servir con `python3 -m http.server`.

Páginas: `index.html`, `quienes-somos.html`, `carta.html`, `el-local.html`, `valencia-basket.html`, `contacto.html`.

## Qué editar
- `data/carta.js` – páginas originales de la carta (`paginas`, imágenes en `assets/img/carta/`) y versión en texto (`hojas`). La carta real (transcrita de la carta de Google Maps, sept 2026) con precios y alérgenos. Los iconos "huevo", "sesamo", "soja" y "frutos" no tienen nombre confirmado: revisar con la leyenda oficial.
- `data/partidos.js` – partidos del Valencia Basket (calendario oficial descargado el 2026-10-01). Los pasados se ocultan solos.
- `data/contacto.js` – dirección, horario y redes sociales. El estado «abierto ahora» se calcula con este horario.
- Cabecera, pie y textos de las páginas: `scripts/build.py`; después ejecutar `python3 scripts/build.py` para regenerar los HTML.
- `scripts/descargar-datos.sh` – descarga el calendario oficial para actualizarlo.

## Archivos
- `assets/` – imágenes, vídeo y fuentes (Barlow Condensed, Instrument Serif, Manrope y EB Garamond para la carta, alojadas en el propio sitio).
- `originales/` – material original sin tocar.
- Logo: `logo-casal-arena.png` (dorado, fondos oscuros) y `logo-casal-arena-oscuro.png` (fondos claros). Transparentes.
