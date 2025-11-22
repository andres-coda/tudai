
const titulo = ()=>{
  return document.querySelector('#titulo');
};

const crearTituloTabla = (titulos) => {
  const thead = document.querySelector('#tabla thead');
  thead.innerHTML = '';
  const filaTitulo = document.createElement('tr');
  titulos.forEach(tit => {
    const th = document.createElement('th');
    th.textContent = tit;
    filaTitulo.appendChild(th);
  });
  thead.appendChild(filaTitulo);
}

const crearBtnAgregar = () => {
  botoneraAgregar().innerHTML = '';
  const btn = document.createElement('button');
  btn.id = 'nuevaLista';
  btn.classList.add('btn-agregar');
  btn.textContent = '+';
  botoneraAgregar().appendChild(btn);
  return btn;
}

const crearBtnAtras = () => {
  const botoneraAtras = document.querySelector('#botonera-atras')
  botoneraAtras.innerHTML = '';
  const btn = document.createElement('button');
  btn.id = 'atras';
  btn.classList.add('btn-atras');
  btn.innerHTML = '&#8610;';
  botoneraAtras.appendChild(btn);
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    window.history.back();
  });
}

const eliminarBotonAtras = () => {
  const botoneraAtras = document.querySelector('#botonera-atras')
  botoneraAtras.innerHTML = '';
}

const crearBtnDesplegable = (id, eliminarDato, url) => {
  const divBotoneraFlecha = document.createElement('div');
  divBotoneraFlecha.classList.add('botonera-flecha-contenedor');

  const divBotonera = document.createElement('div');
  divBotonera.classList.add('botonera-flecha');
  divBotonera.classList.add('oculto');

  const btnDesplegar = document.createElement('button');
  btnDesplegar.classList.add('btn-icono');
  btnDesplegar.innerHTML = '&#8250;';
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

const efectoModal = (newTitulo, newTexto) => {
  const modal = document.querySelector('.modal');
  const cerrar = document.querySelector('#btn-cerrar');
  cerrar.addEventListener('click', () => modal.classList.remove('visble'))
  const modalInterno = document.querySelector('#modal-contenido');

  modal.classList.add('visble')
  modalInterno.innerHTML = '';
  if (newTitulo) {
    const tit = document.createElement('h2');
    tit.textContent = newTitulo;
    modalInterno.appendChild(tit);
  }
  const texto = document.createElement('p');
  texto.textContent = newTexto;
  texto.classList.add('error');
  modalInterno.appendChild(texto);
}

const cargarError = (error) => {
  console.log(error)
  const tit = 'Error al intentar realizar la accion';
  efectoModal(tit, error);
}

const listaVacia = (entidad) => {
  const p = document.createElement('p');
  p.textContent = `La lista de ${entidad} esta vacia`;
  return p;
}

const crearBotonera = (funcionAdelante, funcionAtras, btnAdelanteText, btnAtrasText) => {
  console.log(' funcionAtras ', funcionAtras)
  const guardar = document.createElement('button')
  guardar.classList.add('btn-guardar');

  const atras = document.createElement('button');
  atras.classList.add('btn-atras');

  const botonera = document.createElement('div')
  botonera.classList.add('botonera');


  guardar.textContent = btnAdelanteText ? btnAdelanteText : 'Guardar';
  atras.textContent = btnAtrasText ? btnAtrasText : 'Atras';

  atras.addEventListener('click', (e) => {
    e.preventDefault();
    funcionAtras();
  });

  guardar.addEventListener('click', (e) => {
    e.preventDefault();
    funcionAdelante();
  });

  botonera.appendChild(atras);
  botonera.appendChild(guardar);
  return botonera;
}

const formatearFechaLocal = (fechaISO) => {
  if(!fechaISO) return '';
  const [anio, mes, dia] = fechaISO.split('T')[0].split('-');
  return `${dia}/${mes}/${anio}`;
}

function formatearFechaForm(iso) {
  const d = new Date(iso);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


/**
 * Lee de localStorage de forma segura
 * @param {string} key - Clave a leer
 * @returns {any|null} Valor parseado o null
 */
function getLocalStorageSeguro(key) {
  try {
    const value = localStorage.getItem(key);
    
    // Validar que no sea string "null" o "undefined"
    if (!value || value === 'null' || value === 'undefined') {
      return null;
    }
    
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error leyendo ${key}:`, error);
    localStorage.removeItem(key); // Limpiar dato corrupto
    return null;
  }
}

/**
 * Guarda en localStorage de forma segura
 * @param {string} key - Clave
 * @param {any} value - Valor a guardar
 */
function setLocalStorageSeguro(key, value) {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error guardando ${key}:`, error);
  }
}