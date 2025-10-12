const mostrarProductos = (idProveedor, idRubro) => {
  titulo.textContent = 'Productos'
  const titulos = ['Nombre'];
  if (!idRubro) {
    titulos.push('Rubro');
  }
  if (!idProveedor) {
    titulos.push('Proveedores');
  }
  crearTituloTabla(titulos);

  let proveedor = null;
  if (idProveedor) {
    proveedor = proveedores.find(p => p.id === idProveedor);
  }

  productos
    .filter(p => !idRubro || p.rubro === idRubro)
    .filter(p => !proveedor || proveedor.productos.includes(p.id))
    .map(p => mostrarProductoIndividual(p, idProveedor, idRubro))
}

const mostrarProductoIndividual = (p, idProveedor, idRubro) => {
  const fila = tbody.insertRow();
  fila.id = p.id;

  const nombre = fila.insertCell();
  nombre.textContent = p.nombre;

  if (!idRubro) {
    const rubro = fila.insertCell();
    const rubroSelec = rubros.find(r => r.id === p.rubro);
    rubro.textContent = rubroSelec.nombre;
  }

  if (!idProveedor) {
    const proveedor = fila.insertCell();
    const nombresProveedores = [];
    proveedores.map(prov => {
      const provCoincidentes = prov.productos.find(prod => prod === p.id);
      if (provCoincidentes) {
        nombresProveedores.push(prov.nombre);
      }
    });
    proveedor.textContent = nombresProveedores.join(', ');
  }
}

if (sessionStorage.getItem('tipo') === 'productos') {
  const idProveedor = sessionStorage.getItem('proveedor') || null;
  const idRubro = sessionStorage.getItem('rubro') || null;

  mostrarProductos(idProveedor, idRubro);

  agregar.addEventListener('click', () => navegar('productos'))

};
