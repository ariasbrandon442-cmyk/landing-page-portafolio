(function () {
  "use strict";

  var formulario = document.getElementById("formulario");
  var campos = {
    nombre: document.getElementById("nombre"),
    correo: document.getElementById("correo"),
    mensaje: document.getElementById("mensaje")
  };
  var errores = {
    nombre: document.getElementById("error-nombre"),
    correo: document.getElementById("error-correo"),
    mensaje: document.getElementById("error-mensaje")
  };
  var exito = document.getElementById("mensaje-exito");

  function marcarError(campo, caja, mensaje) {
    if (mensaje) {
      campo.setAttribute("aria-invalid", "true");
      caja.textContent = mensaje;
      caja.hidden = false;
      return false;
    }
    campo.removeAttribute("aria-invalid");
    caja.textContent = "";
    caja.hidden = true;
    return true;
  }

  function validarCampo(nombreCampo) {
    var campo = campos[nombreCampo];
    var mensaje;
    if (nombreCampo === "nombre") {
      mensaje = window.validaciones.validarNombre(campo.value);
    } else if (nombreCampo === "correo") {
      mensaje = window.validaciones.validarCorreo(campo.value);
    } else {
      mensaje = window.validaciones.validarMensaje(campo.value);
    }
    return marcarError(campo, errores[nombreCampo], mensaje);
  }

  window.inicializarFormulario = function () {
    ["nombre", "correo", "mensaje"].forEach(function (nombreCampo) {
      campos[nombreCampo].addEventListener("blur", function () {
        validarCampo(nombreCampo);
      });
    });

    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
      exito.hidden = true;
      var valido = ["nombre", "correo", "mensaje"].map(validarCampo).every(Boolean);
      if (!valido) {
        var primerError = formulario.querySelector('[aria-invalid="true"]');
        if (primerError) {
          primerError.focus();
        }
        return;
      }
      exito.textContent = "Formulario enviado con éxito. Gracias por contactarme, " +
        campos.nombre.value.trim() + ".";
      exito.hidden = false;
      formulario.reset();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.inicializarFormulario);
  } else {
    window.inicializarFormulario();
  }
})();
