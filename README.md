# NRG Ingeniería — Sitio web corporativo

## Para no desarrolladores: cómo gestionar el contenido

Este sitio está diseñado para que puedas editar textos, agregar servicios, subir fotos y añadir miembros al equipo **sin necesidad de saber programar**. Solo necesitas editar los archivos correctos.

---

## Instalación y desarrollo local

### Requisitos previos
- Node.js 18 o superior
- npm 9 o superior

### Pasos

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/nrg-web.git
   cd nrg-web
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Copia el archivo de variables de entorno y complétalo:
   ```bash
   cp .env.local.example .env.local
   ```
   Edita `.env.local` con tu API key de Resend y el email destino.

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre tu navegador:
   - **Español:** `http://localhost:3000/es`
   - **Inglés:** `http://localhost:3000/en`

### Comandos útiles

| Comando             | Descripción                                    |
|---------------------|------------------------------------------------|
| `npm run dev`       | Servidor de desarrollo con hot-reload          |
| `npm run build`     | Build de producción (genera archivos estáticos)|
| `npm run start`     | Sirve el build de producción localmente        |
| `npx tsc --noEmit`  | Verificación TypeScript sin compilar           |

---

## Dónde editar textos

Los textos de cada página están en archivos `.json` dentro de la carpeta:

```
src/content/
├── es/         ← textos en ESPAÑOL
│   ├── home.json       (página principal)
│   ├── equipo.json     (página del equipo)
│   ├── servicios.json  (listado de servicios)
│   ├── sectores.json   (sectores que atienden)
│   └── contacto.json   (página de contacto)
└── en/         ← textos en INGLÉS (misma estructura)
```

Abre el archivo correspondiente, edita el texto entre comillas y guarda. **No borres las llaves `{` `}` ni los corchetes `[` `]`**.

---

## Cómo agregar un nuevo servicio

Todos los datos del servicio viven en **un solo lugar**: `src/content/es/servicios.json` (español) y `src/content/en/servicios.json` (inglés). No hay que tocar ningún archivo de código.

1. **Edita ambos JSON** y agrega un nuevo objeto al arreglo `"services"`:

   ```json
   {
     "slug": "nuevo-servicio",
     "icon": "Wrench",
     "title": "Nombre del Servicio",
     "shortDescription": "Descripción corta que aparece en las tarjetas del listado.",
     "heroTitle": "Título principal de la página del servicio",
     "heroSubtitle": "Subtítulo o bajada del hero.",
     "includes": {
       "title": "¿Qué incluye este servicio?",
       "items": ["Item 1", "Item 2", "Item 3"]
     },
     "applications": {
       "title": "Aplicaciones",
       "items": ["Aplicación 1", "Aplicación 2"]
     },
     "benefits": {
       "title": "Beneficios",
       "items": ["Beneficio 1", "Beneficio 2"]
     },
     "closing": "Frase de cierre motivacional para el CTA final.",
     "image": "nuevo-servicio.jpg"
   }
   ```

   Íconos disponibles: `Wrench`, `Settings`, `Play`, `Crosshair`, `Lightbulb`, `Package`.

2. **Agrega la imagen** (opcional) en `public/images/servicios/nuevo-servicio.jpg`.
   Si no hay imagen, se muestra automáticamente un placeholder de gradiente.

3. Guarda y el servicio aparece en el listado y tiene su propia página de detalle.

---

## Cómo subir fotos

1. Arrastra la imagen a la carpeta correcta dentro de `public/images/`:
   - Fotos del equipo → `public/images/equipo/`
   - Fotos de servicios → `public/images/servicios/`
   - Fotos del hero → `public/images/hero/`
   - Fotos de sectores → `public/images/sectores/`
   - Fotos de proyectos → `public/images/proyectos/`

2. Usa nombres en minúsculas sin espacios (ej: `juan-perez.jpg`, `turbina-pelton.jpg`).

3. En el JSON correspondiente, pon el nombre del archivo en el campo `"foto"` o `"imagen"`:
   ```json
   "foto": "juan-perez.jpg"
   ```

---

## Cómo agregar un miembro al equipo

