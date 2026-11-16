"use strict";

const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const raiz = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");

function crearPagina() {
  const dom = new JSDOM(html, { runScripts: "outside-only", url: "http://localhost/" });
  const { window } = dom;
  window.validaciones = require(path.join(raiz, "validaciones.js"));
  window.eval(fs.readFileSync(path.join(raiz, "app.js"), "utf8"));
  window.document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true }));
  return window;
}

test("I01: el formulario y las cajas de error existen en la página", () => {
  const { window } = crearPagina();
  const { document } = window;
  assert.ok(document.getElementById("formulario"));
  assert.ok(document.getElementById("error-nombre"));
  assert.ok(document.getElementById("error-correo"));
  assert.ok(document.getElementById("error-mensaje"));
  assert.ok(document.getElementById("mensaje-exito"));
});

test("I02: correo inválido al salir del campo muestra error y aria-invalid", () => {
  const { window } = crearPagina();
  const { document } = window;
  const correo = document.getElementById("correo");
  correo.value = "brandon.gmail.com";
  correo.dispatchEvent(new window.Event("blur"));
  const caja = document.getElementById("error-correo");
  assert.strictEqual(caja.hidden, false);
  assert.match(caja.textContent, /debe contener @/);
  assert.strictEqual(correo.getAttribute("aria-invalid"), "true");
});

test("I03: al corregir el campo el error desaparece", () => {
  const { window } = crearPagina();
  const { document } = window;
  const correo = document.getElementById("correo");
  correo.value = "brandon.gmail.com";
  correo.dispatchEvent(new window.Event("blur"));
  correo.value = "brandon@gmail.com";
  correo.dispatchEvent(new window.Event("blur"));
  const caja = document.getElementById("error-correo");
  assert.strictEqual(caja.hidden, true);
  assert.strictEqual(correo.hasAttribute("aria-invalid"), false);
});

test("F01: envío con todo vacío muestra los 3 errores y sin mensaje de éxito", () => {
  const { window } = crearPagina();
  const { document } = window;
  const formulario = document.getElementById("formulario");
  formulario.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
  assert.strictEqual(document.getElementById("error-nombre").hidden, false);
  assert.strictEqual(document.getElementById("error-correo").hidden, false);
  assert.strictEqual(document.getElementById("error-mensaje").hidden, false);
  assert.strictEqual(document.getElementById("mensaje-exito").hidden, true);
});

test("F02: envío con correo inválido deja el foco en el campo inválido", () => {
  const { window } = crearPagina();
  const { document } = window;
  document.getElementById("nombre").value = "Brandon Garcia";
  document.getElementById("correo").value = "brandon@";
  document.getElementById("mensaje").value = "Quiero información de sus servicios.";
  const correo = document.getElementById("correo");
  let foco = null;
  correo.focus = function () { foco = this; };
  document.getElementById("formulario")
    .dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
  assert.strictEqual(document.getElementById("error-correo").hidden, false);
  assert.strictEqual(foco, correo);
});

test("F03: envío con datos válidos muestra éxito y limpia el formulario", () => {
  const { window } = crearPagina();
  const { document } = window;
  document.getElementById("nombre").value = "Brandon Garcia";
  document.getElementById("correo").value = "brandon@gmail.com";
  document.getElementById("mensaje").value = "Quiero información de sus servicios.";
  document.getElementById("formulario")
    .dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
  const exito = document.getElementById("mensaje-exito");
  assert.strictEqual(exito.hidden, false);
  assert.match(exito.textContent, /Formulario enviado con éxito/);
  assert.match(exito.textContent, /Brandon Garcia/);
  assert.strictEqual(document.getElementById("nombre").value, "");
  assert.strictEqual(document.getElementById("correo").value, "");
});
