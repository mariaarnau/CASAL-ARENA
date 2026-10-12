#!/usr/bin/env python3
"""Genera las páginas HTML de la web (cabecera y pie compartidos).
Uso, desde la raíz del repositorio:  python3 scripts/build.py
Los textos de carta, horario, partidos y contacto NO están aquí: viven en data/*.js
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
COURT = ''  # diseño minimalista: sin líneas de pista decorativas

NAV = [
    ("quienes-somos.html", "Quiénes somos"),
    ("carta.html", "La carta"),
    ("el-local.html", "El local"),
    ("valencia-basket.html", "Basket y eventos"),
    ("contacto.html", "Contacto"),
]


def head(title, desc, image="assets/img/fachada-noche.jpg"):
    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#08170f">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{image}">
<link rel="icon" type="image/png" href="assets/img/logo-monograma.png">
<link rel="preload" href="assets/fonts/instrument-serif-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="css/fonts.css">
<link rel="stylesheet" href="css/styles.css">
</head>
<body>
"""


def header(active):
    cur = ' aria-current="page"'
    links = "\n".join(
        f'      <a href="{h}"{cur if h == active else ""}>{t}</a>' for h, t in NAV
    )
    return f"""<header class="site-head">
  <div class="site-head__in">
    <a class="brand" href="index.html" aria-label="Casal Arena València, inicio">
      <img src="assets/img/logo-monograma.png" alt="" width="54" height="55">
      <span><b>Casal Arena</b><i>València</i></span>
    </a>
    <nav class="nav" id="nav" aria-label="Principal">
{links}
      <a class="btn btn--solid" data-directions href="#">Cómo llegar</a>
    </nav>
    <button class="menu-btn" id="menuBtn" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav"><span></span><span></span></button>
  </div>
</header>
"""


def footer():
    items = "\n".join(f'        <li><a href="{h}">{t}</a></li>' for h, t in NAV)
    return f"""<footer class="site-foot">
  <div class="wrap">
    <div class="foot">
      <a href="index.html" aria-label="Casal Arena València, inicio"><img src="assets/img/logo-casal-arena.png" alt="Casal Arena València" width="135" height="190" loading="lazy"></a>
      <div>
        <h4>Visítanos</h4>
        <p data-addr></p>
        <p style="margin-top:12px" data-open-status></p>
      </div>
      <div>
        <h4>Explora</h4>
        <ul>
{items}
        </ul>
      </div>
      <div>
        <h4>Síguenos</h4>
        <ul>
          <li><a data-insta href="#">Instagram <span data-insta-user></span></a></li>
          <li><a data-tiktok href="#">TikTok <span data-tiktok-user></span></a></li>
        </ul>
      </div>
    </div>
    <div class="foot__end"><span>© <span data-year></span> Casal Arena València</span><span>Tasca · Cafetería junto al Roig Arena</span></div>
  </div>
</footer>
"""


SCRIPTS = """<script src="data/carta.js"></script>
<script src="data/partidos.js"></script>
<script src="data/eventos.js"></script>
<script src="data/contacto.js"></script>
<script src="js/main.js"></script>
</body>
</html>
"""


def phero(img, eyebrow, title, pos="50% 50%", xl=False, sub=""):
    cls = " phero--xl" if xl else ""
    extra = f'\n    <span class="phero__rule"></span>\n    <p class="phero__sub">{sub}</p>' if xl else ""
    return f"""<section class="phero{cls}">
  <img src="{img}" alt="" style="object-position:{pos}">
  {COURT.format(cls="phero__court")}
  <div class="wrap">
    <p class="eyebrow">{eyebrow}</p>
    <h1 class="display">{title}</h1>{extra}
  </div>
</section>
"""


def page(name, title, desc, active, body, extra="", image="assets/img/fachada-noche.jpg"):
    html = head(title, desc, image) + header(active) + "<main>\n" + body + "</main>\n" + footer() + extra + SCRIPTS
    with open(os.path.join(ROOT, name), "w", encoding="utf-8") as f:
        f.write(html)
    print("OK", name)


STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.6 6.1 20.8l1.2-6.5L2.5 9.7l6.6-.9z"/></svg>'
REVIEWS = f"""<section class="sec darker reviews">
  <div class="wrap reviews__in reveal">
    <div class="reviews__stars" aria-hidden="true">{STAR*5}</div>
    <p class="eyebrow">Tu opinión cuenta</p>
    <h2 class="display h-lg">¿Te ha gustado <em class="serif-i">Casal Arena</em>?</h2>
    <p class="muted reviews__txt">Si has pasado un buen rato con nosotros, nos ayudas muchísimo dejando una reseña en Google. Solo te llevará un minuto.</p>
    <div class="reviews__cta">
      <a class="btn btn--solid" data-reviews target="_blank" rel="noopener" href="#">Dejar una reseña en Google</a>
    </div>
  </div>
</section>

"""

# ============================ INICIO ============================
ticker_items = ["Tasca · Cafetería", "Buen café", "Buen jamón", "Tapeo", "Buena cerveza de bodega", "Junto al Roig Arena", "València"]
ticker = "".join(f'<span class="ticker__item">{t}</span>' for t in ticker_items)

home = f"""<section class="hero">
  <video class="hero__video" id="heroVideo" autoplay muted loop playsinline preload="auto" poster="assets/img/hero-poster.jpg">
    <source src="assets/video/hero.mp4" type="video/mp4">
  </video>
  <div class="hero__shade"></div>
  {COURT.format(cls="hero__court")}
  <div class="wrap hero__body">
    <h1 class="display hero__title" aria-label="Casal Arena"><span><b>Casal</b></span><span><b>Arena</b></span></h1>
    <p class="hero__tag">El rincón del buen sabor, junto al Roig Arena</p>
    <div class="hero__cta">
      <a class="btn btn--solid" href="carta.html">Ver la carta</a>
      <a class="btn" href="valencia-basket.html">Próximos partidos</a>
    </div>
  </div>
  <div class="hero__bar">
    <div class="wrap hero__bar-in">
      <a href="contacto.html"><small>Hoy</small><strong data-open-status>Consulta nuestro horario</strong></a>
      <a href="valencia-basket.html"><small>Próximo partido</small><strong data-next-short>Próximamente</strong></a>
      <a data-directions href="#"><small>Dónde estamos</small><strong data-addr-inline>València</strong></a>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head reveal">
      <div>
        <p class="eyebrow">Descubre</p>
        <h2 class="display h-lg">Entra en Casal Arena</h2>
      </div>
      <p class="muted" style="max-width:38ch;margin:0">Una tasca familiar con alma de pabellón. Elige por dónde empezar.</p>
    </div>
    <div class="tiles">
      <a class="tile reveal" href="quienes-somos.html"><img src="assets/img/local-mural-panoramica.jpg" alt="" loading="lazy"><div class="tile__txt"><div><h3 class="display">Quiénes somos</h3><p>Una familia, un sueño y mucha pasión por el baloncesto.</p></div><span class="tile__go">{ARROW}</span></div></a>
      <a class="tile reveal" href="carta.html"><img src="assets/img/carta-en-sala.jpg" alt="" loading="lazy"><div class="tile__txt"><div><h3 class="display">La carta</h3><p>Tapeo, buen jamón, buen café y cerveza de bodega.</p></div><span class="tile__go">{ARROW}</span></div></a>
      <a class="tile reveal" href="el-local.html"><img src="assets/img/local-pared-letras.jpg" alt="" loading="lazy"><div class="tile__txt"><div><h3 class="display">El local</h3><p>Un mural de naranjas convertidas en balones.</p></div><span class="tile__go">{ARROW}</span></div></a>
      <a class="tile reveal" href="valencia-basket.html"><img src="assets/img/tele-partido.jpg" alt="" loading="lazy"><div class="tile__txt"><div><h3 class="display">Valencia Basket</h3><p>Pantalla grande y ambiente de pabellón a un paso del Roig Arena.</p></div><span class="tile__go">{ARROW}</span></div></a>
    </div>
  </div>
</section>

<section class="sec dark statement">
  {COURT.format(cls="statement__court")}
  <div class="wrap reveal">
    <p class="eyebrow">Nuestra historia</p>
    <blockquote>Somos una familia que siempre soñó con tener <em>un local propio</em>. Hoy, a un paso del Roig Arena, ese sueño se llama <em>Casal Arena</em>.</blockquote>
    <a class="btn" href="quienes-somos.html">Conócenos {ARROW}</a>
  </div>
</section>

<section class="sec dark vive">
  <div class="wrap vive__in">
    <div class="vive__txt reveal">
      <p class="eyebrow">Así se vive</p>
      <h2 class="display h-lg">Cuando se llena, <em class="serif-i">se nota</em></h2>
      <p class="muted">Los días de partido y de concierto, la puerta no para. Ven con tiempo y ponte cómodo: aquí el ambiente forma parte de la experiencia.</p>
      <a class="btn" href="valencia-basket.html">Próximos partidos {ARROW}</a>
    </div>
    <div class="vive__clips reveal">
      <figure class="clip clip--a"><video src="assets/video/lleno-9722.mp4" poster="assets/img/lleno-9722.jpg" autoplay muted loop playsinline preload="metadata" aria-label="Casal Arena lleno de gente en la puerta"></video></figure>
    </div>
  </div>
</section>

<section class="sec light-2">
  <div class="wrap duo">
    <div class="panel panel--dark reveal">
      <p class="eyebrow" style="margin:0">Valencia Basket en pantalla grande</p>
      <h3 class="display">Próximo partido</h3>
      <div class="mini-next" data-next-mini></div>
      <div><a class="btn" href="valencia-basket.html">Ver todos los partidos {ARROW}</a></div>
    </div>
    <div class="panel panel--line reveal">
      <p class="eyebrow" style="margin:0">Cuándo vernos</p>
      <h3 class="display">Horario</h3>
      <table class="hours" data-hours></table>
      <p class="note" data-hours-note></p>
    </div>
  </div>
</section>
"""
home += REVIEWS
page("index.html", "Casal Arena València · Tasca y cafetería junto al Roig Arena",
     "Casal Arena: tasca familiar temática de baloncesto junto al Roig Arena, en València. Carta, horario y los partidos del Valencia Basket en pantalla grande.",
     "", home)

