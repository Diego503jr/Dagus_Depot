document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero");
  const heroText = document.querySelector(".hero-text");
  const heroImage = document.querySelector(".hero-image");
  const statsItems = document.querySelectorAll(".stats div");

  // Función para remover todas las animaciones
  function resetAnimations() {
    heroText.style.opacity = "0";
    heroText.style.transform = "translateX(-100px)";
    heroImage.style.opacity = "0";
    heroImage.style.transform = "translateX(100px)";
    statsItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
    });
  }

  // para activar las animaciones
  function triggerAnimations() {
    resetAnimations();

    void heroSection.offsetWidth;

    // Aplicar transiciones
    heroText.style.transition = "all 1s ease-out";
    heroImage.style.transition = "all 1s ease-out";
    statsItems.forEach((item) => {
      item.style.transition = "all 0.5s ease-out";
    });

    // Activar animaciones
    heroText.style.opacity = "1";
    heroText.style.transform = "translateX(0)";
    heroImage.style.opacity = "1";
    heroImage.style.transform = "translateX(0)";

    // Animación escalonada para stats
    statsItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, 200 * (index + 1));
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          triggerAnimations();
        } else {
          // Cuando el elemento sale de la vista(haciendo escroll), prepara para la próxima animación
          resetAnimations();
          heroText.style.transition = "none";
          heroImage.style.transition = "none";
          statsItems.forEach((item) => {
            item.style.transition = "none";
          });
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(heroSection);

  // Disparar animaciones al cargar la página si está visible
  const checkVisibility = () => {
    const rect = heroSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      triggerAnimations();
    }
  };

  window.addEventListener("load", checkVisibility);
  setTimeout(checkVisibility, 100); // Segunda verificación
});

//ANIMACION CATEGORIAS
document.addEventListener("DOMContentLoaded", function () {
  const categoriesSection = document.querySelector(".categories");
  if (!categoriesSection) return;

  const categoryItems = document.querySelectorAll(".category-item");
  const animationDistance = "90px"; // Distancia inicial desde abajo
  const animationDuration = 500; // Duración en mili segnds
  const staggerDelay = 170; // Retardo entre elementos en ms

  // Resetear animaciones
  function resetAnimations() {
    categoryItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = `translateY(${animationDistance})`;
      item.style.transition = "none";
    });
  }

  // Activar animaciones
  function animateCategories() {
    resetAnimations();

    // Forzar reflow
    void categoriesSection.offsetWidth;

    // Aplicar transiciones
    categoryItems.forEach((item) => {
      item.style.transition = `
          opacity ${animationDuration}ms cubic-bezier(0.2, 0.8, 0.4, 1),
          transform ${animationDuration}ms cubic-bezier(0.2, 0.8, 0.4, 1)
        `;
    });

    // Animación escalonada
    categoryItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, index * staggerDelay);
    });
  }

  // Configurar Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting ? animateCategories() : resetAnimations();
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(categoriesSection);

  // Verificación inicial
  if (isElementInViewport(categoriesSection)) {
    animateCategories();
  }

  // Helper para detectar visibilidad inicial
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.1 && rect.bottom >= 0;
  }
});

//modo activo de la navegacion NAV
document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop(); // nombre del archivo actual (ej. productos.html)
  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop(); // obtener nombre de archivo del href

    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
});

