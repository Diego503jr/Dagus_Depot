document.addEventListener("DOMContentLoaded", function() {
    // Función para cargar contenido desde un archivo HTML
    function loadHTML(elementId, filePath) {
      fetch(filePath)
        .then(response => response.text())
        .then(data => {
          document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el archivo HTML:', error));
    }
  
    // Cargar el header y footer desde la carpeta "duplicados"
    loadHTML("header", "../duplicados/header.html");
    loadHTML("footer", "../duplicados/footer.html");
  });

  document.addEventListener('DOMContentLoaded', () => {
    fetch('../duplicados/header.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
  
        // Aseguramos que los links se procesen después de insertar el HTML
        const currentPath = window.location.pathname.split('/').pop(); // Ej: productos.html
  
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
          const linkPath = link.getAttribute('href').split('/').pop(); // solo el nombre del archivo
          if (linkPath === currentPath) {
            link.classList.add('active');
          }
        });
      });
  });
  
  