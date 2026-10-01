(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var money = function (p) {
    return p == null ? "—" : Number(p).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  };

  /* ---------- Navegación ---------- */
  var nav = $("#nav"), toggle = $("#navToggle"), links = $("#navLinks");
  function onScroll() { nav.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
    document.body.classList.toggle("is-locked", open);
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && links.classList.contains("is-open")) toggle.click();
  });

  /* ---------- Hero: respeta "reducir movimiento" ---------- */
  var hv = $("#heroVideo");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { hv.removeAttribute("autoplay"); hv.pause(); }

  /* ---------- Aparición al hacer scroll ---------- */
  var rev = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    rev.forEach(function (n) { io.observe(n); });
  } else { rev.forEach(function (n) { n.classList.add("is-in"); }); }

  /* ---------- Carta ---------- */
  var C = window.CARTA || { categorias: [] };
  var tabs = $("#cartaTabs"), panel = $("#cartaPanel");
  function dishHTML(d) {
    return '<div class="dish"><span class="dish__name">' + esc(d.nombre) + '</span><span class="dish__price">' + money(d.precio) + "</span>" +
      (d.desc ? '<p class="dish__desc">' + esc(d.desc) + "</p>" : "") + "</div>";
  }
  function showCat(i) {
    Array.prototype.forEach.call(tabs.children, function (b, k) { b.setAttribute("aria-selected", k === i); b.tabIndex = k === i ? 0 : -1; });
    panel.innerHTML = C.categorias[i].items.map(dishHTML).join("");
  }
  C.categorias.forEach(function (cat, i) {
    var b = el("button", "carta__tab", esc(cat.nombre));
    b.type = "button"; b.setAttribute("role", "tab");
    b.addEventListener("click", function () { showCat(i); });
    tabs.appendChild(b);
  });
  if (C.categorias.length) showCat(0);
  $("#cartaNota").textContent = C.nota || "";
  if (C.demo) $("#demoFlag").hidden = false;

  /* Visor estilo PDF */
  var viewer = $("#viewer"), vBody = $("#viewerBody");
  function buildViewer() {
    vBody.innerHTML = "";
    var pdf = $("#viewerPdf");
    if (C.pdf) {
      pdf.href = C.pdf; pdf.hidden = false;
      var f = el("iframe"); f.src = C.pdf; f.title = "Carta en PDF"; vBody.appendChild(f);
      return;
    }
    pdf.hidden = true;
    var page = el("article", "page");
    if (C.demo) page.appendChild(el("span", "page__demo", "Ejemplo"));
    page.appendChild(el("div", "page__logo", '<img src="assets/img/logo-casal-arena-oscuro.png" alt="Casal Arena València">'));
    C.categorias.forEach(function (cat) {
      page.appendChild(el("h3", null, esc(cat.nombre)));
      page.insertAdjacentHTML("beforeend", cat.items.map(dishHTML).join(""));
    });
    if (C.nota) page.appendChild(el("p", "page__nota", esc(C.nota)));
    vBody.appendChild(page);
  }
  var lastFocus;
  function openViewer() { lastFocus = document.activeElement; buildViewer(); viewer.hidden = false; document.body.classList.add("is-locked"); $("#viewerClose").focus(); }
  function closeViewer() { viewer.hidden = true; document.body.classList.remove("is-locked"); if (lastFocus) lastFocus.focus(); }
  $("#openCarta").addEventListener("click", openViewer);
  $("#viewerClose").addEventListener("click", closeViewer);
  $("#viewerPrint").addEventListener("click", function () { window.print(); });

  /* ---------- Galería / lightbox ---------- */
  var lb = $("#lightbox"), lbImg = $("#lbImg");
  function closeLb() { lb.hidden = true; document.body.classList.remove("is-locked"); }
  $("#gallery").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-src]");
    if (!b) return;
    lbImg.src = b.dataset.src; lbImg.alt = b.dataset.alt || "";
    lb.hidden = false; document.body.classList.add("is-locked");
  });
  $("#lbClose").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!lb.hidden) closeLb(); else if (!viewer.hidden) closeViewer();
  });

  /* ---------- Partidos ---------- */
  var P = window.PARTIDOS || { partidos: [] };
  var TZ = "Europe/Madrid";
  var fmt = function (d, o) { return new Intl.DateTimeFormat("es-ES", Object.assign({ timeZone: TZ }, o)).format(d); };
  function upcoming() {
    // Se mantiene visible el partido hasta 2h después del inicio.
    var cut = Date.now() - 2 * 3600 * 1000;
    return P.partidos
      .map(function (m) { return Object.assign({}, m, { d: new Date(m.fecha) }); })
      .filter(function (m) { return m.d.getTime() > cut; })
      .sort(function (a, b) { return a.d - b.d; });
  }
  function renderMatches() {
    var list = upcoming(), box = $("#fixtures"), next = $("#nextMatch");
    box.innerHTML = "";
    if (!list.length) {
      next.hidden = true;
      box.innerHTML = '<p class="lead">Pronto publicaremos los próximos partidos. ¡Estate atento!</p>';
      return;
    }
    var n = list[0];
    next.hidden = false;
    $("#nextRival").textContent = n.rival;
    $("#nextMeta").textContent = fmt(n.d, { weekday: "long", day: "numeric", month: "long" }) + " · " +
      fmt(n.d, { hour: "2-digit", minute: "2-digit" }) + " h · " + n.comp + (n.local ? " · Roig Arena" : " · A domicilio");
    list.slice(1).forEach(function (m) {
      var card = el("div", "fx",
        '<div class="fx__date"><b>' + fmt(m.d, { day: "numeric" }) + "</b><small>" + esc(fmt(m.d, { month: "short" }).replace(".", "")) + "</small></div>" +
        '<div class="fx__vs">' + (m.local ? "Valencia Basket – " + esc(m.rival) : esc(m.rival) + " – Valencia Basket") +
        "<small>" + esc(m.comp) + " · " + esc(fmt(m.d, { weekday: "long" })) + "</small>" +
        (m.local ? '<span class="fx__tag">En el Roig Arena</span>' : "") + "</div>" +
        '<div class="fx__time">' + fmt(m.d, { hour: "2-digit", minute: "2-digit" }) + " h</div>");
      box.appendChild(card);
    });
    $("#fixturesNote").textContent = "Fechas y horarios sujetos a cambios. Confirma siempre en la web oficial del Valencia Basket." +
      (P.verificado ? "" : " (Calendario pendiente de verificación.)");
    tick(n);
  }
  var timer;
  function tick(n) {
    clearInterval(timer);
    var c = $("#nextCount");
    function upd() {
      var s = Math.floor((n.d - Date.now()) / 1000);
      if (s <= 0) { c.innerHTML = '<div><b>¡Ya!</b><small>en juego</small></div>'; clearInterval(timer); return; }
      var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
      c.innerHTML = [[d, "días"], [h, "horas"], [m, "min"]].map(function (x) { return "<div><b>" + x[0] + "</b><small>" + x[1] + "</small></div>"; }).join("");
    }
    upd(); timer = setInterval(upd, 30000);
  }
  renderMatches();

  /* ---------- Contacto ---------- */
  var K = window.CONTACTO || {};
  var q = encodeURIComponent(K.mapsQuery || "Casal Arena Valencia");
  $("#cAddr").innerHTML = (K.direccion || []).map(esc).join("<br>");
  $("#footAddr").textContent = (K.direccion || []).join(" · ");
  $("#cPrice").textContent = K.precioMedio || "";
  $("#cDirections").href = "https://www.google.com/maps/search/?api=1&query=" + q;
  $("#mapFrame").src = "https://www.google.com/maps?q=" + q + "&output=embed";
  if (K.telefono) {
    var tel = K.telefono.replace(/[^\d+]/g, "");
    $("#cPhoneRow").hidden = false; $("#cPhone").textContent = K.telefono; $("#cPhone").href = "tel:" + tel;
    $("#cCall").hidden = false; $("#cCall").href = "tel:" + tel;
  }
  if (K.horario && K.horario.length) {
    $("#cHoursRow").hidden = false;
    $("#cHours").innerHTML = K.horario.map(function (r) { return "<tr><td>" + esc(r[0]) + "</td><td>" + esc(r[1]) + "</td></tr>"; }).join("");
    $("#cHoursNote").textContent = K.horarioNota || "";
  }
  if (K.instagram) {
    $("#cInsta").hidden = false; $("#cInsta").href = K.instagram;
    $("#footInsta").hidden = false; $("#footInsta").href = K.instagram; $("#footInsta").textContent = "Síguenos en Instagram " + (K.instagramUser || "");
  }
  if (K.calendarioBasket) $("#fullCalendar").href = K.calendarioBasket;
  $("#year").textContent = new Date().getFullYear();
})();
