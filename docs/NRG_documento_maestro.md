# NRG — Ingeniería en movimiento
## Documento maestro del sitio web

> Este documento es la fuente de verdad para el copy, estructura y decisiones de diseño. Úsalo como referencia al ejecutar cada prompt en Claude Code.

---

## 1. Identidad de marca

**Nombre:** NRG — Ingeniería en movimiento
**Tagline principal:** *Ingeniería en movimiento. Experiencia en cada giro.*
**Tono:** Técnico-confiable + moderno-aspiracional
**Mercado:** Internacional (Latinoamérica, Europa, África como mercados naturales por la trayectoria del equipo)
**Idiomas:** Español (principal) e Inglés

### Paleta de colores

| Variable | Hex | Uso |
|---|---|---|
| `--color-primary` | `#0A1F44` | Navy profundo — headers, hero, tipografía principal |
| `--color-accent` | `#E89F3C` | Ámbar técnico — CTAs, líneas de acento, hover |
| `--color-secondary` | `#475569` | Grafito — texto secundario, bordes |
| `--color-surface` | `#FFFFFF` | Cards, contenido principal |
| `--color-bg-alt` | `#F8FAFC` | Secciones alternas |
| `--color-success` | `#0EA5A4` | Verde-cian sobrio — badges técnicos opcionales |
| `--color-border` | `#E2E8F0` | Bordes sutiles |
| `--color-text` | `#0F172A` | Texto principal sobre fondos claros |
| `--color-text-light` | `#FFFFFF` | Texto sobre fondos oscuros |

### Tipografías
- **Títulos:** Space Grotesk (700, 600)
- **Cuerpo:** Inter (400, 500, 600)
- **Datos técnicos:** JetBrains Mono (500)

---

## 2. Stack técnico

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Estilos:** Tailwind CSS v4 + shadcn/ui
- **Animaciones:** Framer Motion + Lenis (smooth scroll)
- **i18n:** next-intl (rutas `/es/` y `/en/`)
- **Formularios:** React Hook Form + Zod + Resend
- **Contenido:** MDX local + JSON estructurado (fácil de editar sin tocar código)
- **Iconos:** Lucide React
- **Despliegue:** Vercel
- **Imágenes:** next/image con carpetas `/public/images/equipo`, `/public/images/servicios`, `/public/images/proyectos`

### Estructura de carpetas para no-devs (donde editarás contenido)

```
/content
  /es
    home.json
    equipo.json
    servicios.json
    sectores.json
    contacto.json
  /en
    [espejo en inglés]
  /servicios
    mantenimiento.mdx
    montaje.mdx
    puesta-en-marcha.mdx
    alineacion.mdx
    asesoria.mdx
    suministros.mdx

/public
  /images
    /hero
    /equipo
    /servicios
    /sectores
    /proyectos
```

Para cambiar un texto: abres el `.json` o `.mdx`, editas, guardas, `git push`.
Para subir una foto: la arrastras a la carpeta correspondiente con el nombre que pide el JSON.

---

## 3. Métricas clave (usar a lo largo del sitio)

- **+35 años** de experiencia combinada en campo
- **+50 proyectos** intervenidos por el equipo
- **15 países** de operación entre Latam, Europa y África
- **3 continentes** de experiencia
- **3 tecnologías** dominadas: hidráulica, vapor, gas

---

## 4. Mapa del sitio

```
/                       Home
/servicios              Listado de servicios
/servicios/[slug]       Página individual por servicio
/equipo                 Sobre el equipo y filosofía
/sectores               Hidro / Vapor / Gas
/contacto               Formulario + datos
/en/...                 Versión inglés
```

---

## 5. COPY COMPLETO POR SECCIÓN

### 5.1 HOME

#### Hero
- **Eyebrow (texto pequeño arriba):** Servicios de ingeniería para centrales eléctricas
- **H1:** Ingeniería en movimiento.
**Experiencia en cada giro.**
- **Subtítulo:** Mantenimiento, montaje y puesta en marcha de turbinas hidráulicas, de vapor y de gas. Operamos donde la energía gira — con un equipo que ha intervenido más de 50 proyectos en 15 países.
- **CTA primario:** Solicitar cotización
- **CTA secundario:** Conoce al equipo

#### Banda de métricas (debajo del hero)
> +35 años de experiencia combinada · 15 países · 3 continentes · +50 proyectos

