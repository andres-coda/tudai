"use strict"

const crearForm = (sig) => {
  botoneraAgregar().innerHTML = '';
  const guardar = document.querySelector('#btn-form-guardar');
  const formulario = document.querySelector('form');
  const botonera = document.querySelector('.botonera-form');

  guardar.textContent = sig ? 'Siguiente' : 'Guardar';
  guardar.value = sig ? 'Siguiente' : 'Guardar';

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    guardarRegistro(formulario);
  });

  crearBtnAtras();
  return { formulario, botonera };
}

const datosInput = (input, label, textLabel, nombre, requerido, dato) => {
  input.id = nombre;
  input.name = nombre;
  if (input.type == 'date' && dato) {
    const fecha = new Date(dato);
    input.value = fecha.toISOString().split('T')[0];
  }
  if ((input.type != 'date' && dato) || input.type != 'checkbox') {
    input.value = dato || '';
  }
  input.required = requerido;
  label.htmlFor = nombre;
  label.textContent = textLabel;
}

const crearInput = (textLabel, nombre, requerido, tipo, dato) => {
  const div = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = tipo || 'text';
  datosInput(input, label, textLabel, nombre, requerido, dato);
  div.classList.add('div-input');
  div.appendChild(label);
  div.appendChild(input);
  return div;
}

const crearSelec = (textLabel, nombre, arraySelec, requerido, dato) => {
  const div = document.createElement('div');
  const label = document.createElement('label');
  const select = document.createElement('select');
  datosInput(select, label, textLabel, nombre, requerido);
  arraySelec.forEach(elemento => {
    const opcion = document.createElement('option');
    opcion.id = elemento.id;
    opcion.textContent = elemento.nombre;
    opcion.value = elemento.id;
    if (dato && elemento.id === dato) {
      opcion.selected = true;
    }
    select.appendChild(opcion);
  });
  div.classList.add('div-input');
  div.appendChild(label);
  div.appendChild(select);
  return div;
}

const crearCheckBox = (textLabel, nombre, listaElementos, datos) => {
  const div = document.createElement('div');
  div.classList.add('div-check')
  const ul = document.createElement('ul');
  const labelTitulo = document.createElement('label');
  labelTitulo.textContent = textLabel;
  labelTitulo.htmlFor = nombre;
  ul.classList.add('ul-checkbox');
  listaElementos.forEach(elemento => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    const label = document.createElement('label');
    input.classList.add('input-check')
    li.classList.add('li-input-check');
    input.type = 'checkbox';
    datosInput(input, label, elemento.nombre, nombre, false);
    input.value = elemento.id;
    if (Array.isArray(datos) && datos.includes(elemento.id)) {
      input.checked = true;
    }
    li.appendChild(label);
    li.appendChild(input);
    ul.appendChild(li);
  });
  div.appendChild(labelTitulo);
  div.appendChild(ul);
  return div;
}


async function guardarRegistro() {
  const ruta = window.location.hash.slice(1) || '/';
  try {
    const rutaVerif = await verificarRutasDinamicas(ruta);

    switch (rutaVerif.newPath) {
      case URLRUTAS.LOGIN: loginFetch();
        break;
      case URLRUTAS.RUBROS_FORM: await rubroFetch(rutaVerif.idSelect);
        break;
      case URLRUTAS.PROVEEDORES_FORM: await proveedorFetch(rutaVerif.idSelect);
        break;
      case URLRUTAS.PRODUCTOS_FORM: await productoFetch(rutaVerif.idSelect);
        break;
      case URLRUTAS.LISTAS_FORM: pasarPedido(rutaVerif.idSelect);
        break;
      case URLRUTAS.LISTA_PEDIDO: listaFetch(rutaVerif.idSelect);
        break;
      default: console.log('no hay tipo')
        break;
    }
  } catch (er) {
    cargarError(er);
  }
}


