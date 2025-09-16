"use strict"
const formulario = document.querySelector('form');
const titulo = document.querySelector('#titulo')
const botonera = document.querySelector('.botonera');
const guardar = document.querySelector('.btn-guardar')

const crearInput = (textLabel, nombre, requerido, tipo) => {
  const div = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.id = nombre;
  input.name = nombre;
  input.type = tipo ? tipo : 'text';
  input.value = '';
  input.required = requerido;
  label.htmlFor = nombre;
  label.textContent = textLabel;
  div.classList.add('div-input');
  div.appendChild(label);
  div.appendChild(input);
  formulario.insertBefore(div, botonera);
  return input;
}

const crearSelec = (textLabel, nombre, arraySelec, requerido) => {
  const input = crearInput(textLabel, nombre, requerido, 'select');
  arraySelec.forEach(elemento =>{
    const opcion = document.createElement('option');
    opcion.id=elemento.id;
    opcion.textContent = elemento.nombre;
    opcion.value=elemento.id;
    input.appendChild(opcion);
  });

}

const nuevoProeveedor = () => {
  titulo.textContent = 'Nuevo proveedor';
  crearInput('Nombre del proveedor: ', 'nombre', true);
  crearInput('Telefono: ', 'telefono', true);
}

const nuevoProducto = () => {
  titulo.textContent = 'Nuevo producto';
  crearInput('Nombre del producto: ', 'nombre', true);
  crearSelec('Rubro: ', 'rubro', rubros, false);
}

switch (tipo) {
  case 'proveedores':
    nuevoProeveedor();
    break;
  case 'productos':
    nuevoProducto();
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
  console.log('guardar ', nuevoPorveedor);
}

const guardarRegistro = () => {
  switch (tipo) {
  case 'proveedores':
    guardarProveedor();
    break;
  default: console.log('no hay tipo')
  break;
  
}
}

guardar.addEventListener('click', function (e) {
  e.preventDefault();
  guardarRegistro(e)
})