# ============================ QUIÉNES SOMOS ============================
about = phero("assets/img/local-mural-panoramica.jpg", "Nuestra historia", "Quiénes somos", "50% 40%") + f"""
<section class="sec">
  <div class="wrap about">
    <div class="reveal">
      <p class="eyebrow">Una familia</p>
      <p class="lead">Un sueño cumplido, a pie de <em>pabellón</em>.</p>
      <figure class="about__photo">
        <img src="assets/img/inauguracion.jpg" alt="Corte de cinta en la inauguración de Casal Arena, frente al cartel del local" loading="lazy">
        <figcaption>Inauguración de Casal Arena</figcaption>
      </figure>
    </div>
    <div class="about__body reveal">
      <p>Somos una familia que siempre ha soñado con tener un local propio, un lugar donde recibir a la gente como se recibe en casa. Después de mucho esfuerzo e ilusión, ese sueño por fin es una realidad, y hoy nos hace muy felices abrirte sus puertas.</p>
      <p>Hemos querido que Casal Arena nazca junto al Roig Arena, en el corazón de un barrio que respira baloncesto. Por eso hemos tematizado cada rincón con el deporte que más nos apasiona: el mural de naranjas convertidas en balones, los colores de la ciudad y el ambiente de los días de partido son nuestra manera de rendir homenaje a València.</p>
      <p>Aquí encontrarás cocina de tasca para compartir, un trato cercano y una sala pensada para disfrutar con amigos, en familia o antes y después de ver jugar al equipo de la ciudad. Gracias por acompañarnos en este comienzo.</p>
      <p class="sign">La familia de Casal Arena</p>
    </div>
  </div>
</section>

<section class="sec" style="padding-top:0">
  <div class="wrap mosaic reveal">
    <img src="assets/img/local-mural-cojines.jpg" alt="Mural de naranjas con forma de balón y banquetas naranjas" loading="lazy">
    <img src="assets/img/local-mural-detalle.jpg" alt="Detalle del mural de naranjas y balones" loading="lazy">
    <img src="assets/img/mesa-tapas.jpg" alt="Mesa con tapas y cervezas" loading="lazy" style="object-position:50% 40%">
    <img src="assets/img/local-pared-casal-arena.jpg" alt="Pared con el nombre Casal Arena" loading="lazy" style="grid-column: span 2">
  </div>
</section>

<section class="sec dark">
  <div class="wrap inaug">
    <div class="reveal">
      <p class="eyebrow">Así se vivió</p>
      <h2 class="display h-lg">El día de la inauguración</h2>
      <p class="muted" style="max-width:36ch;margin-top:20px">Así fue el día en que abrimos las puertas de Casal Arena.</p>
    </div>
    <div class="inaug__video reveal">
      <video controls playsinline preload="metadata" poster="assets/img/inauguracion-poster.jpg" aria-label="Vídeo de la inauguración de Casal Arena">
        <source src="assets/video/inauguracion.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</section>

<section class="sec darker">
  <div class="wrap">
    <p class="eyebrow reveal">Lo que nos mueve</p>
    <div class="pillars reveal">
      <div class="pillar"><h3 class="display">Familia</h3><p>Casal Arena nace del sueño de una familia que quería tener su propio local y recibirte como en casa.</p></div>
      <div class="pillar"><h3 class="display">Baloncesto</h3><p>Es nuestra gran pasión, y está en cada rincón: del mural de naranjas-balón a la pantalla de los días de partido.</p></div>
      <div class="pillar"><h3 class="display">València</h3><p>Estamos en Quatre Carreres, a un paso del Roig Arena, en un barrio que respira deporte y ciudad.</p></div>
    </div>
  </div>
</section>

<section class="sec light-2">
  <div class="wrap" style="display:flex;flex-wrap:wrap;gap:24px 48px;justify-content:space-between;align-items:center">
    <h2 class="display h-lg reveal">Ven a conocernos</h2>
    <div class="reveal" style="display:flex;flex-wrap:wrap;gap:14px">
      <a class="btn btn--solid" href="carta.html">Ver la carta</a>
      <a class="btn" style="color:var(--pine-900)" data-directions href="#">Cómo llegar</a>
    </div>
  </div>
</section>
"""
page("quienes-somos.html", "Quiénes somos · Casal Arena València",
     "Somos una familia con el sueño de tener un local propio, junto al Roig Arena y tematizado con nuestra pasión: el baloncesto.",
     "quienes-somos.html", about, image="assets/img/local-mural-panoramica.jpg")

