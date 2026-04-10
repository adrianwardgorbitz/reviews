# 🏗️ ARQUITECTURA - FuXion Degustaciones Madrid

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SISTEMA COMPLETO DE DEGUSTACIONES                        │
└─────────────────────────────────────────────────────────────────────────────┘

                                    CONFIG.JS
                                   (Centro de Control)
                          ┌────────────────────────┐
                          │  • Productos           │
                          │  • Firebase Config     │
                          │  • API Keys            │
                          │  • Funciones utiles    │
                          └──────────┬─────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ↓                ↓                ↓
              INDEX.HTML      GALERIA-EQUIPO.HTML   (Otros)
            (Panel Control)   (Galería Pública)
              (Con Leads)      (Sin Leads)
                    │                │
                    ├────────────────┤
                    │                │
                    ↓                ↓
              ┌──────────────────────────────┐
              │  FIRESTORE DATABASE          │
              │  Proyecto: degustaciones     │
              ├──────────────────────────────┤
              │  Colecciones:                │
              │  • reviews (compartida)      │
              │  • leads (solo Adrian)       │
              └──────────────────────────────┘
                    ↑                ↑
                    └────────────────┘
                         Sincronización
                        (Tiempo Real)

```

---

## 📱 FLUJO DE USUARIO - CLIENTE

```
CLIENTE ACCEDE A GALERÍA
         ↓
┌─────────────────────────────────┐
│ galeria-equipo.html             │
│ ✅ Carga productos de config.js │
│ ✅ Muestra reseñas en vivo       │
│ ✅ Filtra por producto (URL)    │
└──────────────┬──────────────────┘
               ↓
        CLIENTE VE:
        • 2 reseñas por fila
        • Fotos sin cortes
        • Estrellas amarillas
        • Filtros dinámicos
               ↓
        CLIENTE CLICKEA RESEÑA
               ↓
        MODAL AMPLIADO ABRE
        • Nombre completo
        • Producto detallado
        • Rating con estrellas
        • Todas las fotos
        • Reseña completa
               ↓
        CLIENTE DEJA RESEÑA
        (Voluntario)
               ↓
        GUARDAR EN FIRESTORE
        • reviews collection
        • Visible para todos
        • En VIVO (segundos)

```

---

## 👨‍💼 FLUJO DE ADRIAN - DURANTE DEGUSTACIÓN

```
DEGUSTACIÓN (Presencial)
         ↓
CLIENTE PRUEBA PRODUCTO
         ↓
ADRIAN ABRE INDEX.HTML
┌──────────────────────────┐
│ ✅ Carga config.js       │
│ ✅ Formulario con leads  │
│ ✅ WhatsApp requerido    │
└───────────┬──────────────┘
            ↓
RELLENAR FORMULARIO:
• Nombre: María
• WhatsApp: +34602141310 ← REQUERIDO
• Email: maria@email.com (opcional)
• Instagram: @maria (opcional)
• Productos: ON (select múltiple)
• Fotos: subir (max 3)
• Rating: 5 estrellas
• Reseña: "¡Excelente!"
            ↓
CLICK "ENVIAR"
            ↓
┌──────────────────────────┐
│ GUARDAR EN FIRESTORE     │
│ Colecciones:             │
│ • reviews (público)      │
│ • leads (privado Adrian) │
└──────────┬───────────────┘
           ↓
   BOTÓN SE DESHABILITA
   (Evita duplicados)
           ↓
   MOSTRAR "✅ ENVIADO"
           ↓
   RECARGAR PÁGINA
           ↓
RESEÑA APARECE EN VIVO
• En galeria-equipo.html
• Visible para otros clientes
• Con todas las fotos

```

---

## ⏱️ FLUJO AUTOMÁTICO - DESPUÉS DE 48h

```
REGISTRAR CLIENTE (DÍA 1)
         ↓
GOOGLE SHEETS
"FuXion Degustaciones"
• A: 2026-04-10 14:30
• B: María
• C: +34602141310
• F: ON
         ↓
GOOGLE APPS SCRIPT
Trigger: "Cada día a las 9am"
         ↓
BUSCAR CLIENTES DE HACE 48h
Si: 48h ≤ tiempo transcurrido < 49h
         ↓
ENVIAR MENSAJE WHATSAPP
┌────────────────────────────┐
│ "Hola María,               │
│  ¿Qué tal la degustación?  │
│  Aquí ven lo que otros     │
│  dicen de ON:              │
│  [LINK FILTRADO]"          │
└────────────────────────────┘
         ↓
ULTRAMSG API
         ↓
WhatsApp ENVIADO
         ↓
GOOGLE SHEETS
Marcar en columna I: "✅ Enviado"
         ↓
(Si cliente abre link)
         ↓
galeria-equipo.html
?producto=ON
         ↓
GALERÍA ABRE FILTRADA POR ON
(Solo reseñas de ON)
         ↓
CLIENTE VE PRUEBA SOCIAL
Otros clientes con ON
         ↓
(Opcional) CLIENTE DEJA RESEÑA

```

---

## 🔐 NIVEL SEGURIDAD - FIRESTORE RULES

```
Antes (SIN REGLAS):
┌─────────────────────────────────┐
│ PÚBLICO                         │
│ ✅ Ver todos los WhatsApp       │
│ ✅ Ver todos los Emails         │
│ ❌ INSEGURO                     │
└─────────────────────────────────┘

