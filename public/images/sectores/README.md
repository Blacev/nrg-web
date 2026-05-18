# Imágenes de Sectores

Coloca aquí las fotos o renders de cada sector. El campo `"id"` del sector en el JSON determina el nombre del archivo.

## Archivos esperados

| Archivo       | Sector                           |
|---------------|----------------------------------|
| `hidro.jpg`   | Centrales hidroeléctricas        |
| `vapor.jpg`   | Centrales térmicas de vapor      |
| `gas.jpg`     | Centrales térmicas de gas        |

## Especificaciones recomendadas

- **Formato:** JPG o WebP
- **Resolución:** 1200 × 900 px mínimo (relación 4:3)
- **Peso:** ≤ 400 KB por imagen (usar WebP para mejor compresión)
- **Contenido:** Fotografía de planta o turbina representativa del sector
- **Orientación:** Horizontal (landscape)

## Comportamiento mientras no haya fotos

La página `/sectores` muestra automáticamente un placeholder de gradiente navy con el ícono del sector cuando `"image"` es `null` en el JSON. No hay que tocar código.

## Cómo activar una imagen real

En `src/content/es/sectores.json` (y `en/sectores.json`), cambia el campo `"image"` del sector de `null` a la ruta del archivo:

```json
"image": "/images/sectores/hidro.jpg"
```

La imagen aparece automáticamente en el bloque del sector. Si quieres agregar un nuevo sector, sigue las instrucciones del README principal.
