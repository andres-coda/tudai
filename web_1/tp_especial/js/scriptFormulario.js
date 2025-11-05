"use strict"
const crearFormulario = () => {
  const formulario = document.querySelector('form');
  const tipo = sessionStorage.getItem('tipo') || '';
  return {
    formulario, botonera, guardar, atras, cerrar, modal,
    modalInterno, tipo,
  }
}

const crearForm = () => {
  const guardar = document.querySelector('.btn-guardar');
  const formulario = document.querySelector('form');
  const atras = document.querySelector('.btn-atras');
  const botonera = document.querySelector('.botonera');

  guardar.value = 'Guardar';

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    guardarRegistro(formulario);
  });
  atras.addEventListener('click', function (e) {
    e.preventDefault();
    window.history.back();
  });
  return { formulario, botonera };
}

const datosInput = (input, label, textLabel, nombre, requerido, dato) => {
  input.id = nombre;
  input.name = nombre;
  if(input.type == 'date' && dato){
    const fecha = new Date(dato);
    input.value = fecha.toISOString().split('T')[0];
  } else {
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

const nuevoProeveedor = (id) => {
  let prov = null;
  if (id) {
    prov = proveedores.find(p => p.id == id);
  }
  const form = crearForm();
  titulo.textContent = 'Nuevo proveedor';
  form.formulario.insertBefore(crearInput('Nombre del proveedor: ', 'nombre', true, null, prov?.nombre), form.botonera);
  form.formulario.insertBefore(crearInput('Email del proveedor: ', 'email', true, 'email', prov?.email), form.botonera);
  form.formulario.insertBefore(crearInput('Telefono: ', 'telefono', true, null, prov?.telefono), form.botonera);
  form.formulario.insertBefore(crearCheckBox('Productos: ', 'productos', productos, prov?.productos), form.botonera);
}

const nuevoRubro = (id) => {
  let rubro = null;
  if (id) {
    rubro = rubros.find(r => r.id == id);
  }
  const form = crearForm();
  titulo.textContent = 'Nuevo rubro';
  form.formulario.insertBefore(crearInput('Nombre del rubro: ', 'nombre', true, null, rubro?.nombre), form.botonera);
  form.formulario.insertBefore(crearCaptchap(crearInput), form.botonera);
}

const nuevaLista = (id) => {
  let pedido = null;
  if (id) {
    pedido = lista.find(l => l.id == id);
  }
  const form = crearForm();
  titulo.textContent = 'Nueva lista';
  form.formulario.insertBefore(crearInput('Fecha: ', 'fecha', true, 'date', pedido?.fecha), form.botonera);
  form.formulario.insertBefore(crearSelec('Proveedor: ', 'proveedor', proveedores, true, pedido?.proveedor), form.botonera);
}

const selecId = (array) => {
  let id = 0;
  array.forEach(e => {
    if (Number(e.id) > id) {
      id = Number(e.id) + 1
    }
  });
  return id.toString();
}

const efectoModal = (newTexto) => {
  const modalInterno = document.querySelector('#modal-contenido');
  const texto = document.createElement('p');
  texto.textContent = newTexto;
  modalInterno.innerHTML = '';
  texto.classList.add('error');
  modalInterno.appendChild(texto);

}

const guardarRegistro = (formulario) => {
  const ruta =window.location.hash.slice(1) || '/';

  const rutaVerif = verificarRutasDinamicas(ruta)

  modal.classList.add('visble')
  switch (rutaVerif.newPath) {
    case URLRUTAS.PROVEEDORES_FORM:
      const nuevoProveedor = guardarProveedor(rutaVerif.idSelect);
      if (nuevoProveedor) {
        efectoModal(`Se creó el proveedor ${nuevoProveedor.nombre} correctamente`);
        formulario.reset();
      }
      break;
    case URLRUTAS.PRODUCTOS_FORM:
      const nuevoProducto = guardarProducto(rutaVerif.idSelect);
      if (nuevoProducto) {
        efectoModal(`Se creó el producto ${nuevoProducto.nombre} correctamente`);
        formulario.reset();
      }
      break;
    case URLRUTAS.RUBROS_FORM:
      const nuevoRubro = guardarRubro(rutaVerif.idSelect);
      if (nuevoRubro) {
        efectoModal(`Se creó el rubro ${nuevoRubro.nombre} correctamente`);
        formulario.reset();
      }
      break;
    case URLRUTAS.LISTAS_FORM:
      guardarLista(rutaVerif.idSelect);
      break;

    default: console.log('no hay tipo')
      break;
  }
}