# ============================ CARTA ============================
lightbox = """<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Foto ampliada" hidden>
  <button class="vbtn" id="lbClose" type="button" aria-label="Cerrar">×</button>
  <img id="lbImg" alt="">
</div>
"""

taste = "".join(f"<div>{t}</div>" for t in ["Buen café", "Buen jamón", "Tapeo", "Buena cerveza de bodega"])
def plato(cls, src, alt, titulo, texto):
    return (f'<figure class="plato {cls} reveal"><button type="button" data-src="{src}" data-alt="{alt}">'
            f'<img src="{src}" alt="{alt}" loading="lazy"></button>'
            f'<figcaption><b>{titulo}</b><span>{texto}</span></figcaption></figure>')

platos = "\n    ".join([
    plato("plato--a", "assets/img/comida/embutido-iberico.jpg", "Plato de embutidos ibéricos con picos y frutos secos", "Embutidos y jamón ibérico", "Para compartir en mesa"),
    plato("plato--b", "assets/img/comida/focaccia-pulled-pork.jpg", "Focaccia de pulled pork con queso", "Focaccia de pulled pork", "Con queso fundido"),
    plato("plato--c", "assets/img/comida/tabla-quesos.jpg", "Tabla de quesos con uvas, nueces y mermelada", "Tabla de quesos", "Uvas, nueces y mermelada"),
    plato("plato--d", "assets/img/comida/bocadillos-mostrador.jpg", "Bocadillos en el mostrador", "Bocadillos del mostrador", "Pan crujiente"),
    plato("plato--e", "assets/img/comida/ensaladilla-rusa.jpg", "Ensaladilla rusa con picos", "Ensaladilla rusa", "Con picos y pimentón"),
    plato("plato--f", "assets/img/comida/cerveza-bodega.jpg", "Cañas de cerveza de bodega y tinto de verano en la barra", "Cerveza de bodega", "Y tinto de verano"),
    plato("plato--g", "assets/img/comida/focaccia-mortadela.jpg", "Focaccia de mortadela sobre la mesa", "Focaccia de mortadela", "Para acompañar las cañas"),
])

