// ============================================
// CONFIG CENTRALIZADO - FuXion Degustaciones
// ============================================

// FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyBZ1iquQo-rcaI25-eStS8ZhwYI-lugCLk",
  authDomain: "degustaciones.firebaseapp.com",
  projectId: "degustaciones",
  storageBucket: "degustaciones.firebasestorage.app",
  messagingSenderId: "80590754347",
  appId: "1:80590754347:web:982cd91a00ddccc7f1106e",
  measurementId: "G-Y6EPQ8ZHSZ"
};

// PRODUCTOS - FUENTE ÚNICA DE VERDAD
const PRODUCTOS = {
  "Sistema Base": [
    "PRUNEX1",
    "FLORA LIV",
    "VITA XTRA T+",
    "VITAENERGIA",
    "NUTRADAY"
  ],
  "Línea Inmunológica": [
    "GANO+ CAPPUCCINO"
  ],
  "Línea Control de Peso": [
    "NOCARB-T",
    "THERMO T3",
    "CAFÉ & CAFÉ FIT"
  ],
  "Línea Anti-Edad": [
    "BEAUTY-IN",
    "GOLDEN FLX",
    "PASSION",
    "YOUTH ELIXIR"
  ],
  "Línea Vigor Mental": [
    "ON",
    "NO STRESS"
  ],
  "Línea Sport": [
    "PRE SPORT",
    "POST SPORT",
    "BIOPRO+ SPORT"
  ],
  "Otros": [
    "Otros"
  ]
};

// IMGBB CONFIGURATION
const IMGBB_KEY = "ba93a9fe70568c8462e67f8c0b6ea70a";

// ULTRAMSG WHATSAPP CONFIGURATION
const ULTRAMSG = {
  token: "7rvmthpb30hkgqcy",
  instance: "instance169405"
};

// CONTACT INFORMATION
const CONTACT = {
  email: "anastasia.iamachkine@gmail.com",
  whatsapp: "+34602141310",
  country_code: "+34"
};

// UTILITY FUNCTION - Generar lista plana de productos
function getAllProducts() {
  return Object.values(PRODUCTOS).flat();
}

// UTILITY FUNCTION - Generar opciones HTML para select
function generateProductOptions() {
  let html = '<option value="">-- Todos los productos --</option>';
  for (const [group, products] of Object.entries(PRODUCTOS)) {
    html += `<optgroup label="${group}">`;
    products.forEach(product => {
      html += `<option value="${product}">${product}</option>`;
    });
    html += `</optgroup>`;
  }
  return html;
}

// UTILITY FUNCTION - Generar opciones de filtro
function generateFilterOptions() {
  let html = '<option value="">-- Todos los productos --</option>';
  getAllProducts().forEach(product => {
    if (product !== "Otros") {
      html += `<option value="${product}">${product}</option>`;
    }
  });
  return html;
}

// UTILITY FUNCTION - Formatear productos (María, Juan y Pedro)
function formatProducts(productsArray) {
  if (!Array.isArray(productsArray) || productsArray.length === 0) return '';
  
  const prods = productsArray.filter(p => p);
  if (prods.length === 1) return prods[0];
  if (prods.length === 2) return `${prods[0]} y ${prods[1]}`;
  
  const last = prods[prods.length - 1];
  const rest = prods.slice(0, -1).join(', ');
  return `${rest} y ${last}`;
}

// TIMESTAMP UTILITIES
function getTimeAgo(timestamp) {
  if (!timestamp) return 'Hace poco';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const mins = Math.floor((new Date() - date) / 60000);
  
  if (mins < 60) return `Hace ${mins}m`;
  if (mins < 1440) return `Hace ${Math.floor(mins / 60)}h`;
  return `Hace ${Math.floor(mins / 1440)}d`;
}
// EXPORTAR AL OBJETO GLOBAL (Para que los HTML lo vean)
window.firebaseConfig = firebaseConfig;
window.PRODUCTOS = PRODUCTOS;
window.IMGBB_KEY = IMGBB_KEY;
window.ULTRAMSG = ULTRAMSG;
window.CONTACT = CONTACT;
window.generateProductOptions = generateProductOptions;
window.generateFilterOptions = generateFilterOptions;
window.formatProducts = formatProducts;
window.getTimeAgo = getTimeAgo;
