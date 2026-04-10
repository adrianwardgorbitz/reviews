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
