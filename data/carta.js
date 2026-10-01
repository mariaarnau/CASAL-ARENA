/*
  Carta de Casal Arena (transcrita de la carta oficial publicada en Google Maps, sept 2026).
  Los precios se muestran tal cual están escritos en la carta (texto).
  Alérgenos (a): gluten, lacteos, pescado, so2 (sulfitos), moluscos, huevo, sesamo, soja, frutos.
  Los iconos copian los de la carta original; "huevo", "sesamo", "soja" y "frutos" salen sin nombre
  porque no están confirmados: revisar contra la leyenda oficial antes de darles nombre.
  Estructura: hojas -> columnas -> secciones -> (items | grupos).
*/
(function () {
  var I = function (n, p, a) { return { n: n, p: p, a: a || [] }; };

  window.CARTA = {
    demo: false,
    pdf: null,
    // Páginas originales de la carta (imágenes). Es la versión que manda; "hojas" es la versión en texto.
    paginas: [
      { src: "assets/img/carta/portada.jpg", t: "Portada", alt: "Portada de la carta de Casal Arena València" },
      { src: "assets/img/carta/hoja-1-tapeo.jpg", t: "Tapeo, platos y bebidas", alt: "Carta: tapeo, platos, vinos, cervezas, tercios y copas" },
      { src: "assets/img/carta/hoja-2-dulce.jpg", t: "Dulce, salado y café", alt: "Carta: dulce y salado, café, bebidas e infusiones" }
    ],
    nota: "Compruebe los alérgenos con el personal.",
    hojas: [
      { columnas: [
        [
          { id: "tapeo", t: "Tapeo", items: [
            I("Gilda de anchoas", ["2,50€"], ["pescado", "so2"]),
            I("Gilda de boquerón", ["2,50€"], ["pescado", "so2"]),
            I("Ensaladilla rusa", ["10€"], ["gluten", "pescado", "huevo"]),
            I("Nachos", ["9€"], ["lacteos", "gluten"]),
            I("Pincho de tortilla de patata", ["3,70€"], ["gluten", "huevo"]),
            I("Pincho de anchoas", ["3,50€"], ["gluten", "pescado"]),
            I("Pincho de boquerón", ["3,50€"], ["gluten", "pescado"]),
            I("Ajoarriero", ["9€"], ["pescado", "gluten"]),
            I("Titaina", ["9€"], ["pescado", "so2"]),
            I("Esgarraet", ["8,50€"], ["pescado", "so2"]),
            I("Escalivada", ["8€"], ["so2"]),
            I("Papas con mejillones", ["8,50€"], ["moluscos"]),
            I("Papas con anchoas", ["9,50€"], ["pescado"]),
            I("Hummus", ["8€"], ["sesamo"]),
            I("Anchoas con olivas", ["7€"], ["pescado", "so2"]),
            I("Boquerones con olivas", ["6,50€"], ["pescado", "so2"])
          ] },
          { id: "cervezas", t: "Cervezas", cab: ["Caña", "Doble", "Pinta"], w: 4.3, items: [
            I("Estrella Galicia (de bodega)", ["2€", "3€", "4,50€"], ["gluten"]),
            I("1906 (de barril)", ["2,50€", "3,50€", "5,50€"], ["gluten"]),
            I("Clara", ["2,50€", "3,80€", "4,50€"], ["gluten"])
          ] },
          { id: "tercios", t: "Tercios", items: [
            I("0,0 sin alcohol", ["2,50€"], ["gluten"]),
            I("0,0 (tostada)", ["2,80€"]),
            I("Sin gluten", ["2,70€"]),
            I("Tyris Márzen", ["3,70€"], ["gluten"]),
            I("Erdinger trigo alemán", ["4,50€"], ["gluten"]),
            I("1906 red vintage", ["3,10€"], ["gluten"]),
            I("Rivera Reposada", ["2,70€"], ["gluten"])
          ] }
        ],
        [
          { id: "platos", t: "Platos", nota: "Normal / Ibérico / Bellota", items: [
            I("Jamón", ["8,50€ / 13€ / 20€"]),
            I("Salchichón", ["7€ / 10€"]),
            I("Chorizo", ["7€ / 10€"]),
            I("Lomo", ["8€ / 11€"]),
            I("Quesos", ["7€"], ["lacteos"]),
            I("Tabla de quesos", ["15€"], ["lacteos"]),
            I("Surtidos de embutido", ["16€ / 22€"]),
            I("Pan extra", ["1€"], ["gluten"])
          ] },
          { id: "vinos", t: "Vinos", cab: ["Copa", "Botella"], w: 3.6, grupos: [
            { g: "Blanco", items: [
              I("Verdejo", ["4,00", "16"], ["so2"]),
              I("Albariño", ["4,50", "19"], ["so2"]),
              I("Chardonnay", ["4,00", "16"], ["so2"]),
              I("Godello", ["4,50", "19,50"], ["so2"])
            ] },
            { g: "Tinto", items: [
              I("Rioja", ["3,80", "17"], ["so2"]),
              I("Utiel-Requena", ["4", "16,50"], ["so2"]),
              I("Ribera sacra", ["4,50", "19,50"], ["so2"]),
              I("Ribera del Duero Cilar joven", ["4,00", "18,00"], ["so2"]),
              I("Cillar de Silos Crianza", ["5,00", "26,00"], ["so2"])
            ] },
            { g: "Cava", items: [
              I("Chardonnay", ["4,50", "20"], ["so2"])
            ] }
          ] },
          { id: "copas", t: "Copas", w: 2.6, dos: [
            [
              { g: "Vodka", items: [I("Smirnoff", ["7"]), I("Eristoff", ["8,50"]), I("Grey Goose", ["12"])] },
              { g: "Whisky", items: [I("J&B", ["7"]), I("Baileys", ["6"], ["lacteos"]), I("Jack Daniel's", ["7"]), I("Johnnie Walker Red", ["7"]), I("Johnnie Walker Black", ["8,50"])] },
              { g: "Ron", items: [I("Negrita", ["7"]), I("Arechucas Carta Oro", ["7"]), I("Barceló", ["7"]), I("Zacapa", ["9"])] }
            ],
            [
              { g: "Ginebra", items: [I("Larios", ["7"]), I("Beefeater", ["8"]), I("Tanqueray", ["8"]), I("Puerto Indias", ["8"]), I("Puerto Indias Fresa", ["8"]), I("Martín Miller's", ["8"])] },
              { g: "Licores/chupitos", items: [I("Hierbas Riazuaje", ["2,50"]), I("Crema de arroz", ["2,50"]), I("Jägermeister", ["2,50"]), I("Fireball", ["2,50"]), I("Crema Riazuaje", ["2,50"], ["lacteos"]), I("Casamigos repos", ["4"]), I("Casamigos repos (50 ml)", ["6"]), I("Aperol", ["5"]), I("Chupito", ["2,50"])] }
            ]
          ] }
        ]
      ] },
      { columnas: [
        [
          { id: "dulce-salado", t: "Dulce & Salado", grupos: [
            { items: [
              I("Croissant Paris de Mantequilla", ["2,50€"], ["gluten", "lacteos", "huevo"]),
              I("Mini caracola", ["0,60€"], ["gluten", "lacteos", "huevo", "frutos"]),
              I("Ensaimada pequeña", ["0,90€"], ["gluten", "huevo", "lacteos", "frutos"]),
              I("Croissant pequeño", ["1€"], ["gluten", "lacteos", "huevo"]),
              I("Roll de canela", ["2,30€"], ["gluten", "lacteos", "huevo", "soja"]),
              I("Cookie de doble chocolate", ["3€"], ["gluten", "lacteos", "huevo", "soja"]),
              I("Magdalena", ["1,70€"], ["gluten", "huevo", "lacteos"])
            ] },
            { sep: true, items: [
              I("Empanadilla de pisto", ["2,85€"], ["gluten", "huevo", "soja", "so2"]),
              I("Empanadilla de espinaca", ["3€"], ["gluten", "huevo", "so2"]),
              I("Pizza de carbonara con trufa", ["4€"], ["gluten", "huevo", "lacteos"]),
              I("Focaccia de mortadela", ["8€"], ["gluten", "lacteos", "frutos"]),
              I("Focaccia de pulled pork con queso", ["9€"], ["gluten", "lacteos"])
            ] }
          ] },
          { id: "bebidas", t: "Bebidas", items: [
            I("Agua", ["2€"]),
            I("Agua con gas", ["1,90€"]),
            I("Refrescos (Línea Coca-Cola)", ["2,50€"]),
            I("Red Bull", ["3€"], ["so2"]),
            I("Bitter", ["2,50€"], ["so2"]),
            I("Tinto de verano", ["3,50€"], ["so2"]),
            I("Zumo (melocotón, naranja y piña)", ["3€"]),
            I("Zumo naranja natural", ["3,90€"])
          ] }
        ],
        [
          { id: "cafe", t: "Café", items: [
            I("Espresso", ["1,50€"]),
            I("Cortado", ["1,70€"], ["lacteos"]),
            I("Café con leche", ["1,90€"], ["lacteos"]),
            I("Americano", ["1,80€"]),
            I("Latte", ["2,10€"], ["lacteos"]),
            I("Cappuccino tradicional", ["2,40€"], ["lacteos"]),
            I("Carajillo", ["2,60€"], ["gluten", "so2"]),
            I("Cremaet", ["2,90€"], ["gluten", "so2"]),
            I("Bombón", ["2,20€"], ["lacteos"]),
            I("Iced Coffee", ["2,90€"], ["lacteos"]),
            I("Cacaolat", ["2,50€"], ["lacteos"])
          ] },
          { id: "infusiones", t: "Infusiones", precioTitulo: "1,80€", items: [
            I("Menta poleo", []),
            I("Manzanilla", []),
            I("Negro Earl Grey", []),
            I("Frutas del bosque", []),
            I("Rojo Pu-erh", []),
            I("Vainilla", []),
            I("Verde Menta de Marrakech", [])
          ] }
        ]
      ] }
    ]
  };
})();
