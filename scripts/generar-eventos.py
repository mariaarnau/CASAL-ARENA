#!/usr/bin/env python3
"""Convierte las páginas descargadas de roigarena.com/es/eventos en data/eventos.js.
Uso (desde la raíz del repositorio):  python3 scripts/generar-eventos.py
Los partidos del Valencia Basket se omiten (ya salen en la lista de partidos)."""
import glob, html, json, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = sorted(glob.glob(os.path.join(ROOT, "datos-terminal", "eventos-roigarena*.html")))
ev = {}
for f in files:
    s = open(f, encoding="utf8", errors="ignore").read()
    for card in re.findall(r'<article class="m-event-card.*?</article>', s, flags=re.S):
        t = re.search(r'itemprop="name">(.*?)</h3>', card, re.S)
        d = re.search(r'<time[^>]*datetime="([^"]*)"', card)
        u = re.search(r'<meta itemprop="url" content="([^"]*)"', card)
        tm = re.search(r'm-event-card__time">(\d{1,2}:\d{2})<', card)
        if not (t and d and u):
            continue
        title = html.unescape(re.sub(r"<[^>]+>", "", t.group(1))).strip()
        if title.lower().startswith("valencia basket"):
            continue
        m = re.search(r"(\d{2})/(\d{2})/(\d{4})", d.group(1))
        if not m:
            continue
        dd, mm, yy = m.groups()
        hora = tm.group(1) if tm else ""
        fin = re.findall(r"(\d{2})/(\d{2})/(\d{4})", d.group(1))
        hasta = f"{fin[1][2]}-{fin[1][1]}-{fin[1][0]}" if len(fin) > 1 else ""
        ev[u.group(1)] = {"titulo": title, "fecha": f"{yy}-{mm}-{dd}", "hasta": hasta, "hora": hora, "url": "https://www.roigarena.com" + u.group(1)}
out = sorted(ev.values(), key=lambda e: (e["fecha"], e["hora"]))
js = "/* Eventos del Roig Arena (fuente: roigarena.com/es/eventos). Generado por scripts/generar-eventos.py */\nwindow.EVENTOS = {\n  actualizado: \"%s\",\n  url: \"https://www.roigarena.com/es/eventos/\",\n  eventos: [\n" % __import__("datetime").date.today().isoformat()
js += ",\n".join("    " + json.dumps(e, ensure_ascii=False) for e in out) + "\n  ]\n};\n"
open(os.path.join(ROOT, "data", "eventos.js"), "w", encoding="utf8").write(js)
print(len(out), "eventos de", len(files), "páginas")