1. Edita `src/content/es/equipo.json` (y `src/content/en/equipo.json` para inglés).
2. Agrega un nuevo objeto al array `members.items` con los campos:

   ```json
   {
     "id": "nombre-apellido",
     "name": "Nombre Apellido",
     "role": "Cargo del miembro",
     "shortBio": "Breve descripción de su trayectoria profesional.",
     "strengths": ["Especialidad 1", "Especialidad 2", "Especialidad 3"],
     "experienceYears": "+10 años",
     "regions": ["Latinoamérica", "Europa"],
     "photo": "nombre-apellido.jpg",
     "linkedin": "https://linkedin.com/in/nombre-apellido"
   }
   ```

   Si algún dato no está disponible, usa `null` en los campos opcionales (`name`, `experienceYears`, `photo`, `linkedin`).

3. Si incluye foto, súbela a `public/images/equipo/{id}.jpg` (formato cuadrado 600 × 600 px, JPG o WebP).
4. **No tocar componentes.** El nuevo miembro aparece automáticamente en la grilla.

---

## Cómo agregar un nuevo sector

1. Edita `src/content/es/sectores.json` (y `src/content/en/sectores.json` para inglés).
2. Agrega un nuevo objeto al array `sectors` con los campos:

   ```json
   {
     "id": "eolica",
     "tag": "EÓLICA",
     "icon": "Wind",
     "title": "Parques eólicos",
     "shortDescription": "Descripción corta para cards y previews.",
     "fullDescription": "Descripción completa que aparece en el bloque grande de la página.",
     "turbineTypes": [
       { "name": "Tipo A", "description": "Descripción del tipo A." }
     ],
     "applications": ["Aplicación 1", "Aplicación 2"],
     "image": null,
     "accentColor": "amber"
   }
   ```

   - `icon`: nombre de un ícono de Lucide (ej: `Wind`, `Zap`, `Droplets`, `Cloud`, `Flame`)
   - `accentColor`: `"amber"` (ámbar NRG) o `"teal"` (cian técnico)
   - `image`: ruta a la imagen real (ej: `"/images/sectores/eolica.jpg"`) o `null` para usar placeholder de gradiente

3. Agrega imagen en `public/images/sectores/{id}.jpg` (1200 × 900 px, JPG o WebP).
4. Si quieres que aparezca en la home, agrega el sector también al array `sectors.items` en `home.json`.
5. **No tocar componentes.** El nuevo sector aparece automáticamente en la página `/sectores`.

---

## Variables de entorno

El formulario de contacto requiere configurar un archivo `.env.local` en la raíz del proyecto. Este archivo **NO se sube a git** (ya está en `.gitignore`).

1. Copia el archivo de ejemplo:
   ```
   cp .env.local.example .env.local
   ```
2. Completa los valores en `.env.local`:

   | Variable              | Descripción                                                  |
   |-----------------------|--------------------------------------------------------------|
   | `RESEND_API_KEY`      | API key de Resend (https://resend.com/api-keys)              |
   | `CONTACT_EMAIL_TO`    | Email donde llegan las solicitudes del formulario            |
   | `CONTACT_EMAIL_FROM`  | Email remitente. Usa `onboarding@resend.dev` para pruebas; cuando tengas dominio verificado, cámbialo a `contacto@tu-dominio.com` |

3. Sin estas variables, el formulario mostrará un mensaje de error al enviar (no crashea).

---

## Deploy en producción

Este proyecto está optimizado para Vercel.

### Pasos para desplegar

1. Sube el proyecto a un repositorio de GitHub.
2. Crea una cuenta en https://vercel.com (gratis, conectar con GitHub).
3. En Vercel, "Import Project" y selecciona el repositorio.
4. Configura las variables de entorno en Vercel (Settings → Environment Variables):
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL_TO`
   - `CONTACT_EMAIL_FROM`
5. Haz click en "Deploy". Vercel ejecutará el build automáticamente.

Cada push a la rama `main` activará un nuevo deploy automático.

---

## Stack técnico (para referencia del equipo de desarrollo)

- **Framework:** Next.js 15 con App Router + TypeScript strict
- **Estilos:** Tailwind CSS v4 + shadcn/ui
- **i18n:** next-intl (ES/EN con rutas `/es/` y `/en/`)
- **Formularios:** React Hook Form + Zod + Resend
- **Despliegue:** Vercel (SSG + API routes)

---

## Preguntas frecuentes

**¿Por qué veo "Placeholder"?**
El sitio está en construcción. Los textos placeholder se reemplazarán con el contenido real en los próximos pasos.

**¿Qué pasa si rompo algo?**
Si editas un JSON y la página deja de cargar, revisa que no hayas borrado comas, comillas o llaves. Puedes usar [jsonlint.com](https://jsonlint.com) para verificar que el JSON es válido.