def foto(src, alt):
    return f'<button type="button" data-src="{src}" data-alt="{alt}"><img src="{src}" alt="{alt}" loading="lazy"></button>'
mas = "\n    ".join([
    foto("assets/img/comida/nachos.jpg", "Nachos con guacamole"),
    foto("assets/img/comida/cafe.jpg", "Café sobre la barra"),
    foto("assets/img/comida/hummus.jpg", "Hummus con picos"),
    foto("assets/img/comida/cookies.jpg", "Cookies de doble chocolate"),
    foto("assets/img/comida/aperitivo.jpg", "Copa de aperitivo con naranja y aceituna"),
    foto("assets/img/comida/mesa-tapas-2.jpg", "Mesa con tapas, cerveza y tinto de verano"),
])
carta = phero("assets/img/comida/embutido-iberico.jpg", "Tasca · Cafetería", "La carta", "50% 55%") + f"""
<section class="sec darker" style="padding-block:0">
  <div class="wrap"><div class="taste">{taste}</div></div>
</section>


<section class="sec darker">
  <div class="wrap">
    <div class="sec-head reveal">
      <div><p class="eyebrow">De la barra a la mesa</p><h2 class="display h-lg">Hecho para <em class="serif-i">compartir</em></h2></div>
      <p class="muted" style="max-width:34ch;margin:0">Pulsa en cualquier foto para verla en grande.</p>
    </div>
    <div class="platos" data-lightbox>
    {platos}
    </div>
  </div>
</section>

<section class="sec light-2">
  <div class="wrap">
    <div class="sec-head reveal">
      <div><p class="eyebrow">Más de la mesa</p><h2 class="display h-lg">Un poco de todo</h2></div>
      <p class="muted" style="max-width:34ch;margin:0">Nachos, hummus, cookies, café y algo para el aperitivo.</p>
    </div>
    <div class="masonry masonry--sq" data-lightbox>
    {mas}
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head reveal">
      <div><p class="eyebrow">Nuestra carta</p><h2 class="display h-lg">Tal y como la tienes en mesa</h2></div>
      <button class="btn btn--solid" type="button" data-open-carta="0">Ver a pantalla completa</button>
    </div>
    <div class="cartapages reveal" id="cartaPages"></div>
    <details class="textcarta" id="carta-texto">
      <summary>Ver la carta en texto</summary>
      <div class="sheets" id="sheets"></div>
    </details>
    <p class="muted" data-carta-nota style="margin-top:24px;text-align:center"></p>
  </div>
</section>
"""
viewer = """<div class="viewer" id="viewer" role="dialog" aria-modal="true" aria-label="Carta de Casal Arena" hidden>
  <div class="viewer__bar">
    <span>Carta · Casal Arena</span>
    <div>
      <a class="btn" id="viewerPdf" href="#" download hidden style="padding:10px 16px">Descargar PDF</a>
      <button class="btn" id="viewerPrint" type="button" style="padding:10px 16px">Imprimir</button>
      <button class="vbtn" id="viewerClose" type="button" aria-label="Cerrar">×</button>
    </div>
  </div>
  <div class="viewer__scroll" id="viewerBody"></div>
</div>
"""
page("carta.html", "La carta · Casal Arena València",
     "Carta de Casal Arena: tapeo, buen jamón, buen café y cerveza de bodega, con precios, junto al Roig Arena en València.",
     "carta.html", carta, extra=viewer + lightbox, image="assets/img/comida/embutido-iberico.jpg")

# ============================ EL LOCAL ============================
def shot(src, alt):
    return f'<button type="button" data-src="{src}" data-alt="{alt}"><img src="{src}" alt="{alt}" loading="lazy"></button>'

def clip(src, poster):
    return f'<div class="is-video"><video src="{src}" poster="{poster}" autoplay muted loop playsinline preload="metadata" aria-label="Vídeo del local"></video></div>'

