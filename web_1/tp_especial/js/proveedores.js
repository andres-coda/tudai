const mostrarProveedores = () => {
  titulo.textContent = 'Proveedores'
  const titulos = ['Proveedor', 'Email', 'Telefono'];
  crearTituloTabla(titulos);

  proveedores.forEach(p => {
    const fila = tbody.insertRow();
    fila.id = p.id;

    const nombre = fila.insertCell();
    nombre.textContent = p.nombre;

    const email = fila.insertCell();
    email.textContent = p.email;

    const telefono = fila.insertCell();
    telefono.textContent = p.telefono;

    fila.classList.add('clickeable');
  })
}


if (sessionStorage.getItem('tipo') === 'proveedores') {
  mostrarProveedores();
  agregar.addEventListener('click', () => navegar('proveedores'))
}

const filas = document.querySelectorAll('.clickeable')

filas.forEach(f => {
  f.addEventListener('click', () => {
    sessionStorage.removeItem('rubro')
    sessionStorage.setItem('proveedor', `${f.id}`);
    navegarProductos('productos')
  })
})

const mostrarProveedorProductos = (id) => {

}