//FILTROS precio, categorias,marcas,tamaños//
document.addEventListener("DOMContentLoaded", () => {
  const precioMaxInput = document.getElementById("precioMax");
  const priceDisplay = document.getElementById("price-display");
  const productos = Array.from(document.querySelectorAll(".product-card"));
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let ultimoCheckboxCambiado = null;

  const paginationContainer = document.getElementById("pagination");
  const infoResultados = document.getElementById("info-resultados");

  const productsPerPage = 9;
  let currentPage = 1;
  let productosFiltrados = [];

  function formatearPrecio(numero) {
    return `$${Number(numero).toLocaleString("es-MX")}`;
  }

  function getCheckedValues(name) {
    return Array.from(
      document.querySelectorAll(`input[name="${name}"]:checked`)
    ).map((cb) => cb.value);
  }

  function filtrarProductos() {
    const precioMax = parseInt(precioMaxInput.value);
    const categorias = getCheckedValues("categoria");
    const marcas = getCheckedValues("marca");
    const tamanos = getCheckedValues("tamano");
    const colores = getCheckedValues("color"); // Obtener colores seleccionados
    const definiciones = getCheckedValues("definicion");
    const pulgadas = getCheckedValues("pulgada");
    const capacidades = getCheckedValues("capacidad");

    priceDisplay.textContent = formatearPrecio(precioMax);
    productosFiltrados = [];

    productos.forEach((producto) => {
      const precio = parseInt(
        producto.getAttribute("data-precio").replace(/,/g, "")
      );
      const categoria = producto.getAttribute("data-categoria");
      const marca = producto.getAttribute("data-marca");
      const tamano = producto.getAttribute("data-tamano");
      const color = producto.getAttribute("data-color"); // Obtener el color del producto
      const definicion = producto.getAttribute("data-definicion");
      const pulgada = producto.getAttribute("data-pulgada");
      const capacidad = producto.getAttribute("data-capacidad");

      const cumple =
        precio <= precioMax &&
        (categorias.length === 0 || categorias.includes(categoria)) &&
        (marcas.length === 0 || marcas.includes(marca)) &&
        (colores.length === 0 || colores.includes(color)) && // Verificar color seleccionado
        (definiciones.length === 0 || definiciones.includes(definicion)) &&
        (pulgadas.length === 0 || pulgadas.includes(pulgada)) &&
        (tamanos.length === 0 || tamanos.includes(tamano)) &&
        (capacidades.length === 0 || capacidades.includes(capacidad));

      if (cumple) productosFiltrados.push(producto);
    });

    currentPage = 1;
    showPage(currentPage);
  }

  function showPage(page) {
    currentPage = page;
    const start = (page - 1) * productsPerPage;
    const end = page * productsPerPage;

    productos.forEach((p) => (p.style.display = "none"));
    productosFiltrados
      .slice(start, end)
      .forEach((p) => (p.style.display = "block"));

    updatePagination();
    actualizarContadorProductos(currentPage, productsPerPage);
  }

  function updatePagination() {
    const totalPages = Math.ceil(productosFiltrados.length / productsPerPage);
    paginationContainer.innerHTML = "";

    const isMobile = window.innerWidth <= 768;

    const prevButton = document.createElement("a");
    prevButton.href = "#";
    prevButton.textContent = "Anterior";
    prevButton.id = "prev";
    prevButton.style.display = currentPage > 1 ? "inline-block" : "none";
    prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage > 1) showPage(currentPage - 1);
    });
    paginationContainer.appendChild(prevButton);

    let startPage = 1;
    let endPage = totalPages;

    if (isMobile) {
      if (totalPages <= 3) {
        startPage = 1;
        endPage = totalPages;
      } else {
        if (currentPage <= 3) {
          startPage = 1;
          endPage = 5;
        } else if (currentPage >= totalPages - 2) {
          startPage = totalPages - 4;
          endPage = totalPages;
        } else {
          startPage = currentPage - 2;
          endPage = currentPage + 2;
        }
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement("a");
      pageButton.href = "#";
      pageButton.textContent = i;
      pageButton.classList.add("page");
      if (i === currentPage) pageButton.classList.add("active");
      pageButton.addEventListener("click", (e) => {
        e.preventDefault();
        showPage(i);
      });
      paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement("a");
    nextButton.href = "#";
    nextButton.textContent = "Siguiente";
    nextButton.id = "next";
    nextButton.style.display =
      currentPage < totalPages ? "inline-block" : "none";
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage < totalPages) showPage(currentPage + 1);
    });
    paginationContainer.appendChild(nextButton);
  }

  function actualizarContadorProductos(paginaActual, productosPorPagina) {
    const total = productosFiltrados.length;
    const inicio =
      total === 0 ? 0 : (paginaActual - 1) * productosPorPagina + 1;
    let fin = paginaActual * productosPorPagina;
    if (fin > total) fin = total;

    if (total === 0) {
      Swal.fire({
        //ALERTA DE SWEET ALRT
        title: "Sin resultados",
        text: "No encontramos productos que coincidan con los filtros seleccionados.",
        icon: "warning",
        confirmButtonText: "Ok",
        customClass: {
          popup: "swal-no-productos",
        },
      }).then((result) => {
        if (result.isConfirmed && ultimoCheckboxCambiado) {
          ultimoCheckboxCambiado.checked = false; // Desmarca solo el último
          filtrarProductos(); // Volver a aplicar los filtros
        }
      });
      infoResultados.innerHTML = "";

      return;
    }

    infoResultados.innerHTML = `Mostrando ${inicio}-${fin} de ${total} Productos | Ordenar por: 
      <select class="sort-options">
        <option>Más populares</option>
        <option>Precio (menor a mayor)</option>
        <option>Precio (mayor a menor)</option>
        <option>Novedades</option>
      </select>`;
  }

  // Eventos
  precioMaxInput.addEventListener("input", filtrarProductos);
  checkboxes.forEach((cb) => {
    cb.addEventListener("change", function () {
      ultimoCheckboxCambiado = this; // Guarda el último checkbox cambiado
      filtrarProductos();
    });
  });

  // Cargar al inicio
  filtrarProductos();
});

const totalPages = 12; // Cambia según cuántas páginas tengas
let currentPage = 1;

const pageContainer = document.getElementById("page-numbers");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

function renderPagination() {
  pageContainer.innerHTML = "";

  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + 4);

  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }

  for (let i = start; i <= end; i++) {
    const page = document.createElement("a");
    page.href = "#";
    page.textContent = i;
    page.classList.toggle("active", i === currentPage);
    page.addEventListener("click", () => {
      currentPage = i;
      renderPagination();
      // Llama aquí tu función para cargar productos según página
    });
    pageContainer.appendChild(page);
  }

  prevBtn.style.visibility = currentPage === 1 ? "hidden" : "visible";
  nextBtn.style.visibility = currentPage === totalPages ? "hidden" : "visible";
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPagination();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPagination();
  }
});

renderPagination();