#### Propuesta de valor (3 pilares)
**Título de sección:** Lo que nos hace diferentes
**Subtítulo:** Somos una firma joven con un equipo veterano. Esa combinación define cómo trabajamos.

1. **Experiencia probada en campo**
Nuestros supervisores acumulan más de 30 años interviniendo turbinas en plantas de tres continentes. Hemos visto suficientes centrales para saber qué funciona y qué no.

2. **Agilidad sin burocracia**
Operamos como un equipo enfocado, sin las capas administrativas de las grandes firmas. Eso significa respuestas rápidas, decisiones técnicas directas y trato cercano.

3. **Rigor técnico, criterio práctico**
Cada intervención sigue los estándares del fabricante y las normas del sector — pero las aplicamos con el criterio que solo dan los años en planta.

#### Servicios (grid 6 cards)
**Título:** Servicios

1. **Mantenimiento**
Preventivo, correctivo y predictivo para turbinas hidráulicas, de vapor y de gas. Inspecciones, overhaul mayor y menor.

2. **Montaje**
Instalación mecánica completa de turbinas y equipos auxiliares, desde la recepción en sitio hasta el acople final.

3. **Puesta en marcha**
Commissioning, pruebas de aceptación, sincronización y entrega operativa al cliente.

4. **Alineación**
Alineación láser de precisión entre turbina y generador. Reducción de vibraciones y desgaste prematuro.

5. **Asesoría técnica**
Consultoría especializada en operación, fallas recurrentes, planes de mantenimiento y modernización.

6. **Suministros**
Repuestos originales y alternativos, herramientas especializadas y soporte logístico para intervenciones.

**Link debajo del grid:** Ver todos los servicios →

#### Sectores que atendemos
**Título:** Tres tecnologías. Una misma exigencia técnica.

- **Centrales hidroeléctricas** — Turbinas Pelton, Francis y Kaplan. Desde minicentrales hasta plantas de gran capacidad.
- **Centrales térmicas de vapor** — Turbinas de vapor en plantas de biomasa, cogeneración, ingenios azucareros y termoeléctricas.
- **Centrales térmicas de gas** — Turbinas de gas en ciclo simple y combinado, plantas de respaldo y generación distribuida.

#### Nuestro equipo (sección preview)
**Título:** El equipo es la empresa.
**Subtítulo:** Antes de NRG, nuestros ingenieros y supervisores ya estaban interviniendo turbinas alrededor del mundo. Ahora trabajan bajo una sola firma.

**Bloque destacado:**
> En este sector, las plantas no contratan logos: contratan a las personas que llegan a sitio. Por eso hablamos primero del equipo.

**CTA:** Conoce a quienes hacen el trabajo →

#### Por qué elegirnos (4-5 razones)
**Título:** Por qué trabajar con NRG

1. **Cobertura internacional real**
Nuestro equipo ha trabajado en plantas de Latinoamérica, Europa y África. Movilidad internacional es parte de cómo operamos.

2. **Multi-tecnología**
No nos especializamos en una sola marca o tipo de turbina. Trabajamos con hidráulicas, de vapor y de gas — lo que reduce su número de proveedores.

3. **Cercanía con la dirección**
Cuando contrata NRG, habla con quien toma las decisiones técnicas. Sin intermediarios comerciales.

4. **Respuesta rápida en emergencias**
Estructura ligera = activación inmediata. En paradas no programadas, cada hora cuenta.

5. **Documentación impecable**
Protocolos, reportes técnicos y entregables al nivel que exigen las grandes operadoras.

#### CTA banda (antes del footer)
**Título:** ¿Tienes una intervención en planta?
**Subtítulo:** Cuéntanos qué necesitas. Te respondemos en menos de 24 horas con una propuesta técnica clara.
**CTA:** Solicitar cotización
**CTA secundario:** Hablar por WhatsApp

#### Footer
- Logo + tagline corto
- Columnas: Servicios / Empresa / Contacto / Legal
- Dirección, teléfono, email
- Redes sociales (LinkedIn principalmente)
- Selector de idioma
- "© 2025 NRG Ingeniería S.A.S. Todos los derechos reservados."

---

### 5.2 PÁGINA /equipo

#### Hero de sección
**Eyebrow:** El equipo
**H1:** Décadas de experiencia. Una sola firma.
**Subtítulo:** NRG nace como empresa en 2025, pero las personas que la conforman llevan toda su carrera profesional interviniendo turbinas alrededor del mundo. Esa es la única trayectoria que importa cuando la planta está parada.

