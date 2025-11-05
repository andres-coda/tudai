
const agregar = document.querySelector('#nuevaLista');
const titulo = document.querySelector('#titulo');
const provederesNav = document.querySelector('#proveedores');
const productosNav = document.querySelector('#productos');
const listasNav = document.querySelector('#listas');

const cerrar = document.querySelector('#btn-cerrar');
cerrar.addEventListener('click', () => modal.classList.remove('visble'))
const modal = document.querySelector('.modal');
const modalInterno = document.querySelector('#modal-contenido');

const crearTituloTabla = (titulos) => {
  const thead = document.querySelector('#tabla thead');
  thead.innerHTML = '';
  const filaTitulo = document.createElement('tr');
  titulos.forEach(titulo => {
    const th = document.createElement('th');
    th.textContent = titulo;
    filaTitulo.appendChild(th);
  });
  thead.appendChild(filaTitulo);
}

const listaSeleccion = (idElemento) => {
  lista.map(p => {
    if (p.id === idElemento) {
      return
    }
  })
}

const crearBtnAgregar = () => {
  botoneraAgregar.innerHTML = '';
  const btn = document.createElement('button');
  btn.id = 'nuevaLista';
  btn.classList.add('agregar');
  btn.textContent = '+';
  botoneraAgregar.appendChild(btn);
  return btn;
}

const crearBtnDesplegable = (id, eliminarDato, url) => {
  const divBotoneraFlecha = document.createElement('div');
  divBotoneraFlecha.classList.add('botonera-flecha-contenedor');

  const divBotonera = document.createElement('div');
  divBotonera.classList.add('botonera-flecha');
  divBotonera.classList.add('oculto');

  const btnDesplegar = document.createElement('button');
  btnDesplegar.classList.add('btn-icono');
  btnDesplegar.innerHTML = '&#8249;';
  btnDesplegar.addEventListener('click', (e) => {
    e.stopPropagation();
    btnDesplegar.classList.toggle('flecha-abierta');
    divBotonera.classList.toggle('oculto');
  });

  const btnEditar = document.createElement('button');
  btnEditar.classList.add('btn-icono');
  btnEditar.addEventListener('click', (e) => {
    e.stopPropagation();
    window.location.hash = `${url}/${id}`;
  });
  btnEditar.innerHTML = '&#9998;';

  const btnEliminar = document.createElement('button');
  btnEliminar.classList.add('btn-icono');
  btnEliminar.addEventListener('click', (e) => {
    e.stopPropagation();
    eliminarDato(id);
  });
  btnEliminar.innerHTML = '&#128465;';

  divBotonera.appendChild(btnEditar);
  divBotonera.appendChild(btnEliminar);

  divBotoneraFlecha.appendChild(btnDesplegar);
  divBotoneraFlecha.appendChild(divBotonera);
  return divBotoneraFlecha;
}


