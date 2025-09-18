"use strict"
const formulario = document.querySelector('form');
const botonera = document.querySelector('.botonera');
const guardar = document.querySelector('.btn-guardar');
const atras = document.querySelector('.btn-atras');
const cerrar = document.querySelector('#btn-cerrar');
const modal = document.querySelector('.modal');
const modalInterno = document.querySelector('#modal-contenido');
const tipo = sessionStorage.getItem('tipo') || '';

const datosInput = (input, label, textLabel, nombre, requerido) =>{
  input.id = nombre;
  input.name = nombre;
  input.value = '';
  input.required = requerido;
  label.htmlFor = nombre;
  label.textContent = textLabel;
}

const crearInput = (textLabel, nombre, requerido) => {
  const div = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'text';
  datosInput(input, label, textLabel, nombre, requerido);
  div.classList.add('div-input');
  div.appendChild(label);
  div.appendChild(input);
  formulario.insertBefore(div, botonera);
}

const crearSelec = (textLabel, nombre, arraySelec, requerido) => {
  const div = document.createElement('div');
  const label = document.createElement('label');
  const select = document.createElement('select');
  datosInput(select, label, textLabel, nombre, requerido);
  arraySelec.forEach(elemento =>{
    const opcion = document.createElement('option');
    opcion.id=elemento.id;
    opcion.textContent = elemento.nombre;
    opcion.value=elemento.id;
    select.appendChild(opcion);
  });
  div.classList.add('div-input');
  div.appendChild(label);
  div.appendChild(select);
  formulario.insertBefore(div, botonera);
}

const crearCheckBox = (textLabel, nombre, listaElementos) => {
  const div = document.createElement('div');
  div.classList.add('div-check')
  const ul = document.createElement('ul');
  const labelTitulo = document.createElement('label');
  labelTitulo.textContent = textLabel;
  labelTitulo.htmlFor = nombre;
  ul.classList.add('ul-checkbox');
  listaElementos.forEach(elemento=>{
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
  formulario.insertBefore(div, botonera);
}

const nuevoProeveedor = () => {
  titulo.textContent = 'Nuevo proveedor';
  crearInput('Nombre del proveedor: ', 'nombre', true);
  crearInput('Telefono: ', 'telefono', true);
  crearCheckBox('Productos: ', 'productos', productos)
}

const nuevoProducto = () => {
  titulo.textContent = 'Nuevo producto';
  crearInput('Nombre del producto: ', 'nombre', true);
  crearSelec('Rubro: ', 'rubro', rubros, false);
}

const nuevoRubro = () => {
  titulo.textContent = 'Nuevo rubro';
  crearInput('Nombre del rubro: ', 'nombre', true);
}

switch (tipo) {
  case 'proveedores':
    nuevoProeveedor();
    break;
  case 'productos':
    nuevoProducto();
    break;
  case 'rubros':
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
  const nuevoPorveedor = {
    id: selecId(proveedores),
    nombre: nombre,
    telefono: telefono
  }
  proveedores.push(nuevoPorveedor);
  return nuevoPorveedor;
}

const guardarProducto = () => {
  const nombre = document.querySelector('#nombre').value;
  const rubro = document.querySelector('#rubro').value;
  const nuevoProducto = {
    id: selecId(productos),
    nombre: nombre,
    rubro: rubro
  }
  productos.push(nuevoProducto);
  return nuevoProducto;
}

const efectoModal=(categoria, nombre)=>{
  const texto = document.createElement('p');
  texto.textContent = `Se creó ${categoria} ${nombre} correctamente`;
  modalInterno.innerHTML = '';
  modalInterno.appendChild(texto)
}

const guardarRegistro = () => {
  modal.classList.add('visble')
  switch (tipo) {
  case 'proveedores':
    const nuevoProveedor = guardarProveedor();
    efectoModal('el proveedor', nuevoProveedor.nombre);
    break;
  case 'productos':
    const nuevoProducto = guardarProducto();
    efectoModal('el producto', nuevoProducto.nombre);
    break;
  default: console.log('no hay tipo')
  break;
  
}
}

guardar.addEventListener('click', function (e) {
  e.preventDefault();
  guardarRegistro(e)
})

atras.addEventListener('click', function (e) {
  e.preventDefault();
  window.location.href = 'index.html';
})

cerrar.addEventListener('click', ()=>  modal.classList.remove('visble'))