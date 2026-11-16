"use strict";

const test = require("node:test");
const assert = require("node:assert");
const { validarNombre, validarCorreo, validarMensaje } = require("../validaciones.js");

test("U01: nombre vacío es obligatorio", () => {
  assert.strictEqual(validarNombre(""), "El nombre es obligatorio.");
  assert.strictEqual(validarNombre("   "), "El nombre es obligatorio.");
});

test("U02: nombre con menos de 3 caracteres se rechaza", () => {
  assert.match(validarNombre("ab"), /al menos 3 caracteres/);
});

test("U03: nombre válido no produce error", () => {
  assert.strictEqual(validarNombre("Brandon Garcia"), "");
});

test("U04: correo sin arroba se rechaza", () => {
  assert.match(validarCorreo("brandon.gmail.com"), /debe contener @/);
});

test("U05: correo sin dominio se rechaza", () => {
  assert.match(validarCorreo("brandon@"), /debe venir un dominio/);
});

test("U06: dominio sin punto se rechaza", () => {
  assert.match(validarCorreo("brandon@gmail"), /al menos un punto/);
});

test("U07: extensión del dominio con 1 letra se rechaza", () => {
  assert.match(validarCorreo("brandon@correo.c"), /al menos 2 letras/);
});

test("U08: correo con dos arrobas se rechaza", () => {
  assert.match(validarCorreo("b@@gmail.com"), /solo puede tener un @/);
});

test("U09: correo con espacios internos se rechaza", () => {
  assert.match(validarCorreo("bran don@gmail.com"), /no puede contener espacios/);
});

test("U10: correo válido no produce error", () => {
  assert.strictEqual(validarCorreo("brandon@gmail.com"), "");
  assert.strictEqual(validarCorreo("brandon.garcia@uniminuto.edu.co"), "");
});

test("U10b: correo sin arroba con dominio tipo texto plano se rechaza", () => {
  assert.match(validarCorreo("brandongmail.com"), /debe contener @/);
});

test("U11: mensaje con menos de 10 caracteres se rechaza", () => {
  assert.match(validarMensaje("hola"), /al menos 10 caracteres/);
});

test("U12: mensaje válido no produce error", () => {
  assert.strictEqual(validarMensaje("Hola, quiero información sobre tus servicios."), "");
});

test("U12b: mensaje de más de 500 caracteres se rechaza", () => {
  assert.match(validarMensaje("a".repeat(501)), /no puede superar 500 caracteres/);
});
