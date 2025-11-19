let productos = [];

async function mostrarProductos(idProveedor, idRubro) {
  const tbody = document.querySelector('#tabla tbody');
  titulo.textContent = 'Productos';
  const btn = crearBtnAgregar();
  btn.addEventListener('click', () => {
    window.location.hash = `${URLRUTAS.PRODUCTOS_FORM}`;
  });

  const titulos = ['Unidad', 'Nombre'];
  if (!idRubro) {
    titulos.push('Rubro');
  }
  if (!idProveedor) {
    titulos.push('Proveedores');
  }

  crearTituloTabla(titulos);

  try {
    if (idProveedor) {
      await agregarScript({ ...RUTASCRIPT.PROV });
      const proveedor = await proveedorGet(idProveedor);
      productos = proveedor.productos;
      titulo.textContent += ` de ${proveedor.nombre}`;
    }
    if (idRubro) {
      await agregarScript({ ...RUTASCRIPT.RUBRO });
      const rubro = await rubrosGet(idRubro);
      productos = rubro.productos;
    }
    if ((!idRubro && !idProveedor)) {
      productos = await productoGet();
    }

    if (productos.length != 0) {
      productos.map(p => tbody.appendChild(mostrarProductoIndividual(p, idProveedor, idRubro, true)));
    }

  } catch (er) {
    console.log(er)
    cargarError(er);
  }
}

/*<<<------------
  Muestra la tabla de productos.
  Filtra por proveedor o rubro si recibe parámetros.
 ------------>>>*/

const mostrarProductoIndividual = (p, proveedor, rubro, botonDesplegable) => {
  const fila = document.createElement('tr');
  fila.id = `prod-${p.id}`;

  const unidad = fila.insertCell();
  unidad.textContent = p.unidad;

  const nombre = fila.insertCell();
  nombre.textContent = p.nombre;

  if (!rubro) {
    const tdRubro = fila.insertCell();
    tdRubro.textContent = p.rubro;
  }

  if (!proveedor) {
    const proveedor = fila.insertCell();
    proveedor.textContent = p.proveedores.join(', ');
  }

  if (botonDesplegable) {
    const subMenuEdit = crearBtnDesplegable(p.id, funcionEliminarProducto, URLRUTAS.PRODUCTOS_FORM);
    fila.appendChild(subMenuEdit);
  }
  return fila;
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
    productos = productos.filter(p => p.id != id);

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
    form.formulario.insertBefore(crearInput('Unidad de compra: ', 'unidad', true, null, producto ? producto.unidad : null), form.botonera);
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
  const unidad = document.querySelector('#unidad');

  const verificado = verificarProducto(nombre.value, rubro.value, unidad.value);
  if (verificado) {
    efectoModal(`Error: ${verificado}`);
    return;
  }
  const dto = {
    nombre: nombre.value,
    rubro: rubro.value,
    unidad: unidad.value
  }
  return dto;
}

async function productoFetch(id) {
  const ruta = id ? RUTAAPI.PRODUCTO + '/' + id : RUTAAPI.PRODUCTO;
  const method = id ? METODOS_FETCH.PUT : METODOS_FETCH.POST;
  try {
    await agregarScript(RUTASCRIPT.PRODUCTO_ADAPTER);
    await agregarScript(RUTASCRIPT.VERIFICAR);
    const respuesta = await fetchGenerico(
      ruta,
      productoDto(),
      method,
      productoAdapter,
    );
    if (respuesta.error) {
      console.log('respuesta ', respuesta.error)
      throw new Error(respuesta.error)
    }
    const index = productos.findIndex(p => p.id === respuesta.res.id);
    if (index != -1) {
      productos[index] = respuesta.res;
    } else {
      productos.push(respuesta.res);
    }
    window.location.hash = `${URLRUTAS.PRODUCTOS}`;
  } catch (er) {
    cargarError(er);
  } finally {
    quitarScript(RUTASCRIPT.PRODUCTO_ADAPTER.id);
    quitarScript(RUTASCRIPT.VERIFICAR);
  }
}

async function productoGet(id) {
  const ruta = id ? RUTAAPI.PRODUCTO + '/' + id : RUTAAPI.PRODUCTO;
  try {
    await agregarScript(RUTASCRIPT.PRODUCTO_ADAPTER);
    const adapter = id ? productoAdapter : productoAdapterArray;
    const respuesta = await fetchGenerico(
      ruta,
      null,
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
