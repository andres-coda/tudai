let productos = [];

async function mostrarProductos(idProveedor, idRubro) {
  const tbody = document.querySelector('#tabla tbody');
  titulo.textContent = 'Productos';
  const btn = crearBtnAgregar();
  btn.addEventListener('click', () => {
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

  try {
    let proveedor = null;
    let rubro = null;
    if (idProveedor) {
      await agregarScript({ ...RUTASCRIPT.PROV });
      proveedor = await proveedorGet(idProveedor);
      productos = proveedor.productos;
      titulo.textContent += ` de ${proveedor.nombre}`;
    }
    if (idRubro) {
      await agregarScript({ ...RUTASCRIPT.RUBRO });
      rubro = await rubrosGet(idRubro);
      productos = rubro.productos;
    }
    if ((!idRubro && !idProveedor)) {
      productos = await productoGet();
    }

    if(productos.length != 0){
      productos.map(p => mostrarProductoIndividual(p, tbody, idProveedor, idRubro));
    }

  } catch (er) {
    console.log(er)
    cargarError(er);
  }
}

const mostrarProductoIndividual = (p, tbody, proveedor, rubro) => {
  const fila = tbody.insertRow();
  fila.id = `prod-${p.id}`;

  const nombre = fila.insertCell();
  nombre.textContent = p.nombre;

  if (!rubro) {
    const tdRubro = fila.insertCell();
    tdRubro.textContent = p.rubro.nombre;
  }

  if (!proveedor) {
    const proveedor = fila.insertCell();
    const nombresProveedores = [];
    p.proveedor.map(prov => {
      nombresProveedores.push(prov.nombre);
    });
    proveedor.textContent = nombresProveedores.join(', ');
  }
  const subMenuEdit = crearBtnDesplegable(p.id, funcionEliminarProducto, URLRUTAS.PRODUCTOS_FORM);
  fila.appendChild(subMenuEdit);
}

async function funcionEliminarProducto(id) {
  try {
    const respuesta = await fetchGenerico(
      RUTAAPI.PRODUCTO + '/' + id,
      null,
      METODOS_FETCH.DELETE,
      null
    )
    if (respuesta.error) {
      throw new Error('No se pudo eliminar el producto, ' + respuesta.error);
    }
    proveedores = proveedores.filter(p => p.id != id);

    const tr = document.querySelector(`#prod-${id}`);
    if (tr) tr.remove();
  } catch (er) {
    cargarError(er);
  }
};

async function nuevoProducto(id) {
  let producto = null;
  if (id) {
    producto = productos.find(p => p.id == id);
  }
  try {
    await agregarScript(RUTASCRIPT.RUBRO);
    const rubros = await rubrosGet();
    const form = crearForm();
    titulo.textContent = 'Nuevo producto';
    form.formulario.insertBefore(crearInput('Nombre del producto: ', 'nombre', true, null, producto ? producto.nombre : null), form.botonera);
    form.formulario.insertBefore(crearSelec('Rubro: ', 'rubro', rubros, false, producto && producto.rubro), form.botonera);
  } catch (er) {
    cargarError(`${er.message}`);
  } finally {
    quitarScript(RUTASCRIPT.RUBRO);
  }
}

const productoDto = () => {
  const nombre = document.querySelector('#nombre');
  const rubro = document.querySelector('#rubro');

  const verificado = verificarProducto(nombre.value, rubro.value);
  if (verificado) {
    efectoModal(`Error: ${verificado}`);
    return;
  }
  const dto = {
    nombre: nombre.value,
    rubro: rubro.value
  }
  return dto;
}

async function productoFetch(id) {
  const ruta = id ? RUTAAPI.PRODUCTO + '/' + id : RUTAAPI.PRODUCTO;
  const method = id ? METODOS_FETCH.PUT : METODOS_FETCH.POST;
  try {
    await agregarScript(RUTASCRIPT.PRODUCTO_ADAPTER);
    const respuesta = await fetchGenerico(
      ruta,
      productoDto(),
      method,
      productoAdaptador,
    );
    if (respuesta.error) {
      console.log('respuesta ', respuesta.error)
      throw new Error(respuesta.error)
    }
    return respuesta.res;
  } catch (er) {
    cargarError(er);
  } finally {
    quitarScript(RUTASCRIPT.PRODUCTO_ADAPTER.id)
  }

  if (respuesta.error) { return }
  if (respuesta.res) {
    const index = productos.findIndex(p => p.id === respuesta.res.id);
    if (index != -1) {
      productos[index] = respuesta.res;
    } else {
      productos.push(respuesta.res);
    }
    window.location.hash = `${URLRUTAS.PRODUCTOS}`;
  }
}

async function productoGet(id) {
  const ruta = id ? RUTAAPI.PRODUCTO + '/' + id : RUTAAPI.PRODUCTO;
 try {
    await agregarScript(RUTASCRIPT.PRODUCTO_ADAPTER);
    const adapter = id ? productoAdapter : productoAdapterArray;
    const respuesta = await fetchGenerico(
      ruta,
      productoDto(),
      METODOS_FETCH.GET,
      adapter,
    );
    if (respuesta.error) {
      throw new Error(respuesta.error)
    }
    return respuesta.res;
  } catch (er) {
    cargarError(er);
  } finally {
    quitarScript(RUTASCRIPT.PRODUCTO_ADAPTER.id)
  }
}