#### Filosofía
**Título:** Por qué el equipo importa más que la antigüedad de la empresa
**Texto:**
En la ingeniería de turbinas, las empresas no resuelven problemas: lo hacen las personas que llegan a sitio con experiencia, criterio y manos. Una firma con 30 años de antigüedad pero rotación constante de personal puede tener menos experiencia útil que un equipo joven como empresa, pero con veteranos que han visto cientos de máquinas.

NRG es eso: un equipo cuya experiencia colectiva supera con creces la edad de la empresa que ahora los reúne.

#### Perfiles (sin nombres por ahora)

**Card 1 — Dirección de Ingeniería**
- **Rol:** Ingeniero Mecánico — Dirección técnica
- **Trayectoria:** Formación sólida en ingeniería mecánica con enfoque en sistemas rotativos y diseño de plantas. Responsable de la coordinación técnica, ingeniería de proyectos y desarrollo de propuestas.
- **Fortalezas:** Análisis técnico, ingeniería de detalle, gestión de proyectos.

**Card 2 — Supervisión de Campo (Senior)**
- **Rol:** Supervisor de campo senior
- **Trayectoria:** Más de 15 años interviniendo turbinas en plantas hidroeléctricas, termoeléctricas y de gas en Latinoamérica, Europa y África.
- **Especialidad:** Montaje mecánico, puesta en marcha, alineación de precisión.

**Card 3 — Supervisión de Campo (Senior)**
- **Rol:** Supervisor de campo senior
- **Trayectoria:** Más de 15 años de experiencia internacional en mantenimiento e intervención de turbinas y generadores. Trayectoria sólida en plantas de gran escala.
- **Especialidad:** Mantenimiento mayor, diagnóstico de fallas, supervisión de obra.

> **Nota técnica:** los perfiles están diseñados como cards reutilizables. Cuando tengas autorización para mostrar nombres y fotos, solo se actualiza el JSON.

#### Banda de credenciales
**Título:** Lo que el equipo trae a la mesa
- **+35 años** de experiencia combinada en campo
- **15 países** donde el equipo ha operado
- **+50 proyectos** entre centrales hidro, vapor y gas
- **3 continentes** — Latam, Europa, África

#### CTA
**Título:** ¿Quiere conocer cómo este equipo puede ayudar a su planta?
**CTA:** Agendar una llamada técnica

---

### 5.3 PÁGINA /servicios (listado)

#### Hero de sección
**Eyebrow:** Servicios
**H1:** Servicios integrales para centrales eléctricas
**Subtítulo:** Acompañamos su planta en todo el ciclo de vida de las turbinas: desde el montaje inicial hasta el mantenimiento mayor, pasando por modernizaciones y soporte técnico continuo.

#### Cards de servicios (mismas 6 del home, con link a página individual)

---

### 5.4 PÁGINAS /servicios/[slug] — Plantilla

> Cada servicio tendrá su MDX con la misma estructura. A continuación, el contenido para los 6 servicios.

#### MANTENIMIENTO

**Hero:**
- H1: Mantenimiento de turbinas
- Subtítulo: Programas de mantenimiento preventivo, correctivo y predictivo diseñados para maximizar disponibilidad y extender la vida útil de su equipo.

**Qué incluye:**
- Inspecciones programadas (boroscopia, vibración, alineación, balanceo)
- Mantenimiento preventivo según horas de operación o calendario
- Mantenimiento correctivo de emergencia
- Overhaul mayor y menor
- Diagnóstico de fallas y análisis de causa raíz
- Reportes técnicos con recomendaciones

**Aplicaciones:**
- Turbinas hidráulicas (Pelton, Francis, Kaplan)
- Turbinas de vapor (acción, reacción, condensación, contrapresión)
- Turbinas de gas (ciclo simple y combinado)

**Cierre:** Reduzca paradas no programadas. Hablemos de un plan de mantenimiento para su planta.

---

#### MONTAJE

**Hero:**
- H1: Montaje de turbinas y equipos auxiliares
- Subtítulo: Instalación mecánica completa desde la recepción del equipo en sitio hasta la entrega lista para puesta en marcha.

**Qué incluye:**
- Recepción y verificación en sitio
- Premontaje y montaje del rotor, estator y carcasa
- Acople a generador y alineación
- Montaje de sistemas auxiliares (aceite de lubricación, refrigeración, control)
- Pruebas mecánicas previas a comisionamiento
- Documentación de obra y dossier técnico

