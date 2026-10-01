(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  };
  var money = function (p) {
    return p == null ? "—" : Number(p).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  };
  var TZ = "Europe/Madrid";
  var fmt = function (d, o) { return new Intl.DateTimeFormat("es-ES", Object.assign({ timeZone: TZ }, o)).format(d); };
  var K = window.CONTACTO || {};
  var C = window.CARTA || { categorias: [] };
  var P = window.PARTIDOS || { partidos: [] };

  /* ---------- Menú móvil ---------- */
  var menuBtn = $("#menuBtn"), nav = $("#nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open);
      document.body.classList.toggle("is-locked", open);
    });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  var rev = $$(".reveal");
  if ("IntersectionObserver" in window && rev.length) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: "0px 0px -6% 0px" });
    rev.forEach(function (n) { io.observe(n); });
  } else { rev.forEach(function (n) { n.classList.add("is-in"); }); }

  /* ---------- Vídeo hero: respeta "reducir movimiento" ---------- */
  var hv = $("#heroVideo");
  if (hv && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { hv.removeAttribute("autoplay"); hv.pause(); }

  /* ---------- Horario y estado "abierto ahora" ---------- */
  function madridNow() {
    var parts = {};
    new Intl.DateTimeFormat("en-GB", { timeZone: TZ, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false })
      .formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    var wd = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 }[parts.weekday];
    return { day: wd, min: (parseInt(parts.hour, 10) % 24) * 60 + parseInt(parts.minute, 10) };
  }
  function parseRange(txt) {
    var m = /(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/.exec(txt || "");
    if (!m) return null;
    var a = +m[1] * 60 + +m[2], b = +m[3] * 60 + +m[4];
    if (b <= a) b += 1440;
    return { a: a, b: b, open: m[1] + ":" + m[2], close: m[3] + ":" + m[4] };
  }
  function statusHTML() {
    var H = K.horario || [];
    if (H.length !== 7) return "";
    var n = madridNow(), today = parseRange(H[n.day][1]);
    var prev = parseRange(H[(n.day + 6) % 7][1]); // cierre pasada la medianoche del día anterior
    if (prev && prev.b > 1440 && n.min < prev.b - 1440) {
      return '<span class="dot"></span>Abierto ahora · hasta las ' + prev.close;
    }
    if (today && n.min >= today.a && n.min < today.b) return '<span class="dot"></span>Abierto ahora · hasta las ' + today.close;
    if (today && n.min < today.a) return '<span class="dot dot--off"></span>Cerrado · abrimos hoy a las ' + today.open;
    for (var i = 1; i <= 7; i++) {
      var d = (n.day + i) % 7, r = parseRange(H[d][1]);
      if (r) return '<span class="dot dot--off"></span>Cerrado · abrimos ' + (i === 1 ? "mañana" : "el " + H[d][0].toLowerCase()) + " a las " + r.open;
    }
    return "";
  }
  $$("[data-open-status]").forEach(function (el) { el.innerHTML = statusHTML(); });
  $$("[data-hours]").forEach(function (t) {
    var n = madridNow();
    t.innerHTML = (K.horario || []).map(function (r, i) {
      return '<tr' + (i === n.day ? ' class="is-today"' : "") + "><td>" + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td></tr>";
    }).join("");
  });
  $$("[data-hours-note]").forEach(function (el) { el.textContent = K.horarioNota || ""; });

  /* ---------- Datos de contacto ---------- */
  var q = encodeURIComponent(K.mapsQuery || "Casal Arena Valencia");
  $$("[data-addr]").forEach(function (el) { el.innerHTML = (K.direccion || []).map(esc).join("<br>"); });
  $$("[data-addr-inline]").forEach(function (el) { el.textContent = (K.direccion || []).slice(0, 1).concat((K.direccion || []).slice(2)).join(", "); });
  $$("[data-directions]").forEach(function (a) { a.href = "https://www.google.com/maps/search/?api=1&query=" + q; a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-insta]").forEach(function (a) { a.href = K.instagram || "#"; a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-tiktok]").forEach(function (a) { a.href = K.tiktok || "#"; a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-insta-user]").forEach(function (el) { el.textContent = K.instagramUser || ""; });
  $$("[data-tiktok-user]").forEach(function (el) { el.textContent = K.tiktokUser || ""; });
  $$("[data-price]").forEach(function (el) { el.textContent = K.precioMedio || ""; });
  $$("[data-calendar]").forEach(function (a) { a.href = K.calendarioBasket || "#"; a.target = "_blank"; a.rel = "noopener"; });
  var mf = $("#mapFrame");
  if (mf) mf.src = "https://www.google.com/maps?q=" + q + "&output=embed";
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Partidos ---------- */
  function upcoming() {
    var cut = Date.now() - 2 * 3600 * 1000; // el partido sigue visible 2 h después del inicio
    return P.partidos.map(function (m) { return Object.assign({}, m, { d: new Date(m.fecha) }); })
      .filter(function (m) { return m.d.getTime() > cut; }).sort(function (a, b) { return a.d - b.d; });
  }
  function slug(n) { return n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function crest(n) { return '<img class="crest" src="assets/img/clubes/' + slug(n) + '.png" alt="" width="40" height="40" loading="lazy" onerror="this.style.visibility=\'hidden\'">'; }
  function team(n) { return '<span class="fx__team">' + crest(n) + "<span>" + esc(n) + "</span></span>"; }
  function teams(m) { return m.local ? ["Valencia Basket", m.rival] : [m.rival, "Valencia Basket"]; }
  function whenText(m) {
    return fmt(m.d, { weekday: "long", day: "numeric", month: "long" }) + " · " + fmt(m.d, { hour: "2-digit", minute: "2-digit" }) + " h";
  }
  var list = upcoming(), next = list[0];

  $$("[data-next-mini]").forEach(function (el) {
    if (!next) { el.innerHTML = '<p class="when">Pronto publicaremos los próximos partidos.</p>'; return; }
    var t = teams(next);
    el.innerHTML = '<span class="vs">' + esc(t[0]) + " <i>vs</i> " + esc(t[1]) + '</span><span class="when">' + esc(whenText(next)) + " · " + esc(next.comp) + (next.local ? " · Roig Arena" : "") + "</span>";
  });
  $$("[data-next-short]").forEach(function (el) {
    if (!next) { el.textContent = "Próximamente"; return; }
    var t = teams(next), rival = next.local ? t[1] : t[0];
    el.textContent = rival + " · " + fmt(next.d, { weekday: "short", day: "numeric", month: "short" }).replace(/\./g, "") + " " + fmt(next.d, { hour: "2-digit", minute: "2-digit" });
  });

  var board = $("#board");
  if (board && next) {
    var bt = teams(next);
    $("#boardHome").textContent = bt[0]; $("#boardAway").textContent = bt[1];
    $("#boardMeta").textContent = whenText(next) + " · " + next.comp + (next.local ? " · En el Roig Arena" : " · Fuera de casa");
    var cnt = $("#boardCount");
    (function tick() {
      var s = Math.floor((next.d - Date.now()) / 1000);
      if (s <= 0) { cnt.innerHTML = "<div><b>¡Ya!</b><small>en juego</small></div>"; return; }
      var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
      cnt.innerHTML = [[d, "días"], [h, "horas"], [m, "min"]].map(function (x) { return "<div><b>" + x[0] + "</b><small>" + x[1] + "</small></div>"; }).join("");
      setTimeout(tick, 30000);
    })();
  } else if (board) { board.hidden = true; }

  var fxBox = $("#fixtures");
  if (fxBox) {
    var filter = "all", limit = 12, more = $("#moreFx");
    more.addEventListener("click", function () { limit += 12; draw(); });
    var draw = function () {
      var all = list.filter(function (m) { return filter === "all" || (filter === "home" ? m.local : m.comp === filter); });
      var shown = all.slice(0, limit);
      more.hidden = all.length <= limit;
      if (!shown.length) { fxBox.innerHTML = '<p class="empty">No hay partidos con este filtro.</p>'; return; }
      var html = "", cur = "";
      shown.forEach(function (m) {
        var mk = fmt(m.d, { month: "long", year: "numeric" });
        if (mk !== cur) { cur = mk; html += '<h3 class="month">' + esc(mk.charAt(0).toUpperCase() + mk.slice(1)) + "</h3>"; }
        var t = teams(m);
        html += '<article class="fx"><div class="fx__d"><b>' + fmt(m.d, { day: "2-digit" }) + "</b><span>" + esc(fmt(m.d, { weekday: "short" }).replace(".", "")) + "</span></div>" +
          '<div class="fx__t">' + team(t[0]) + "<i>vs</i>" + team(t[1]) + "</div>" +
          '<div class="fx__c"><span class="tag">' + esc(m.comp) + "</span>" +
          (m.local ? '<span class="tag tag--home">Roig Arena</span>' : '<span class="tag tag--away">A domicilio</span>') + "</div>" +
          '<div class="fx__h">' + fmt(m.d, { hour: "2-digit", minute: "2-digit" }) + "</div></article>";
      });
      fxBox.innerHTML = html;
    };
    $$("[data-filter]").forEach(function (b) {
      b.addEventListener("click", function () {
        filter = b.dataset.filter; limit = 12;
        $$("[data-filter]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        draw();
      });
    });
    draw();
  }

  /* ---------- Carta ---------- */
  var G = '<svg viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var GEN = "Alérgeno: consulta con el personal";
  var AL = {
    gluten: ["Cereales con gluten", '<path fill="none" d="M12 21V8M12 10c-2-1-3-2-3-4.5M12 10c2-1 3-2 3-4.5M12 14c-2-1-3-2-3-4.5M12 14c2-1 3-2 3-4.5M12 18c-2-1-3-2-3-4.5M12 18c2-1 3-2 3-4.5"/>'],
    lacteos: ["Lácteos", '<path d="M9.5 4h5v3l2.5 2.5V20H7V9.5L9.5 7z"/>'],
    pescado: ["Pescado", '<path d="M3 12c3-4.5 8-5.5 12-1.5l5-3v9l-5-3c-4 4-9 3-12-1.5z"/>'],
    moluscos: ["Moluscos", '<path d="M12 20L4.5 10a8 8 0 0 1 15 0z"/>'],
    huevo: [GEN, '<path d="M12 4c3.2 0 5.5 5 5.5 9a5.5 5.5 0 0 1-11 0c0-4 2.3-9 5.5-9z"/>'],
    sesamo: [GEN, '<circle cx="8" cy="9" r="1.7"/><circle cx="15" cy="8" r="1.7"/><circle cx="12" cy="15" r="1.7"/><circle cx="17" cy="15" r="1.4"/>'],
    soja: [GEN, '<circle cx="12" cy="8" r="3"/><circle cx="8" cy="14.5" r="3"/><circle cx="16" cy="14.5" r="3"/>'],
    frutos: [GEN, '<path d="M12 3.5c3 3.5 5.5 6 5.5 9.5a5.5 5.5 0 0 1-11 0c0-3.5 2.5-6 5.5-9.5z"/>']
  };
  function alIcons(a) {
    return (a || []).map(function (k) {
      if (k === "so2") return '<i class="al al--so2" title="Sulfitos" aria-label="Sulfitos">SO<sub>2</sub></i>';
      var d = AL[k]; if (!d) return "";
      return '<i class="al al--' + k + '" title="' + esc(d[0]) + '" aria-label="' + esc(d[0]) + '">' + G + d[1] + "</svg></i>";
    }).join("");
  }
  function rowHTML(it) {
    return '<div class="row"><span class="row__n">' + esc(it.n) + (it.a && it.a.length ? '<span class="als">' + alIcons(it.a) + "</span>" : "") + "</span>" +
      (it.p || []).map(function (x) { return '<span class="pr">' + esc(x) + "</span>"; }).join("") + "</div>";
  }
  function grpHTML(g) {
    return '<div class="grp' + (g.sep ? " grp--sep" : "") + '">' + (g.g ? "<h3>" + esc(g.g) + "</h3>" : "") + g.items.map(rowHTML).join("") + "</div>";
  }
  function secHTML(sc) {
    var h = '<section class="sec-c" id="' + sc.id + '"' + (sc.w ? ' style="--pw:' + sc.w + 'rem"' : "") + '><div class="sec-c__h"><h2>' + esc(sc.t) + "</h2>" +
      (sc.nota ? '<span class="sec-c__n">' + esc(sc.nota) + "</span>" : "") + (sc.precioTitulo ? '<span class="sec-c__pt">' + esc(sc.precioTitulo) + "</span>" : "") + "</div>";
    if (sc.cab) h += '<div class="colhead">' + sc.cab.map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div>";
    if (sc.items) h += sc.items.map(rowHTML).join("");
    if (sc.grupos) h += sc.grupos.map(grpHTML).join("");
    if (sc.dos) h += '<div class="two">' + sc.dos.map(function (col) { return "<div>" + col.map(grpHTML).join("") + "</div>"; }).join("") + "</div>";
    return h + "</section>";
  }
  function sheetsHTML() {
    return (C.hojas || []).map(function (hoja) {
      return '<article class="sheet"><header class="sheet__head"><img src="assets/img/logo-casal-arena-terracota.png" alt="Casal Arena València"></header><div class="sheet__cols">' +
        hoja.columnas.map(function (col) { return '<div class="sheet__col">' + col.map(secHTML).join("") + "</div>"; }).join("") +
        "</div>" + (C.nota ? '<p class="sheet__foot">' + esc(C.nota) + "</p>" : "") + "</article>";
    }).join("");
  }
  var sheetsBox = $("#sheets"), pagesBox = $("#cartaPages");
  if (pagesBox) {
    pagesBox.innerHTML = (C.paginas || []).map(function (pg, i) {
      return '<button class="cartapage" type="button" data-open-carta="' + i + '"><img src="' + esc(pg.src) + '" alt="' + esc(pg.alt) + '" loading="lazy"><span>' + esc(pg.t) + "</span></button>";
    }).join("");
  }
  if (sheetsBox) {
    sheetsBox.innerHTML = sheetsHTML();
    $$("[data-carta-nota]").forEach(function (el) { el.textContent = C.nota || ""; });
  }

  var viewer = $("#viewer"), vBody = $("#viewerBody"), lastFocus;
  function buildViewer() {
    var pdf = $("#viewerPdf");
    if (C.pdf) {
      pdf.href = C.pdf; pdf.hidden = false;
      vBody.innerHTML = '<iframe src="' + esc(C.pdf) + '" title="Carta en PDF"></iframe>';
      return;
    }
    pdf.hidden = true;
    if (C.paginas && C.paginas.length) {
      vBody.innerHTML = C.paginas.map(function (pg) { return '<img src="' + esc(pg.src) + '" alt="' + esc(pg.alt) + '">'; }).join("");
      return;
    }
    vBody.innerHTML = '<div class="sheets">' + sheetsHTML() + "</div>";
  }
  function openViewer(i) {
    lastFocus = document.activeElement; buildViewer(); viewer.hidden = false; document.body.classList.add("is-locked"); $("#viewerClose").focus();
    var imgs = vBody.querySelectorAll("img"); vBody.scrollTop = 0;
    if (i && imgs[i]) setTimeout(function () { vBody.scrollTop = imgs[i].offsetTop - 70; }, 60);
  }
  function closeViewer() { viewer.hidden = true; document.body.classList.remove("is-locked"); if (lastFocus) lastFocus.focus(); }
  if (viewer) {
    $$("[data-open-carta]").forEach(function (b) { b.addEventListener("click", function () { openViewer(parseInt(b.dataset.openCarta, 10) || 0); }); });
    $("#viewerClose").addEventListener("click", closeViewer);
    $("#viewerPrint").addEventListener("click", function () { window.print(); });
  }

  /* ---------- Galería / lightbox ---------- */
  var lb = $("#lightbox"), lbImg = $("#lbImg");
  function closeLb() { lb.hidden = true; document.body.classList.remove("is-locked"); }
  if (lb) {
    $$("[data-lightbox] button[data-src]").forEach(function (b) {
      b.addEventListener("click", function () {
        lbImg.src = b.dataset.src; lbImg.alt = b.dataset.alt || "";
        lb.hidden = false; document.body.classList.add("is-locked");
      });
    });
    $("#lbClose").addEventListener("click", closeLb);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (lb && !lb.hidden) closeLb(); else if (viewer && !viewer.hidden) closeViewer();
  });
})();
