# Imágenes de Servicios

Coloca aquí las imágenes para cada servicio. El slug del servicio determina el nombre del archivo.

## Archivos esperados

| Archivo                     | Servicio                  |
|-----------------------------|---------------------------|
| `mantenimiento.jpg`         | Mantenimiento Industrial  |
| `montaje.jpg`               | Montaje de Equipos        |
| `puesta-en-marcha.jpg`      | Puesta en Marcha          |
| `alineacion.jpg`            | Alineación de Precisión   |
| `asesoria.jpg`              | Asesoría Técnica          |
| `suministros.jpg`           | Suministro de Repuestos   |

## Especificaciones recomendadas

- **Formato:** JPG o WebP
- **Resolución:** 1200 × 800 px mínimo (relación 3:2)
- **Peso:** ≤ 300 KB por imagen (usar WebP para mejor compresión)
- **Contenido:** Fotografías industriales relevantes al servicio

## Cómo agregar un nuevo servicio con imagen

1. Agrega la entrada en `src/content/es/servicios.json` y `src/content/en/servicios.json`
   con el campo `"slug"` que coincida exactamente con el nombre del archivo de imagen.
2. Coloca la imagen aquí como `{slug}.jpg` (o `.webp`).
3. Actualiza el componente `ServicioPage` para usar `<Image>` de Next.js si deseas
   reemplazar el placeholder de gradiente por la imagen real.

Mientras no haya imagen real, el placeholder de gradiente SVG se muestra automáticamente.
