const mostrarProveedores = () => {
  const tbody = document.querySelector('#tabla tbody');

  titulo.textContent = 'Proveedores';
  const btn = crearBtnAgregar();
  btn.addEventListener('click', ()=>{
    window.location.hash = `${URLRUTAS.PROVEEDORES_FORM}`;
  });

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

    fila.addEventListener('click', () =>{
      window.location.hash = `${URLRUTAS.PRODUCTOS_PROV}/${p.id}`;
    });

    const subMenuEdit = crearBtnDesplegable(p.id, funcionEliminarProveedor, URLRUTAS.PROVEEDORES_FORM);
    fila.appendChild(subMenuEdit);
  })
}

  const funcionEliminarProveedor = ()=>{};

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