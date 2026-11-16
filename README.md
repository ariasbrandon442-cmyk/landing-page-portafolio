# Landing page — Portafolio profesional

Landing page de portafolio personal construida con HTML, CSS y JavaScript puro
(sin frameworks). Proyecto de la asignatura Nuevas Tecnologías (UNIMINUTO,
Semana 4): incluye validación de formularios, accesibilidad, diseño responsivo
y un plan de pruebas automatizado.

## Secciones

- Inicio
- Sobre mí
- Habilidades
- Proyectos (3)
- Contacto (formulario con validación)

## Características

- Responsiva: móvil, tablet y escritorio (CSS Grid + media queries).
- Accesible: HTML semántico, skip link, `role`, `aria-describedby`,
  `aria-invalid`, `role="alert"` para errores, navegación por teclado y
  contraste AA.
- Validación del formulario en JavaScript: nombre (3-80 caracteres), correo
  (arroba, dominio con punto, extensión válida, sin espacios ni puntos
  consecutivos) y mensaje (10-500 caracteres).

## Ejecución local

Abrir `index.html` en el navegador, o servir la carpeta:

```bash
npx serve .
```

## Pruebas

Requisitos: Node.js 18 o superior.

```bash
npm install
npm test
```

- Pruebas unitarias y de estrés: `node --test` (runner integrado de Node).
- Pruebas de integración y funcionales: jsdom (DOM simulado).

El plan completo está en [PLAN_DE_PRUEBAS.md](PLAN_DE_PRUEBAS.md) y los
resultados reales en [INFORME_PRUEBAS.md](INFORME_PRUEBAS.md).

## Despliegue

- Demo en línea: _agregar aquí la URL de Netlify_
- Repositorio: _agregar aquí la URL de GitHub_
