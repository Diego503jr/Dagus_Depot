const form = document.querySelector(".profile-form");
const inputs = form.querySelectorAll("input");
const btnGUardar = document.getElementById("actualizarPerfil");

function validarCampos() {
  let llenos = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      llenos = false;
    }
  });

  btnGUardar.disabled = !llenos;
}

//ESCUCHAR CAMBIOS DE LOS INPUTS
inputs.forEach((input) => {
  input.addEventListener("input", validarCampos);
});

//ALERTA PARA BTN CONFIRMAR ACTUALIZACION DE PERFIL (PERFIL.HTML)
btnGUardar.addEventListener("click", function (e) {
  e.preventDefault();

  const correo = form.querySelector('input[type="email"]');
  const clave = form.querySelector('input[type="password"]');

  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegex.test(correo.value)) {
    Swal.fire({
      title: "Correo inválido",
      text: "Por favor, introduce un correo electrónico válido.",
      icon: "error",
      confirmButtonText: "Corregir",
      confirmButtonColor: "#c0392b",
    });
    return;
  }

  if (clave.value.length < 8) {
    Swal.fire({
      title: "Contraseña débil",
      text: "La contraseña debe tener al menos 6 caracteres.",
      icon: "error",
      confirmButtonText: "Corregir",
      confirmButtonColor: "#c0392b",
    });
    return;
  }

  Swal.fire({
    title: "¡Datos Actualizados!",
    text: "Tus datos han sido actualizados correctamente.",
    icon: "success",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#27ae60",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../index.html";
    }
  });
});
