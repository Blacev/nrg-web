# Imágenes del equipo

Coloca aquí las fotos de los miembros del equipo. El `id` del miembro en el JSON determina el nombre del archivo.

## Archivos esperados

| Archivo                          | Miembro                                  |
|----------------------------------|------------------------------------------|
| `ingenieria-direccion.jpg`       | Ingeniero Mecánico — Dirección técnica   |
| `supervision-senior-1.jpg`       | Supervisor de campo senior (1)           |
| `supervision-senior-2.jpg`       | Supervisor de campo senior (2)           |

Los nombres de archivo deben coincidir exactamente con el campo `"id"` del miembro en el JSON.

## Especificaciones recomendadas

- **Formato:** JPG o WebP
- **Resolución:** 600 × 600 px (cuadrado)
- **Peso:** ≤ 150 KB por imagen (usar WebP para mejor compresión)
- **Fondo:** neutro (blanco, gris claro) o en planta con foco en el profesional
- **Encuadre:** busto o retrato, centrado

## Comportamiento mientras no haya fotos

El componente `TeamMemberCard` muestra automáticamente un avatar placeholder con icono cuando `photo` es `null` en el JSON. No hay que tocar código.

## Cómo agregar un nuevo miembro con foto

1. Sube la foto aquí como `{id-del-miembro}.jpg` (ej: `juan-perez.jpg`).
2. En `src/content/es/equipo.json` y `src/content/en/equipo.json`, actualiza el campo
   `"photo"` del miembro con el nombre del archivo:
   ```json
   "photo": "juan-perez.jpg"
   ```
3. No tocar ningún componente. La foto aparece automáticamente.