**Cierre:** Garantice un montaje conforme a estándares del fabricante. Consulte por su próximo proyecto.

---

#### PUESTA EN MARCHA

**Hero:**
- H1: Puesta en marcha y comisionamiento
- Subtítulo: Transformamos un equipo instalado en una unidad de generación operativa, confiable y entregada formalmente al cliente.

**Qué incluye:**
- Pruebas en frío y en caliente
- Sincronización con red
- Pruebas de aceptación de funcionamiento (performance tests)
- Curvas de operación y registros de comisionamiento
- Capacitación al personal de operación del cliente
- Entrega formal con dossier completo

**Cierre:** Pase de la obra a la operación con seguridad técnica y respaldo documental.

---

#### ALINEACIÓN

**Hero:**
- H1: Alineación de precisión
- Subtítulo: Alineación láser entre turbina, reductor y generador para eliminar vibraciones, reducir desgaste y proteger su inversión.

**Qué incluye:**
- Alineación láser de alta precisión
- Corrección de desalineaciones angulares y paralelas
- Verificación de soft foot y planitud de base
- Reportes con valores antes/después
- Recomendaciones para próximos chequeos

**Cierre:** Una buena alineación puede ahorrar años de vida útil. Pida un servicio puntual o programado.

---

#### ASESORÍA TÉCNICA

**Hero:**
- H1: Asesoría técnica especializada
- Subtítulo: Consultoría independiente para apoyar las decisiones técnicas más importantes de su planta.

**Qué incluye:**
- Diagnóstico de problemas operativos recurrentes
- Diseño de planes de mantenimiento
- Estudios de modernización y repotenciación
- Segunda opinión técnica frente a propuestas de terceros
- Acompañamiento en negociaciones técnicas con fabricantes

**Cierre:** Decisiones técnicas mejor informadas. Hablemos.

---

#### SUMINISTROS

**Hero:**
- H1: Suministros y repuestos
- Subtítulo: Gestión de repuestos originales y alternativos, además de herramientas especializadas para intervenciones de turbinas.

**Qué incluye:**
- Repuestos originales de fabricante
- Repuestos alternativos certificados
- Herramientas especializadas (gatos hidráulicos, alineadores, instrumentación)
- Soporte logístico internacional
- Asesoría de obsolescencia y reemplazo

**Cierre:** Reduzca tiempos de parada con la cadena de suministro correcta.

---

### 5.5 PÁGINA /sectores

#### Hero
- H1: Sectores que atendemos
- Subtítulo: Trabajamos con las tres principales tecnologías de generación basadas en turbinas. Esa amplitud técnica le da a su empresa un solo proveedor para múltiples necesidades.

#### Hidroeléctricas
- **Título:** Centrales hidroeléctricas
- **Texto:** Intervenimos turbinas Pelton, Francis y Kaplan en centrales de baja, media y alta caída. Trabajamos tanto en minicentrales (PCH) como en plantas de gran capacidad, atendiendo proyectos públicos y privados.
- **Tipos:** Pelton · Francis · Kaplan · Bulbo

#### Vapor
- **Título:** Centrales térmicas de vapor
- **Texto:** Servicios sobre turbinas de vapor en plantas de cogeneración, biomasa, ingenios azucareros, refinerías y termoeléctricas. Manejo de turbinas de acción y reacción, condensación y contrapresión.
- **Tipos:** Acción · Reacción · Condensación · Contrapresión

#### Gas
- **Título:** Centrales térmicas de gas
- **Texto:** Turbinas de gas industriales y aeroderivadas en ciclo simple y combinado. Plantas de respaldo, cogeneración industrial y generación distribuida.
- **Tipos:** Industriales · Aeroderivadas · Ciclo simple · Ciclo combinado

---

### 5.6 PÁGINA /contacto

#### Hero
- H1: Hablemos de su próximo proyecto
- Subtítulo: Cuéntenos qué necesita su planta. Le respondemos en menos de 24 horas hábiles con una propuesta técnica clara.

#### Formulario
Campos:
- Nombre completo *
- Empresa *
- Cargo
- Email corporativo *
- Teléfono / WhatsApp
- País
- Tipo de servicio requerido (selector: Mantenimiento / Montaje / Puesta en marcha / Alineación / Asesoría / Suministros / Otro)
- Tipo de central (selector: Hidroeléctrica / Vapor / Gas / Otra)
- Descripción del proyecto o necesidad *
- Adjuntar archivo (opcional, hasta 10MB)

