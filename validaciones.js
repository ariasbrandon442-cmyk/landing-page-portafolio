(function (global) {
  "use strict";

  function validarNombre(valor) {
    var texto = String(valor == null ? "" : valor).trim();
    if (texto.length === 0) {
      return "El nombre es obligatorio.";
    }
    if (texto.length < 3) {
      return "El nombre debe tener al menos 3 caracteres.";
    }
    if (texto.length > 80) {
      return "El nombre no puede superar 80 caracteres.";
    }
    return "";
  }

  function validarCorreo(valor) {
    var texto = String(valor == null ? "" : valor).trim();
    if (texto.length === 0) {
      return "El correo es obligatorio.";
    }
    if (texto.indexOf("@") === -1) {
      return "El correo debe contener @.";
    }
    if (texto.indexOf("@") !== texto.lastIndexOf("@")) {
      return "El correo solo puede tener un @.";
    }
    if (/\s/.test(texto)) {
      return "El correo no puede contener espacios.";
    }
    var partes = texto.split("@");
    var local = partes[0];
    var dominio = partes[1];
    if (local.length === 0 || local.length > 64) {
      return "La parte antes del @ debe tener entre 1 y 64 caracteres.";
    }
    if (dominio.length === 0) {
      return "Después del @ debe venir un dominio (ejemplo: gmail.com).";
    }
    if (dominio.indexOf(".") === -1) {
      return "El dominio debe contener al menos un punto (ejemplo: gmail.com).";
    }
    if (dominio.indexOf("..") !== -1 || local.indexOf("..") !== -1) {
      return "El correo no puede contener puntos consecutivos.";
    }
    if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local)) {
      return "La parte antes del @ contiene caracteres no válidos.";
    }
    if (!/^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*$/.test(dominio)) {
      return "El dominio contiene caracteres no válidos.";
    }
    var etiquetas = dominio.split(".");
    var tld = etiquetas[etiquetas.length - 1];
    if (!/^[A-Za-z]{2,}$/.test(tld)) {
      return "La extensión del dominio debe tener al menos 2 letras (ejemplo: .com).";
    }
    return "";
  }

  function validarMensaje(valor) {
    var texto = String(valor == null ? "" : valor).trim();
    if (texto.length === 0) {
      return "El mensaje es obligatorio.";
    }
    if (texto.length < 10) {
      return "El mensaje debe tener al menos 10 caracteres.";
    }
    if (texto.length > 500) {
      return "El mensaje no puede superar 500 caracteres.";
    }
    return "";
  }

  var validaciones = {
    validarNombre: validarNombre,
    validarCorreo: validarCorreo,
    validarMensaje: validarMensaje
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = validaciones;
  } else {
    global.validaciones = validaciones;
  }
})(typeof window !== "undefined" ? window : globalThis);
