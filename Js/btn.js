const toggleBtn = document.getElementById('toggle-filters');
const sidebar = document.querySelector('.filters-sidebar');
const overlay = document.querySelector('.overlay');
const body = document.body;
const container = document.querySelector('.container');


function disableScroll() {
  // Guardar posición actual
  const scrollY = window.scrollY || window.pageYOffset;
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}px`;
  body.style.left = '0';
  body.style.right = '0';
  body.style.overflow = 'hidden';
  body.dataset.scrollY = scrollY; // guardamos scroll para restaurar luego
}

function enableScroll() {
  body.style.position = '';
  body.style.top = '';
  body.style.left = '';
  body.style.right = '';
  body.style.overflow = '';
  // Restaurar scroll original
  window.scrollTo(0, parseInt(body.dataset.scrollY || '0'));
  delete body.dataset.scrollY;
}

toggleBtn.addEventListener('click', () => {
  const isActive = sidebar.classList.toggle('active');
  overlay.classList.toggle('active', isActive);
container.classList.toggle('sidebar-active', isActive); // <-- aquí agregas o quitas la clase


  if (isActive) {
    disableScroll();
  } else {
    enableScroll();
  }
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
container.classList.remove('sidebar-active'); // <--- remueves la clase aquí también

  enableScroll();
});
