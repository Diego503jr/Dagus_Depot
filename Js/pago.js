const form = document.querySelector(".checkout-form");
const btnConfirmar = document.getElementById("confirmarPedido");
const radios = document.querySelectorAll('input[name="pago"]');

function validarform() {
  const nombre = form.querySelector('input[name="nombre"]');
  const correo = form.querySelector('input[name="correo"]');
  const telefono = form.querySelector('input[name="telefono"]');
  const direccion = form.querySelector('textarea[name="direccion"]');
  const metodoPago = form.querySelector('input[name="pago"]:checked').value;

  let valido =
    nombre.value && correo.value && telefono.value && direccion.value;

  // Si el método de pago es tarjeta, también valida los campos de tarjeta
  if (metodoPago === "tarjeta") {
    const numero = form.querySelector('input[placeholder="Número de tarjeta"]');
    const titular = form.querySelector('input[placeholder="Titular"]');
    const exp = form.querySelector('input[placeholder="MM/AA"]');
    const cvv = form.querySelector('input[placeholder="CVV"]');
    valido = valido && numero.value && titular.value && exp.value && cvv.value;
  }

  btnConfirmar.disabled = !valido;
}

//FUNCION PARA METODO DE PAGO (PAGO.HTMLl)
radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    document.getElementById("form-tarjeta").style.display = "none";
    document.getElementById("form-transferencia").style.display = "none";
    document.getElementById("form-entrega").style.display = "none";

    if (radio.value === "tarjeta") {
      document.getElementById("form-tarjeta").style.display = "block";
    } else if (radio.value === "transferencia") {
      document.getElementById("form-transferencia").style.display = "block";
    } else if (radio.value === "entrega") {
      document.getElementById("form-entrega").style.display = "block";
    }
  });
});

// ESCUCHAR CAMBIOS EN TODOS LOS CAMPOS DE ENTRADA
form.querySelectorAll("input, textarea").forEach((campo) => {
  campo.addEventListener("input", validarform);
});

// ESCUCHAR CAMBIOS EN EL METODO DE PAGO
radios.forEach((radio) => {
  radio.addEventListener("change", validarform);
});

//ALERTA PARA BTN CONFIRMAR PEDIDO (PAGO.HTML)
btnConfirmar.addEventListener("click", function (e) {
  e.preventDefault();

  if (btnConfirmar.disabled) return;

  Swal.fire({
    title: "¡Pedido confirmado!",
    text: "Gracias por tu compra. Serás redirigido al inicio.",
    icon: "success",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#27ae60",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "index.html";
    }
  });
});