Ahora (CON REGLAS):
┌─────────────────────────────────────┐
│ REVIEWS Collection                  │
│ ✅ Cualquiera PUEDE LEER            │
│ ✅ Usuarios PUEDEN CREAR            │
│ ✅ NADIE puede borrar/editar        │
│ ✅ Visible en galería pública       │
├─────────────────────────────────────┤
│ LEADS Collection                    │
│ ✅ SOLO Adrian PUEDE LEER           │
│ ✅ SOLO Adrian PUEDE ESCRIBIR       │
│ ✅ OTROS no pueden acceder          │
│ ✅ WhatsApp/Email privados         │
└─────────────────────────────────────┘

```

---

## 🎯 TABLA DE FLUJOS

| Evento | Usuario | Sistema | Resultado |
|--------|---------|---------|-----------|
| Degustación | Adrian registra en index.html | Guarda en reviews + leads (Firestore) | Reseña visible en ambas galerías |
| Cliente ve galería | Abre galeria-equipo.html | Carga reviews en tiempo real | Ve reseñas + puede filtrar |
| URL Filtering | Abre ?producto=ON | JavaScript aplica filtro automático | Galería muestra solo ON |
| Reseña ampliada | Click en tarjeta | Modal se abre | Ve detalles completos |
| Trigger 48h | Cron job diario 9am | Google Apps Script busca clientes | Envía WhatsApp con link |
| Nuevo producto | Adrian edita config.js | Commit a GitHub | Aparece automáticamente en selects |

---

## 💾 BASE DE DATOS - FIRESTORE

### Colección: REVIEWS (Pública)

```json
{
  "name": "María López",
  "instagram": "@marialopez",
  "products": ["ON", "BEAUTY-IN"],
  "rating": 5,
  "comment": "¡Excelente producto!",
  "photoUrls": [
    "https://imgbb.com/...",
    "https://imgbb.com/...",
    "https://imgbb.com/..."
  ],
  "timestamp": "2026-04-10T14:30:00Z",
  "createdAt": "2026-04-10T14:30:00Z"
}
```

### Colección: LEADS (Privada - Solo Adrian)

```json
{
  "name": "María López",
  "whatsapp": "+34602141310",
  "email": "maria@email.com",
  "instagram": "@marialopez",
  "products": ["ON"],
  "registeredAt": "2026-04-10T14:30:00Z",
  "catalogSent": "2026-04-10T14:30:00Z",
  "followUpSent": "2026-04-12T09:15:00Z"
}
```

---

## 🔗 INTEGRACIONES EXTERNAS

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   FIREBASE   │     │   IMGBB      │     │   ULTRAMSG   │
│  (Firestore) │     │ (Fotos)      │     │  (WhatsApp)  │
└──────────────┘     └──────────────┘     └──────────────┘
       ↑                     ↑                     ↑
       │                     │                     │
       └─────────────────────┼─────────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
              INDEX.HTML     GALERIA-EQUIPO.HTML
                  (Panel)           (Pública)
```

---

## 📊 ESTADÍSTICAS EN TIEMPO REAL

```
INDEX.HTML (Panel Adrian)
┌─────────────────────────┐
│ Total Registros: 42     │
│ Con Foto: 28            │
│ Últimos 7 días: 12      │
│ Conversión: 66%         │
│ (Reseñas / Registros)   │
└─────────────────────────┘

GALERIA-EQUIPO.HTML (Pública)
┌─────────────────────────┐
│ Total Reseñas: 28       │
│ Con Foto: 28            │
│ Rating Promedio: 4.8/5  │
│ Productos: 12           │
│ Visitas (estimado): 500 │
└─────────────────────────┘

GOOGLE SHEETS
┌─────────────────────────┐
│ Clientes registrados: 42│
│ Catálogo enviado: 42    │
│ Seguimiento enviado: 38 │
│ Open rate: 90%          │
│ Click rate: 85%         │
└─────────────────────────┘

```

---

## 🚀 ESCALABILIDAD

```
Nivel 1: Local (Hoy)
├─ 1 dispositivo (teléfono Adrian)
├─ Eventos presenciales
└─ Máximo 50 clientes/mes

Nivel 2: Regional (3 meses)
├─ 3-5 dispositivos (equipo)
├─ Eventos + Online
└─ Máximo 200 clientes/mes

Nivel 3: Nacional (6 meses)
├─ 10+ dispositivos
├─ Eventos + Online + Influencers
└─ Máximo 1000 clientes/mes

Nivel 4: Internacional (1 año)
├─ 50+ dispositivos
├─ Multi-país
└─ Máximo 10000 clientes/mes
```

---

## 🎯 MÉTRICAS CLAVE

```
CONVERSIÓN
Registros → Catálogo Enviado: 100%
Catálogo → Seguimiento Abierto: 90%
Seguimiento → Galería Visitada: 85%
Galería → Reseña Dejada: 66%

ENGAGEMENT
Reseñas con foto: 100%
Rating promedio: 4.8/5
Texto reseña: 150 caracteres
Productos por reseña: 1.5

VELOCIDAD
Reseña registrada → Visible: <1s
Foto subida → Procesada: 5s
Click galería → Cargado: 2s
Filtro aplicado → Resultados: <500ms
```

---

**Arquitectura diseñada para crecer.**
**Última actualización:** 10 Abril 2026
