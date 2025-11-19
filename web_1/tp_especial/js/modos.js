
const modo = document.querySelector('#modo');
const body = document.querySelector('body');
const menuBtn = document.querySelector('#menu-hamburguesa');
const menu = document.querySelector('#menu');

const claseModo = () => {
  const modoActual = sessionStorage.getItem('modo');
  if (modoActual === 'claro') {
    body.classList.replace('claro', 'oscuro');
    modo.textContent = 'Pasar a modo claro';
  } else {
    body.classList.replace('oscuro', 'claro');
    modo.textContent = 'Pasar a modo oscuro';
  }
}


claseModo();

modo.addEventListener('click', function () {
  if (sessionStorage.getItem('modo') === 'oscuro') {
    sessionStorage.setItem('modo', 'claro');
  } else {
    sessionStorage.setItem('modo', 'oscuro');
  }
  claseModo();
})

menuBtn.addEventListener('click', function () {
  menu.classList.add('activo');
})

menu.addEventListener('click', function () {
  menu.classList.remove('activo');
})


const navegarProductos = (tipo) => {
  sessionStorage.setItem('tipo', tipo);
  window.location.href = 'listas.html';
}