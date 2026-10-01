/*
  Partidos del Valencia Basket (temporada 2026-27).
  OJO: calendario recogido de una búsqueda web, SIN verificar contra la web oficial
  (valenciabasket.com). Revisar fechas y horas antes de publicar y cambiar verificado a true.
  local: true = juega en el Roig Arena (a pocos pasos de Casal Arena).
  fecha: hora de Madrid con su desfase (+02:00 verano, +01:00 desde el 25/10/2026).
*/
window.PARTIDOS = {
  verificado: false,
  actualizado: "2026-10-01",
  partidos: [
    { comp: "Euroliga",   rival: "ASVEL Villeurbanne",     local: false, fecha: "2026-10-02T20:00:00+02:00" },
    { comp: "Liga Endesa", rival: "Casademont Zaragoza",   local: false, fecha: "2026-10-04T17:00:00+02:00" },
    { comp: "Euroliga",   rival: "Hapoel IBI Tel Aviv",    local: true,  fecha: "2026-10-08T20:30:00+02:00" },
    { comp: "Liga Endesa", rival: "FC Barcelona",          local: false, fecha: "2026-10-11T19:00:00+02:00" },
    { comp: "Euroliga",   rival: "Olympiacos Piraeus",     local: true,  fecha: "2026-10-13T21:00:00+02:00" },
    { comp: "Euroliga",   rival: "Maccabi Rapyd Tel Aviv", local: true,  fecha: "2026-10-15T20:30:00+02:00" },
    { comp: "Liga Endesa", rival: "UCAM Murcia",           local: true,  fecha: "2026-10-18T17:00:00+02:00" },
    { comp: "Euroliga",   rival: "Paris Basketball",       local: false, fecha: "2026-10-23T20:45:00+02:00" },
    { comp: "Liga Endesa", rival: "Kosner Baskonia",       local: true,  fecha: "2026-10-25T17:00:00+01:00" },
    { comp: "Euroliga",   rival: "Fenerbahçe Estambul",    local: true,  fecha: "2026-10-27T20:30:00+01:00" },
    { comp: "Euroliga",   rival: "FC Barcelona",           local: false, fecha: "2026-10-30T20:30:00+01:00" }
  ]
};
