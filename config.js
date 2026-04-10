// CONFIGURACIÓN CENTRALIZADA - FuXion Madrid
const FUXION_CONFIG = {
    // 1. Credenciales de Firebase
    firebase: {
        apiKey: "AIzaSyBZ1iquQo-rcaI25-eStS8ZhwYI-lugCLk",
        authDomain: "degustaciones.firebaseapp.com",
        projectId: "degustaciones",
        storageBucket: "degustaciones.firebasestorage.app",
        messagingSenderId: "80590754347",
        appId: "1:80590754347:web:982cd91a00ddccc7f1106e"
    },

    // 2. API Keys Externas
    imgbbKey: "ba93a9fe70568c8462e67f8c0b6ea70a",
    googleScriptUrl: "TU_URL_DE_GOOGLE_APPS_SCRIPT", // Para el flujo de WhatsApp

    // 3. Catálogo Oficial España (Los 18 productos reales)
    productos: [
        "PRUNEX1", "FLORA LIV", "VITA XTRA T+", "VITAENERGIA",
        "NUTRADAY", "GANO+ CAPPUCCINO", "NOCARB-T", "THERMO T3",
        "CAFÉ & CAFÉ FIT", "BEAUTY-IN", "GOLDEN FLX", "PASSION",
        "YOUTH ELIXIR", "ON", "NO STRESS", "PRE SPORT",
        "POST SPORT", "BIOPRO+ SPORT"
    ]
};

// Hacer que esté disponible globalmente
window.FUXION_CONFIG = FUXION_CONFIG;
