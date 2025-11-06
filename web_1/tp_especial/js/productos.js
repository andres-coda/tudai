const mostrarProductos = (idProveedor, idRubro) => {  
  const tbody = document.querySelector('#tabla tbody');
  titulo.textContent = 'Productos';
  const btn = crearBtnAgregar();
  btn.addEventListener('click', ()=>{
    window.location.hash = `${URLRUTAS.PRODUCTOS_FORM}`;
  });
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
    titulo.textContent += ` de ${proveedor.nombre}`; 
  }

  productos
    .filter(p => !idRubro || p.rubro === idRubro)
    .filter(p => !proveedor || proveedor.productos.includes(p.id))
    .map(p => mostrarProductoIndividual(p, tbody, idProveedor, idRubro));
  }
  
  const mostrarProductoIndividual = (p, tbody, idProveedor, idRubro) => {
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
    const subMenuEdit = crearBtnDesplegable(p.id, funcionEliminarProducto, URLRUTAS.PRODUCTOS_FORM);
    fila.appendChild(subMenuEdit);
    
  }

  const nuevoProducto = (id) => {
  let producto = null;
  if (id) {
    producto = productos.find(p => p.id == id);
  }
  const form = crearForm();
  titulo.textContent = 'Nuevo producto';
  form.formulario.insertBefore(crearInput('Nombre del producto: ', 'nombre', true, null, producto ? producto.nombre : null), form.botonera);
  form.formulario.insertBefore(crearSelec('Rubro: ', 'rubro', rubros, false, producto && producto.rubro), form.botonera);
}

const productoDto = () => {
  const nombre = document.querySelector('#nombre').value;
  const rubro = document.querySelector('#rubro').value;

  const verificado = verificarProducto(nombre, rubro);
  if (verificado) {
    efectoModal(`Error: ${verificado }`);
    return;
  }
  const dto = {
    nombre: nombre,
    rubro: rubro
  }
  return dto;
}
  
  const funcionEliminarProducto = ()=>{};

  async function productoFetch(id) {
    const ruta = id ? RUTAAPI.PRODUCTO + '/' + id :RUTAAPI.PRODUCTO ;
    const method = id ? METODOS_FETCH.PUT : METODOS_FETCH.POST;
	const respuesta = await fetchGenerico(
    ruta, 
    productoDto(), 
    method,
    productoAdaptador,
  );

	if(respuesta.error) {return}
	if(respuesta.res){
    const index = productos.findIndex(p=> p.id === respuesta.res.id);
    if (index != -1){
      productos[index] = respuesta.res;
    } else {
      productos.push(respuesta.res);
    }
    window.location.hash = `${URLRUTAS.PRODUCTOS}`;
	}
}

  //agregar.addEventListener('click', () => navegar('productos'));