Botón: Enviar solicitud

#### Sidebar de contacto directo
- 📍 Dirección física (pendiente)
- 📞 Teléfono: +57 [pendiente]
- ✉️ Email: contacto@nrg-ingenieria.com (sugerido)
- 💬 WhatsApp directo (link wa.me)
- 🕐 Horario de atención

#### Línea de cierre
> Para emergencias en planta fuera de horario, contáctenos por WhatsApp. Nuestro equipo se moviliza internacionalmente.

---

## 6. Elementos de diseño UX/UI

### Animaciones (con Framer Motion)
- **Hero:** Texto con fade-up escalonado al cargar; imagen de fondo con parallax suave al scroll
- **Métricas:** Contadores animados que cuentan desde 0 al entrar al viewport
- **Cards de servicios:** Fade-in escalonado al hacer scroll; hover con elevación sutil + cambio de color de acento
- **Equipo:** Cards con reveal lateral al hacer scroll
- **Smooth scroll global** con Lenis para sensación premium
- **Navbar:** Cambio de estado (transparente → sólido con blur) al hacer scroll

### Microinteracciones
- Botones con transición de color en hover (0.2s ease)
- Links con underline animado (de izquierda a derecha)
- Cards con sombra que crece sutilmente al hover
- Cursor change en elementos clickeables

### Componentes visuales clave
- **Hero con video o imagen de turbina** (recomendado: video corto en loop de turbina girando, en B&W o tono navy)
- **Sección de métricas** con números grandes en JetBrains Mono
- **Cards de servicios** con icono Lucide + título + descripción + flecha al hover
- **Banda de credenciales** con fondo navy y números en ámbar
- **Mapa interactivo** (opcional) en la sección de equipo mostrando los 15 países

### Responsive
- Mobile-first
- Breakpoints estándar Tailwind (sm 640 / md 768 / lg 1024 / xl 1280)
- Hero ajustado para mobile con CTA prominente
- Navegación con hamburguesa en mobile

### Accesibilidad
- Contraste AAA en textos principales
- Alt en todas las imágenes
- ARIA labels en componentes interactivos
- Focus visible en navegación por teclado
- Tamaño mínimo de texto 16px

---

## 7. SEO técnico

- Meta tags por página (title, description, og:image)
- Schema.org: Organization + LocalBusiness + Service
- Sitemap.xml automático
- robots.txt
- Open Graph para compartir en LinkedIn (clave para B2B industrial)
- Canonical tags para ES/EN
- hreflang correcto

### Keywords objetivo (ES)
- mantenimiento de turbinas
- montaje de turbinas hidráulicas
- puesta en marcha turbinas vapor
- alineación láser turbinas
- servicios centrales eléctricas
- ingeniería turbinas Latinoamérica

### Keywords objetivo (EN)
- turbine maintenance services
- hydro turbine commissioning
- steam turbine alignment
- power plant engineering services

---

## 8. Orden de ejecución sugerido en Claude Code

1. **Setup inicial** — proyecto Next.js + Tailwind + shadcn + dependencias
2. **Sistema de diseño** — variables CSS, fuentes, componentes base (Button, Card, Container)
3. **Layout global** — Navbar + Footer + sistema de i18n
4. **Home — Hero + métricas**
5. **Home — Servicios + Sectores**
6. **Home — Equipo preview + Por qué elegirnos + CTA banda**
7. **Página /equipo completa**
8. **Página /servicios + páginas individuales**
9. **Página /sectores**
10. **Página /contacto + formulario funcional**
11. **Traducción EN + i18n completo**
12. **SEO + meta tags + sitemap**
13. **Animaciones Framer Motion + Lenis**
14. **Optimización de imágenes + performance**
15. **Despliegue en Vercel**

---

## 9. Pendientes que necesitas resolver en paralelo

- [ ] Logo final
- [ ] Fotos del equipo (profesionales, fondo neutro o en planta)
- [ ] Fotos/video de turbinas para hero
- [ ] Dominio (sugerencia: `nrg-ingenieria.com` o similar)
- [ ] Email corporativo
- [ ] Datos legales (NIT, dirección fiscal)
- [ ] Cuenta en Resend para emails del formulario
- [ ] Cuenta en Vercel para despliegue
- [ ] LinkedIn corporativo
- [ ] Política de privacidad y términos (para cumplimiento legal internacional)
