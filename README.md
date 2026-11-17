# Landing page â€” Portafolio profesional

Landing page de portafolio personal construida con HTML, CSS y JavaScript puro
(sin frameworks). Proyecto de la asignatura Nuevas TecnologÃ­as (UNIMINUTO,
Semana 4): incluye validaciÃ³n de formularios, accesibilidad, diseÃ±o responsivo
y un plan de pruebas automatizado.

## Secciones

- Inicio
- Sobre mÃ­
- Habilidades
- Proyectos (3)
- Contacto (formulario con validaciÃ³n)

## CaracterÃ­sticas

- Responsiva: mÃ³vil, tablet y escritorio (CSS Grid + media queries).
- Accesible: HTML semÃ¡ntico, skip link, `role`, `aria-describedby`,
  `aria-invalid`, `role="alert"` para errores, navegaciÃ³n por teclado y
  contraste AA.
- ValidaciÃ³n del formulario en JavaScript: nombre (3-80 caracteres), correo
  (arroba, dominio con punto, extensiÃ³n vÃ¡lida, sin espacios ni puntos
  consecutivos) y mensaje (10-500 caracteres).

## EjecuciÃ³n local

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

- Pruebas unitarias y de estrÃ©s: `node --test` (runner integrado de Node).
- Pruebas de integraciÃ³n y funcionales: jsdom (DOM simulado).

El plan completo estÃ¡ en [PLAN_DE_PRUEBAS.md](PLAN_DE_PRUEBAS.md) y los
resultados reales en [INFORME_PRUEBAS.md](INFORME_PRUEBAS.md).

## Despliegue

- Repositorio: https://github.com/ariasbrandon442-cmyk/landing-page-portafolio
- Demo en lÃ­nea: _agregar aquÃ­ la URL de Netlify_

