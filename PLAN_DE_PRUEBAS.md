# Plan de pruebas — Landing page de portafolio

Proyecto: `landing-page` (portafolio profesional, HTML + CSS + JavaScript puro).
Objetivo: verificar que la página es responsiva, accesible y que el formulario
valida correctamente los datos antes de cualquier envío.

## Alcance

Solo la lógica de validación y el comportamiento del formulario de contacto.
Fuera de alcance: backend de envío real de correos (no fue solicitado) y
rendimiento de red.

## Niveles de prueba y casos

### 1. Pruebas unitarias (funciones puras en `validaciones.js`)

Ejecución: `npm test` (Node.js con el runner integrado `node --test`).

| ID | Caso | Entrada | Esperado |
|----|------|---------|----------|
| U01 | Nombre vacío | `""` | Error "El nombre es obligatorio." |
| U02 | Nombre corto | `"ab"` | Error "al menos 3 caracteres" |
| U03 | Nombre válido | `"Brandon Garcia"` | Sin error |
| U04 | Correo sin arroba | `brandon.gmail.com` | Error "debe contener @" |
| U05 | Correo sin dominio | `brandon@` | Error "debe venir un dominio" |
| U06 | Dominio sin punto | `brandon@gmail` | Error "al menos un punto" |
| U07 | Extensión inválida | `brandon@correo.c` | Error "al menos 2 letras" |
| U08 | Dos arrobas | `b@@gmail.com` | Error "solo puede tener un @" |
| U09 | Espacios internos | `bran don@gmail.com` | Error "no puede contener espacios" |
| U10 | Correo válido | `brandon@gmail.com` | Sin error |
| U11 | Mensaje corto | `"hola"` | Error "al menos 10 caracteres" |
| U12 | Mensaje válido | texto de 10-500 | Sin error |

### 2. Pruebas de integración (DOM con jsdom)

| ID | Caso | Esperado |
|----|------|----------|
| I01 | El formulario y las cajas de error existen en la página | Elementos presentes |
| I02 | Al escribir un correo inválido y salir del campo | Mensaje de error visible y `aria-invalid="true"` |
| I03 | Al corregir el campo y salir | Error se oculta y `aria-invalid` se retira |

### 3. Pruebas funcionales (flujo de envío del formulario)

| ID | Caso | Esperado |
|----|------|----------|
| F01 | Envío con todo vacío | 3 errores visibles, sin mensaje de éxito |
| F02 | Envío con correo inválido | Error en correo, foco en el campo inválido |
| F03 | Envío con datos válidos | Mensaje de éxito visible y formulario limpio |

### 4. Prueba de aceptación (flujo completo de la persona usuaria)

| ID | Caso | Esperado |
|----|------|----------|
| A01 | Recorrer la página por teclado (skip link, enlaces, campos, botón) | Todos los elementos alcanzables con Tab |
| A02 | Flujo real: llenar nombre + correo + mensaje y enviar | Mensaje de éxito con el nombre de la persona |

### 5. Prueba de estrés (carga de la lógica cliente)

| ID | Caso | Esperado |
|----|------|----------|
| E01 | 10.000 validaciones de correo seguidas | 0 fallos, latencia media < 0,1 ms por validación |
| E02 | 200 envíos simulados en paralelo | 0 fallos, duración total < 1 s |

Nota honesta: al no haber backend, la prueba de estrés mide la lógica de
validación en el navegador (JavaScript), no servidores.

## Criterios de aceptación

- 100 % de casos de prueba en estado exitoso.
- 0 errores de JavaScript en consola durante los flujos funcionales.
- Mensajes de error visibles, asociados por `aria-describedby` y anunciados
  con `role="alert"`.
- Página navegable solo con teclado y contraste de texto AA o superior.
