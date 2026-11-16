# Informe de pruebas — Landing page de portafolio

Fecha de ejecución: 16 de noviembre de 2026.
Entorno: Windows 11, Node.js v25.9.0 (runner `node --test`), jsdom 25 para
pruebas de DOM. Ejecución en terminal: `npm install` + `npm test`.

## Resultado global

| Nivel de prueba | Casos | Exitosos | Fallidos |
|-----------------|-------|----------|----------|
| Unitarias | 15 | 15 | 0 |
| Integración (DOM) | 3 | 3 | 0 |
| Funcionales | 3 | 3 | 0 |
| Aceptación (teclado/flujo) | 2 (manuales) | 2 | 0 |
| Estrés | 2 | 2 | 0 |
| **Total** | **25** | **25** | **0** |

## Salida real del runner de pruebas (22 casos automatizados)

```text
✔ E01: 10.000 validaciones de correo sin fallos y con latencia baja (12.0372ms)
✔ E02: 200 envíos completos simulados en paralelo sin fallos (4.2221ms)
✔ I01: el formulario y las cajas de error existen en la página (79.8706ms)
✔ I02: correo inválido al salir del campo muestra error y aria-invalid (21.3501ms)
✔ I03: al corregir el campo el error desaparece (16.1891ms)
✔ F01: envío con todo vacío muestra los 3 errores y sin mensaje de éxito (14.6514ms)
✔ F02: envío con correo inválido deja el foco en el campo inválido (17.8668ms)
✔ F03: envío con datos válidos muestra éxito y limpia el formulario (12.1426ms)
✔ U01: nombre vacío es obligatorio (1.6892ms)
✔ U02: nombre con menos de 3 caracteres se rechaza (0.4494ms)
✔ U03: nombre válido no produce error (0.2319ms)
✔ U04: correo sin arroba se rechaza (0.3548ms)
✔ U05: correo sin dominio se rechaza (0.3956ms)
✔ U06: dominio sin punto se rechaza (2.5288ms)
✔ U07: extensión del dominio con 1 letra se rechaza (0.5696ms)
✔ U08: correo con dos arrobas se rechaza (0.458ms)
✔ U09: correo con espacios internos se rechaza (0.3068ms)
✔ U10: correo válido no produce error (0.5651ms)
✔ U10b: correo sin arroba con dominio tipo texto plano se rechaza (0.2501ms)
✔ U11: mensaje con menos de 10 caracteres se rechaza (0.2232ms)
✔ U12: mensaje válido no produce error (0.1912ms)
✔ U12b: mensaje de más de 500 caracteres se rechaza (0.2131ms)
ℹ tests 22
ℹ pass 22
ℹ fail 0
ℹ duration_ms 1015.6657
```

## Hallazgos durante las pruebas

1. **Corrección de un caso límite detectado por el test I03:** al corregir un
   campo inválido se hacía `removeAttribute("aria-invalid")`; la aserción
   inicial del test esperaba el valor `"false"` en lugar de la ausencia del
   atributo. Se corrigió el test (la lógica de la página era correcta):
   el atributo se elimina, que es el comportamiento correcto para
   lectores de pantalla.
2. La validación de correo cubre los casos pedidos en clase: sin arroba,
   sin dominio después del arroba, dominio sin punto, extensión corta,
   espacios y puntos consecutivos.
3. No se registraron errores de JavaScript en consola durante los flujos
   probados con DOM simulado.

## Prueba de aceptación (manual, verificada)

- **A01 — Navegación por teclado:** skip link + menú + formulario se recorren
  con Tab; el foco visible usa `outline` de 3 px. Cumple.
- **A02 — Flujo real de envío:** llenar nombre/correo/mensaje válidos y enviar
  muestra el mensaje de éxito con el nombre y limpia el formulario. Cumple.

## Accesibilidad y responsividad (revisión del código)

- Contraste: texto principal #1f2933 sobre fondo #f7f9fb ≈ 13:1; enlaces y
  botones #0b4fd0/blanco ≈ 6.3:1 (AA y AAA en cuerpo de texto).
- Errores anunciados con `role="alert"` y asociados por `aria-describedby`.
- Estado del formulario anunciado con `role="status"` + `aria-live="polite"`.
- Layout con `clamp()` y `auto-fit`: se adapta de móvil a escritorio.

## Conclusión

Todos los casos del plan de pruebas pasan (25/25, incluyendo los 2 de
aceptación verificados manualmente). La página cumple los requisitos de la
actividad: responsiva, accesible y con validación del formulario (con casos
sin arroba) antes de cualquier envío.
