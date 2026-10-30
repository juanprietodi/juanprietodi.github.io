# JMMP — Sitio de Juan (Visual Designer / UI-UX / 3D Artist)

Landing page estática construida en HTML + CSS + JS puro (sin frameworks ni build
step). Podés abrir `index.html` directamente en el navegador o subir toda la
carpeta a cualquier hosting estático (Netlify, Vercel, GitHub Pages, cPanel, etc.).

## Estructura

```
index.html      → todo el contenido y estructura de la página
styles.css      → estilos, tipografía, colores, responsive
script.js       → scroll suave, parallax del mouse, menú mobile
assets/         → imágenes recortadas del mockup original (aros de vidrio/cromo,
                   logo swirl del footer)
```

## Cosas para revisar / personalizar

1. **Download CV**: el botón "Download CV" en la sección About todavía apunta a
   `href="#"` (línea marcada con `<!-- TODO -->` en `index.html`). Subí tu PDF a
   `assets/` y cambiá el `href` a esa ruta, por ejemplo:
   `href="assets/Juan-CV.pdf" download`.

2. **Links de proyectos y redes**: ya están cargados con las URLs exactas que
   indicaste en las anotaciones (Behance de cada proyecto, LinkedIn, Behance de
   perfil). Si alguno cambia, están en `index.html` dentro de cada
   `<a class="project-row" href="...">` y en la sección `#contact`.

3. **Título mobile**: en pantallas chicas el hero muestra "PRODUCT DESIGNER" en
   lugar de "VISUAL DESIGNER", tal como se veía en la referencia de responsive.
   Si en realidad querías el mismo texto en ambos, buscá `.hero__title-mobile`
   en `styles.css` y `.hero__title-desktop` para ajustar qué se oculta en cada
   breakpoint (900px).

## Comportamientos implementados

- **Scroll suave**: los links del nav (About/Experience/Projects/Contact) y el
  botón circular de flecha del hero hacen scroll animado a su sección.
- **Parallax**: los aros de vidrio del Hero y de About se mueven levemente
  siguiendo el mouse (desactivado automáticamente si el usuario tiene activada
  la preferencia "reducir movimiento" del sistema).
- **Hover en proyectos**: cada fila cambia a fondo crema + texto oscuro al
  pasar el mouse, igual que mostraba la referencia.
- **Menú mobile**: por debajo de 900px aparece un botón hamburguesa que abre un
  overlay a pantalla completa con los mismos links de navegación.

## Fuentes usadas (Google Fonts, cargadas por CDN)

- **Archivo** (italic/black) → títulos grandes
- **Space Mono** → nav, etiquetas, números, texto de cuerpo
- **Inter** (italic + bold) → texto del footer "Lets create something great togheter"

Si preferís no depender de Google Fonts (por privacidad o performance), podés
descargar estas tres familias y servirlas localmente, reemplazando el `<link>`
de Google Fonts en el `<head>` de `index.html`.
