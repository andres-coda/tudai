
const modo = ()=> {
 return document.querySelector('#modo');
}
const body = ()=> {
  return document.querySelector('body');
}
const menuBtn = ()=>{
  return document.querySelector('#menu-hamburguesa');
}
const menu = () => {
  return document.querySelector('#menu');
}


const claseModo = () => {
  const modoActual = sessionStorage.getItem('modo');
  if (modoActual === 'claro') {
    body().classList.replace('claro', 'oscuro');
    modo().textContent = 'Pasar a modo claro';
  } else {
    body().classList.replace('oscuro', 'claro');
    modo().textContent = 'Pasar a modo oscuro';
  }
};


claseModo();

modo().addEventListener('click', function () {
  if (sessionStorage.getItem('modo') === 'oscuro') {
    sessionStorage.setItem('modo', 'claro');
  } else {
    sessionStorage.setItem('modo', 'oscuro');
  }
  claseModo();
});

menuBtn().addEventListener('click', function (e) {
  e.stopPropagation()
  menu().classList.toggle('activo');
});

menu().addEventListener('click', function () {
  menu().classList.remove('activo');
});

body().addEventListener('click', function () {
  menu().classList.remove('activo');
});