gallery = "\n    ".join([
    shot("assets/img/local-mural-panoramica.jpg", "Mural de naranjas y balones sobre la zona de banquetas"),
    shot("assets/img/local-pared-letras.jpg", "Pared con el nombre Casal Arena y mural"),
    clip("assets/video/clip-7974.mp4", "assets/img/clip-7974.jpg"),
    shot("assets/img/fachada-noche.jpg", "Fachada de Casal Arena de noche"),
    shot("assets/img/carta-en-sala.jpg", "Nuestra carta ilustrada sobre la mesa"),
    shot("assets/img/plato-guiso.jpg", "Guiso con pan y aceitunas"),
    shot("assets/img/local-mural-detalle.jpg", "Detalle del mural de naranjas y balones"),
    shot("assets/img/local-sala-luces.jpg", "Sala con luces de colores"),
    shot("assets/img/mesa-tapas.jpg", "Mesa con tapas y cervezas"),
    clip("assets/video/clip-7869.mp4", "assets/img/clip-7869.jpg"),
    shot("assets/img/local-sala.jpg", "Sala principal de Casal Arena"),
    shot("assets/img/local-mural-cojines.jpg", "Mural y banquetas naranjas"),
    shot("assets/img/local-barra-cobre.jpg", "La barra con los depósitos de cobre"),
    shot("assets/img/fachada-noche-2.jpg", "Casal Arena iluminado de noche"),
])
local = phero("assets/img/local-pared-casal-arena.jpg", "Un rincón con sabor a València", "El local", "50% 45%") + f"""
<section class="sec">
  <div class="wrap">
    <div class="sec-head reveal">
      <p class="lead" style="max-width:26ch">Un mural de naranjas convertidas en <em>balones</em>, banquetas naranjas y luz cálida.</p>
      <p class="muted" style="max-width:36ch;margin:0">Pulsa en cualquier foto para verla en grande.</p>
    </div>
    <div class="masonry" data-lightbox>
    {gallery}
    </div>
  </div>
</section>

<section class="sec dark">
  <div class="wrap duo">
    <div class="panel reveal">
      <p class="eyebrow" style="margin:0">Cuándo vernos</p>
      <h2 class="display h-lg">Horario</h2>
      <table class="hours" data-hours></table>
      <p class="note" data-hours-note></p>
    </div>
    <div class="panel reveal">
      <p class="eyebrow" style="margin:0">Dónde estamos</p>
      <h2 class="display h-lg">A un paso del Roig Arena</h2>
      <p data-addr></p>
      <div><a class="btn btn--solid" data-directions href="#">Cómo llegar {ARROW}</a></div>
    </div>
  </div>
</section>
"""
page("el-local.html", "El local · Casal Arena València",
     "Conoce el local de Casal Arena: un mural de naranjas convertidas en balones, banquetas naranjas y ambiente cálido junto al Roig Arena.",
     "el-local.html", local, extra=lightbox, image="assets/img/local-pared-casal-arena.jpg")

