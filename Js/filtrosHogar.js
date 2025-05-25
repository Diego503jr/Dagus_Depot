document.addEventListener("DOMContentLoaded", function () {
  // Obtener todos los elementos necesarios del DOM
  const tarjetasProducto = document.querySelectorAll(".product-card");
  const contenedorProductos = document.getElementById("products-container");
  const rangoPrecio = document.getElementById("precioMax");
  const displayPrecio = document.getElementById("price-display");
  const checkboxesCategoria = document.querySelectorAll(
    'input[name="categoria"]'
  );
  const checkboxesMarca = document.querySelectorAll('input[name="marca"]');
  const checkboxesTamano = document.querySelectorAll('input[name="tamano"]');
  const checkboxesColor = document.querySelectorAll('input[name="color"]');

  // Actualizar el display del precio cuando se mueve el slider
  rangoPrecio.addEventListener("input", function () {
    const precio = this.value;
    displayPrecio.textContent = `$${precio}`;
    filtrarProductos();
  });

  // Agregar event listeners a todos los checkboxes
  [
    ...checkboxesCategoria,
    ...checkboxesMarca,
    ...checkboxesTamano,
    ...checkboxesColor,
  ].forEach((checkbox) => {
    checkbox.addEventListener("change", filtrarProductos);
  });

  function filtrarProductos() {
    // Obtener todas las selecciones de filtros
    const categoriasSeleccionadas = Array.from(checkboxesCategoria)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    const marcasSeleccionadas = Array.from(checkboxesMarca)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    const tamanosSeleccionados = Array.from(checkboxesTamano)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    const coloresSeleccionados = Array.from(checkboxesColor)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    const precioMaximo = parseFloat(rangoPrecio.value);

    // Filtrar cada producto según los criterios seleccionados
    tarjetasProducto.forEach((tarjeta) => {
      const precioProducto = parseFloat(tarjeta.dataset.precio) || 0;
      const categoriaProducto = tarjeta.dataset.categoria;
      const marcaProducto = tarjeta.dataset.marca;
      const tamanoProducto = tarjeta.dataset.tamano;
      const colorProducto = tarjeta.dataset.color;

      const coincideCategoria =
        categoriasSeleccionadas.length === 0 ||
        categoriasSeleccionadas.includes(categoriaProducto);
      const coincideMarca =
        marcasSeleccionadas.length === 0 ||
        marcasSeleccionadas.includes(marcaProducto);
      const coincideTamano =
        tamanosSeleccionados.length === 0 ||
        tamanosSeleccionados.includes(tamanoProducto);
      const coincideColor =
        coloresSeleccionados.length === 0 ||
        coloresSeleccionados.includes(colorProducto);
      const coincidePrecio = precioProducto <= precioMaximo;

      // Mostrar u ocultar el producto según los filtros
      if (
        coincideCategoria &&
        coincideMarca &&
        coincideTamano &&
        coincideColor &&
        coincidePrecio
      ) {
        tarjeta.style.display = "block";
      } else {
        tarjeta.style.display = "none";
      }
    });

    actualizarContadorProductos();
  }

  function actualizarContadorProductos() {
    const productosVisibles = document.querySelectorAll(
      '.product-card[style="display: block"]'
    ).length;
    const totalProductos = tarjetasProducto.length;
    document.getElementById(
      "productos-mostrando"
    ).textContent = `Mostrando ${productosVisibles} de ${totalProductos} productos`;
  }

  const headers = document.querySelectorAll(".collapsible");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;

      header.classList.toggle("active");

      if (content.style.height && content.style.height !== "0px") {
        // Collapse
        content.style.height = content.scrollHeight + "px";
        requestAnimationFrame(() => {
          content.style.height = "0";
        });
      } else {
        // Expand
        content.style.height = content.scrollHeight + "px";
        content.addEventListener("transitionend", function handler() {
          content.style.height = "auto";
          content.removeEventListener("transitionend", handler);
        });
      }
    });
  });

  // Inicializar
  actualizarContadorProductos();
});
