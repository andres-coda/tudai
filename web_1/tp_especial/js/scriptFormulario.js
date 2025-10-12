"use strict"
const formulario = document.querySelector('form');
const botonera = document.querySelector('.botonera');
const guardar = document.querySelector('.btn-guardar');
const atras = document.querySelector('.btn-atras');
const cerrar = document.querySelector('#btn-cerrar');
const modal = document.querySelector('.modal');
const modalInterno = document.querySelector('#modal-contenido');
const tipo = sessionStorage.getItem('tipo') || '';

const datosInput = (input, label, textLabel, nombre, requerido) => {
  input.id = nombre;
  input.name = nombre;
  input.value = '';
  input.required = requerido;
  label.htmlFor = nombre;
  label.textContent = textLabel;
}

const crearInput = (textLabel, nombre, requerido, tipo) => {
  const div = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = tipo || 'text';
  datosInput(input, label, textLabel, nombre, requerido);
  div.classList.add('div-input');
  div.appendChild(label);
  div.appendChild(input);
  return div;
}

const crearSelec = (textLabel, nombre, arraySelec, requerido) => {
  const div = document.createElement('div');
  const label = document.createElement('label');
  const select = document.createElement('select');
  datosInput(select, label, textLabel, nombre, requerido);
  arraySelec.forEach(elemento => {
    const opcion = document.createElement('option');
    opcion.id = elemento.id;
    opcion.textContent = elemento.nombre;
    opcion.value = elemento.id;
    select.appendChild(opcion);
  });
  div.classList.add('div-input');
  div.appendChild(label);
  div.appendChild(select);
  return div;
}

const crearCheckBox = (textLabel, nombre, listaElementos) => {
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
    li.appendChild(label);
    li.appendChild(input);
    ul.appendChild(li);
  });
  div.appendChild(labelTitulo);
  div.appendChild(ul);
  return div;
}

const nuevoProeveedor = () => {
  titulo.textContent = 'Nuevo proveedor';
  formulario.insertBefore(crearInput('Nombre del proveedor: ', 'nombre', true), botonera);
  formulario.insertBefore(crearInput('Email del proveedor: ', 'email', true, 'email'), botonera);
  formulario.insertBefore(crearInput('Telefono: ', 'telefono', true), botonera);
  formulario.insertBefore(crearCheckBox('Productos: ', 'productos', productos), botonera);
}

const nuevoProducto = () => {
  titulo.textContent = 'Nuevo producto';
  formulario.insertBefore(crearInput('Nombre del producto: ', 'nombre', true), botonera);
  formulario.insertBefore(crearSelec('Rubro: ', 'rubro', rubros, false), botonera);
  formulario.insertBefore(crearCaptchap(crearInput), botonera);
}

const nuevoRubro = () => {
  titulo.textContent = 'Nuevo rubro';
  formulario.insertBefore(crearInput('Nombre del rubro: ', 'nombre', true), botonera);
  formulario.insertBefore(crearCaptchap(crearInput), botonera);
}

const nuevaLista = () => {
  titulo.textContent = 'Nueva lista';
  formulario.insertBefore(crearInput('Fecha: ', 'fecha', true, 'date'), botonera);
  formulario.insertBefore(crearSelec('Proveedor: ', 'proveedor', proveedores, true), botonera);
}

switch (tipo) {
  case 'proveedores':
    nuevoProeveedor();
    break;
  case 'productos':
    nuevoProducto();
    break;
  case 'rubros':
    nuevoRubro();
    break;
  case 'listas':
    nuevaLista();
    break;
  default: console.log('no hay tipo')
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

const guardarProveedor = () => {
  const nombre = document.querySelector('#nombre').value;
  const telefono = document.querySelector('#telefono').value;

  const verificado = verificarProducto(nombre, telefono);
  if (verificado) {
    efectoModal(`Error: ${verificado}`);
    return;
  }

  const productos = document.querySelectorAll('.input-check:checked');
  const productosIds = Array.from(productos).map(checkbox => checkbox.value);

  const nuevoPorveedor = {
    id: selecId(proveedores),
    nombre: nombre,
    telefono: telefono,
    productos: productosIds,
  }
  proveedores.push(nuevoPorveedor);
  return nuevoPorveedor;
}

const guardarProducto = () => {
  const nombre = document.querySelector('#nombre').value;
  const rubro = document.querySelector('#rubro').value;
  const captcha = document.querySelector('#captcha').value;
  const valiCaptchap = validarCaptchap(captcha);

  const verificado = verificarProducto(nombre, rubro);
  if (verificado || valiCaptchap) {
    efectoModal(`Error: ${verificado || valiCaptchap}`);
    return;
  }
  const nuevoProducto = {
    id: selecId(productos),
    nombre: nombre,
    rubro: rubro
  }
  productos.push(nuevoProducto);
  return nuevoProducto;
}

const guardarRubro = () => {
  const nombre = document.querySelector('#nombre').value;
  const captcha = document.querySelector('#captcha').value;
  const verificado = verificarRubro(nombre);
  const valiCaptchap = validarCaptchap(captcha);
  if (verificado || valiCaptchap) {
    efectoModal(`Error: ${verificado || valiCaptchap}`);
    return;
  }
  const nuevoRubro = {
    id: selecId(productos),
    nombre: nombre,
  }
  rubros.push(nuevoRubro);
  return nuevoRubro;
}

const guardarLista = () => {
  const fecha = document.querySelector('#fecha').value;
  const proveedor = document.querySelector('#proveedor').value;
  const verificado = verificarLista(fecha, proveedor);
  if (verificado) {
    efectoModal(`Error: ${verificado}`);
    return;
  }

  const dto = {
    proveedor,
    fecha
  }
  
  formulario.reset();
  sessionStorage.setItem('crearLista', JSON.stringify(dto));
  navegarProductos('crearLista');
}

const efectoModal = (newTexto) => {
  const texto = document.createElement('p');
  texto.textContent = newTexto;
  modalInterno.innerHTML = '';
  texto.classList.add('error');
  modalInterno.appendChild(texto);
}

const guardarRegistro = () => {
  modal.classList.add('visble')
  switch (tipo) {
    case 'proveedores':
      const nuevoProveedor = guardarProveedor();
      if (nuevoProveedor) {
        efectoModal(`Se creó el proveedor ${nuevoProveedor.nombre} correctamente`);
        formulario.reset();
      }
      break;
    case 'productos':
      const nuevoProducto = guardarProducto();
      if (nuevoProducto) {
        efectoModal(`Se creó el producto ${nuevoProducto.nombre} correctamente`);
        formulario.reset();
      }
      break;
    case 'rubros':
      const nuevoRubro = guardarRubro();
      if (nuevoRubro) {
        efectoModal(`Se creó el rubro ${nuevoRubro.nombre} correctamente`);
        formulario.reset();
      }
      break;
    case 'listas':
      guardarLista();
      break;

    default: console.log('no hay tipo')
      break;
  }
}
guardar.value = 'Guardar';
formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  guardarRegistro();
})

atras.addEventListener('click', function (e) {
  e.preventDefault();
  window.location.href = 'index.html';
})

cerrar.addEventListener('click', () => modal.classList.remove('visble'))