# ============================ VALENCIA BASKET ============================
basket = phero("assets/img/tele-partido.jpg", "Valencia Basket y eventos del Roig Arena", "Vive el <em>partido</em>", "50% 35%", xl=True, sub="Liga Endesa en pantalla grande") + f"""
<section class="sec">
  <div class="wrap">
    <div class="sec-head reveal">
      <img class="vb-logo" src="assets/img/valencia-basket-logo.png" alt="Valencia Basket" width="112" height="150">
      <p class="lead" style="max-width:24ch">Pantalla grande y ambiente de <em>pabellón</em>.</p>
      <p class="muted" style="max-width:46ch;margin:0">Retransmitimos los partidos de la Liga Endesa del Valencia Basket. Estamos a un paso del Roig Arena: ven a verlos con nosotros, antes, durante o después del partido, y disfruta del ambiente de la ciudad.</p>
    </div>

    <div class="board reveal" id="board">
      {COURT.format(cls="board__court")}
      <div>
        <p class="board__lab">Próximo partido</p>
        <div class="display board__vs"><span id="boardHome"></span><i>vs</i><span id="boardAway"></span></div>
        <p class="board__meta" id="boardMeta"></p>
      </div>
      <div class="count" id="boardCount" aria-live="off"></div>
    </div>

    <div class="chips" role="group" aria-label="Filtrar partidos">
      <button class="chip" type="button" data-filter="all" aria-pressed="true">Todos</button>
      <button class="chip" type="button" data-filter="home" aria-pressed="false">En el Roig Arena</button>
    </div>
    <div id="fixtures"></div>
    <p style="margin-top:28px"><button class="btn" type="button" id="moreFx" style="color:var(--pine-900)" hidden>Ver más partidos</button></p>
    <p class="muted" style="margin-top:36px;font-size:.92rem">Partidos de la Liga Endesa del equipo masculino, según la web oficial del club. Fechas y horarios sujetos a cambios.</p>
    <p style="margin-top:20px"><a class="btn" style="color:var(--pine-900)" data-calendar href="#">Ver calendario completo {ARROW}</a></p>
  </div>
</section>

<section class="sec light-2" id="eventos">
  <div class="wrap">
    <div class="sec-head reveal">
      <div><p class="eyebrow">Roig Arena</p><h2 class="display h-lg">Eventos en el Roig Arena</h2></div>
      <p class="muted" style="max-width:44ch;margin:0">Conciertos y espectáculos a un paso de nuestra puerta. Ven antes a tomar algo o después a cenar.</p>
    </div>
    <div id="eventsList"></div>
    <p style="margin-top:28px"><button class="btn" type="button" id="moreEv" hidden>Ver más eventos</button></p>
    <p class="muted" style="margin-top:28px;font-size:.88rem">Programación del Roig Arena. Fechas y horarios sujetos a cambios.</p>
    <p style="margin-top:16px"><a class="btn" id="allEvents" target="_blank" rel="noopener" href="https://www.roigarena.com/es/eventos/">Ver todos los eventos {ARROW}</a></p>
  </div>
</section>

<section class="sec dark">
  <div class="wrap" style="display:flex;flex-wrap:wrap;gap:24px 48px;justify-content:space-between;align-items:center">
    <div class="reveal"><p class="eyebrow" style="margin:0 0 6px" data-open-status></p><h2 class="display h-lg">Ven a verlo con nosotros</h2></div>
    <div class="reveal" style="display:flex;flex-wrap:wrap;gap:14px">
      <a class="btn btn--solid" data-directions href="#">Cómo llegar</a>
      <a class="btn" data-insta href="#">Escríbenos en Instagram</a>
    </div>
  </div>
</section>
"""
page("valencia-basket.html", "Valencia Basket · Casal Arena València",
     "Ve los partidos del Valencia Basket en pantalla grande en Casal Arena, a un paso del Roig Arena. Próximos partidos de la Liga Endesa.",
     "valencia-basket.html", basket, image="assets/img/tele-partido.jpg")

# ============================ CONTACTO ============================
contacto = phero("assets/img/fachada-noche.jpg", "Te esperamos en casa", "Contacto", "50% 45%") + f"""
<section class="sec">
  <div class="wrap contact">
    <div class="info reveal">
      <div>
        <h3 class="display">Dónde estamos</h3>
        <p data-addr></p>
        <p class="muted" style="margin-top:6px">Precio medio: <span data-price></span></p>
        <p style="margin-top:16px"><a class="btn btn--solid" data-directions href="#">Cómo llegar {ARROW}</a></p>
      </div>
      <div>
        <h3 class="display">Horario</h3>
        <table class="hours" data-hours></table>
        <p class="note" style="margin-top:12px" data-hours-note></p>
      </div>
      <div>
        <h3 class="display">Escríbenos</h3>
        <p style="margin-bottom:16px">Puedes contactar con nosotros a través de nuestras redes sociales.</p>
        <div class="social">
          <a data-insta href="#"><small>Instagram</small><strong data-insta-user></strong></a>
          <a data-tiktok href="#"><small>TikTok</small><strong data-tiktok-user></strong></a>
        </div>
      </div>
    </div>
    <div class="map reveal"><iframe id="mapFrame" title="Mapa de Casal Arena" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
  </div>
</section>
"""
contacto += REVIEWS
page("contacto.html", "Contacto · Casal Arena València",
     "Dónde estamos, horario y redes sociales de Casal Arena, tasca y cafetería junto al Roig Arena en València.",
     "contacto.html", contacto, image="assets/img/fachada-noche.jpg")
