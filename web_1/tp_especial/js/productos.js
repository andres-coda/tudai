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
  form.formulario.insertBefore(crearCaptchap(crearInput), form.botonera);
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
  
  const funcionEliminarProducto = ()=>{};

  //agregar.addEventListener('click', () => navegar('productos'));
