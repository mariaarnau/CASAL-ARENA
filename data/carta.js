/*
  Carta de Casal Arena.
  AHORA MISMO SON DATOS DE EJEMPLO (demo: true) para poder ver el diseño: no son platos ni precios reales.
  Para poner la carta real:
   - Opción A (recomendada): sustituye "categorias" por la carta real y pon demo: false.
   - Opción B: sube el PDF a assets/carta/carta.pdf y pon pdf: "assets/carta/carta.pdf"
     (el visor lo mostrará tal cual, estilo PDF).
  precio: número (se muestra como 4,50 €) o null (se muestra "—").
*/
window.CARTA = {
  demo: true,
  pdf: null,
  nota: "Consultar con nuestro personal la carta de alérgenos. Precios en euros, IVA incluido.",
  categorias: [
    { nombre: "Para picar", items: [
      { nombre: "Aceitunas aliñadas", precio: null },
      { nombre: "Tabla de embutidos", desc: "Selección de la casa", precio: null },
      { nombre: "Pan con tomate", precio: null }
    ]},
    { nombre: "Raciones", items: [
      { nombre: "Ensaladilla", precio: null },
      { nombre: "Croquetas caseras", precio: null },
      { nombre: "Tortilla de patata", precio: null }
    ]},
    { nombre: "Bocadillos y cocas", items: [
      { nombre: "Bocadillo del Arena", desc: "Ingredientes por confirmar", precio: null },
      { nombre: "Coca de la casa", precio: null }
    ]},
    { nombre: "Bebidas", items: [
      { nombre: "Cerveza", precio: null },
      { nombre: "Vino de la casa", precio: null },
      { nombre: "Tinto de verano", precio: null }
    ]},
    { nombre: "Postres", items: [
      { nombre: "Postre del día", precio: null }
    ]}
  ]
};
