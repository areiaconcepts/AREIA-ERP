export const SHOPIFY_ORDERS = [
  { id: "#1540", cliente: "Katherine Ortiz", monto: 44184, fecha: "2026-06-22", estado: "PAGADO" },
  { id: "#1539", cliente: "Lizbeth Riveros", monto: 39986, fecha: "2026-06-07", estado: "PAGADO" },
  { id: "#1538", cliente: "Ivanna Aedo Olguin", monto: 37786, fecha: "2026-06-06", estado: "PAGADO" },
  { id: "#1537", cliente: "Isabella Perciavalle", monto: 21693, fecha: "2026-06-03", estado: "PAGADO" },
  { id: "#1536", cliente: "Francisca Balboa", monto: 40277, fecha: "2026-06-03", estado: "PAGADO" },
  { id: "#1535", cliente: "Karen Barrios", monto: 38486, fecha: "2026-06-02", estado: "PAGADO" },
  { id: "#1534", cliente: "Maria Fernanda Pojomovsky", monto: 37786, fecha: "2026-06-02", estado: "PAGADO" },
  { id: "#1533", cliente: "Carolina Paillalef", monto: 39186, fecha: "2026-06-02", estado: "PAGADO" },
  { id: "#1532", cliente: "Paola", monto: 62975, fecha: "2026-06-02", estado: "PAGADO" },
  { id: "#1531", cliente: "Mariana Frings", monto: 76762, fecha: "2026-05-15", estado: "PAGADO" },
  { id: "#1530", cliente: "Veronica Arce", monto: 50882, fecha: "2026-05-11", estado: "PAGADO" },
  { id: "#1529", cliente: "Romina Bustos", monto: 11594, fecha: "2026-04-29", estado: "PAGADO" },
  { id: "#1528", cliente: "Rodrigo Riesco", monto: 61437, fecha: "2026-04-27", estado: "PAGADO" },
  { id: "#1527", cliente: "Nicole", monto: 103374, fecha: "2026-04-22", estado: "PAGADO" },
  { id: "#1526", cliente: "Francisca", monto: 34358, fecha: "2026-04-14", estado: "PAGADO" },
  { id: "#1525", cliente: "Laura", monto: 34358, fecha: "2026-04-03", estado: "PAGADO" },
  { id: "#1524", cliente: "Vivianne Wylie", monto: 33087, fecha: "2026-04-03", estado: "PAGADO" },
  { id: "#1523", cliente: "Jorge Altamirano", monto: 19593, fecha: "2026-03-31", estado: "PAGADO" },
  { id: "#1522", cliente: "Catalina Gallardo", monto: 102858, fecha: "2026-03-17", estado: "PAGADO" },
  { id: "#1521", cliente: "Fernanda Salas", monto: 86864, fecha: "2026-03-11", estado: "PAGADO" },
  { id: "#1519", cliente: "Nicole", monto: 21500, fecha: "2026-03-05", estado: "DEVUELTO" },
];

export const SHOPIFY_PRODUCTS = [
  { id: "p1", nombre: "WHITE TIRO ALTO - BOTTOM", categoria: "Swimwear", stock: 3, precio: 18990, status: "ACTIVE" },
  { id: "p2", nombre: "KENDAL HAWAII - BOTTOM", categoria: "Swimwear", stock: 4, precio: 17990, status: "ACTIVE" },
  { id: "p3", nombre: "ISLA BATIK - BOTTOM", categoria: "Swimwear", stock: 6, precio: 17990, status: "ACTIVE" },
  { id: "p4", nombre: "TOP CAMELIA - CROCHET", categoria: "Resortwear", stock: 1, precio: 18990, status: "ACTIVE" },
  { id: "p5", nombre: "TOP VERDE AGUA - CROCHET", categoria: "Resortwear", stock: 2, precio: 18990, status: "ACTIVE" },
  { id: "p6", nombre: "TOP BLANCO - CROCHET", categoria: "Resortwear", stock: 6, precio: 18990, status: "ACTIVE" },
  { id: "p7", nombre: "TOP NUDE - CROCHET", categoria: "Resortwear", stock: 1, precio: 18990, status: "ACTIVE" },
  { id: "p8", nombre: "TOP VERDE MINT - CROCHET", categoria: "Resortwear", stock: 1, precio: 18990, status: "ACTIVE" },
  { id: "p9", nombre: "SWEET AQUA - BOTTOM", categoria: "Swimwear", stock: 1, precio: 14392, status: "ACTIVE" },
  { id: "p10", nombre: "BAHÍA EDÉN - BOTTOM", categoria: "Swimwear", stock: 1, precio: 14392, status: "ACTIVE" },
  { id: "p11", nombre: "MINI NUDE - CROCHET", categoria: "Resortwear", stock: 0, precio: 25990, status: "ACTIVE" },
  { id: "p12", nombre: "PAREO NUDE - CROCHET", categoria: "Resortwear", stock: 0, precio: 28990, status: "ACTIVE" },
];

export const DEFAULT_MANUAL_DATA = {
  contentCalendar: [
    { id: "c1", fecha: "2026-07-02", plataforma: "Instagram", tipo: "Shooting Areia Wanted Girls", estado: "En producción" },
    { id: "c2", fecha: "2026-06-28", plataforma: "Newsletter", tipo: "Lanzamiento Elevated Essentials", estado: "Idea" },
  ],
  pilares: [
    "Effortless — nada forzado, todo se siente natural",
    "Cool — segura de sí misma, sin esfuerzo aparente",
    "Femenina pero moderna — suave con actitud",
    "Premium pero accesible — nunca catálogo ni promocional",
  ],
  financeEntries: [
    { id: "f1", mes: "Junio 2026", tipo: "Gasto", categoria: "Producción Elevated Essentials", monto: 0 },
    { id: "f2", mes: "Junio 2026", tipo: "Gasto", categoria: "Pauta digital Meta Ads", monto: 0 },
  ],
  bazares: [
    { id: "b1", nombre: "Bazar ED", fecha: "2026-07-10", ciudad: "Santiago", estado: "Confirmado", ventasPresenciales: 0 },
    { id: "b2", nombre: "Mundano Con Con", fecha: "2026-07-01", ciudad: "Con Con", estado: "Confirmado", ventasPresenciales: 0 },
  ],
  discounts: [
    { id: "d1", codigo: "ENVÍOSFREE", porcentaje: 0, vigencia: "Activo", descripcion: "Envío gratis +$20.000", estado: "Activo" },
  ],
  goals: {
    corto: [
      { id: "g1", texto: "Finalizar Brand Book Areia", done: false },
      { id: "g2", texto: "Lanzar colección Elevated Essentials", done: false },
      { id: "g3", texto: "Shooting Areia Wanted Girls (2 julio)", done: false },
      { id: "g4", texto: "Migrar Shopify de Dawn a tema premium", done: false },
    ],
    mediano: [
      { id: "g5", texto: "Consolidar marca lifestyle costera", done: false },
      { id: "g6", texto: "Internacionalizar: Brasil, EE.UU., Europa", done: false },
      { id: "g7", texto: "Diversificar: vestidos, accesorios, home & beach", done: false },
      { id: "g8", texto: "Construir comunidad / programa de embajadoras", done: false },
    ],
    largo: [
      { id: "g9", texto: "Ser referente latinoamericano de vida costera", done: false },
      { id: "g10", texto: "Ecosistema lifestyle: moda, viajes, experiencias, diseño", done: false },
    ],
  },
};
