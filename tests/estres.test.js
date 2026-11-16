"use strict";

const test = require("node:test");
const assert = require("node:assert");
const { validarCorreo, validarNombre, validarMensaje } = require("../validaciones.js");

const correosMixtos = [
  "brandon@gmail.com", "sin-arroba.com", "dos@@arrobas.com", "b@sin-punto",
  "b@dominio.c", "espacio interno@gmail.com", "valido@uniminuto.edu.co",
  "@sinlocal.com", "b@gmail..com", "otro.valido@correo.co"
];

test("E01: 10.000 validaciones de correo sin fallos y con latencia baja", () => {
  const total = 10000;
  const inicio = process.hrtime.bigint();
  let fallos = 0;
  for (let i = 0; i < total; i += 1) {
    const correo = correosMixtos[i % correosMixtos.length];
    const resultado = validarCorreo(correo);
    if (typeof resultado !== "string") {
      fallos += 1;
    }
  }
  const fin = process.hrtime.bigint();
  const milisegundos = Number(fin - inicio) / 1e6;
  const promedio = milisegundos / total;
  assert.strictEqual(fallos, 0);
  assert.ok(promedio < 0.1, `latencia media ${promedio.toFixed(4)} ms >= 0.1 ms`);
});

test("E02: 200 envíos completos simulados en paralelo sin fallos", async () => {
  const inicio = Date.now();
  const envios = Array.from({ length: 200 }, (_, i) =>
    Promise.resolve().then(() => {
      const nombre = validarNombre(i % 2 === 0 ? "Brandon Garcia" : "");
      const correo = validarCorreo(i % 3 === 0 ? "b@dominio-invalido" : "brandon@gmail.com");
      const mensaje = validarMensaje("Consulta de prueba numero " + i);
      if (nombre === undefined || correo === undefined || mensaje === undefined) {
        throw new Error("validación devolvió undefined");
      }
      return { nombre, correo, mensaje };
    })
  );
  const resultados = await Promise.all(envios);
  const duracion = Date.now() - inicio;
  assert.strictEqual(resultados.length, 200);
  assert.ok(duracion < 1000, `duración total ${duracion} ms >= 1000 ms`);
});
