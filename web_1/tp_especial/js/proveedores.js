let proveedores = [];

async function mostrarProveedores() {
  const tbody = document.querySelector('#tabla tbody');

  titulo.textContent = 'Proveedores';
  const btn = crearBtnAgregar();
  btn.addEventListener('click', () => {
    window.location.hash = `${URLRUTAS.PROVEEDORES_FORM}`;
  });

  const titulos = ['Proveedor', 'Email', 'Telefono'];
  crearTituloTabla(titulos);
  try {
    if (proveedores.length == 0) {
      proveedores = await proveedorGet();
    }
    proveedores.forEach(p => {
      const fila = tbody.insertRow();
      fila.id = `prov-${p.id}`;

      const nombre = fila.insertCell();
      nombre.textContent = p.nombre;

      const email = fila.insertCell();
      email.textContent = p.email;

      const telefono = fila.insertCell();
      telefono.textContent = p.telefono;

      fila.classList.add('clickeable');

      fila.addEventListener('click', () => {
        window.location.hash = `${URLRUTAS.PRODUCTOS_PROV}/${p.id}`;
      });

      const subMenuEdit = crearBtnDesplegable(p.id, funcionEliminarProveedor, URLRUTAS.PROVEEDORES_FORM);
      fila.appendChild(subMenuEdit);
    });

  } catch (er) {
    cargarError(er);
  }
}

async function funcionEliminarProveedor(id) {
  try {
    const respuesta = await fetchGenerico(
      RUTAAPI.PROV + '/' + id,
      null,
      METODOS_FETCH.DELETE,
      null
    )
    if (respuesta.error) {
      throw new Error('No se pudo eliminar el proveedor, ' + respuesta.error);
    }
    proveedores = proveedores.filter(p => p.id != id);

    const tr = document.querySelector(`#prov-${id}`);
    if (tr) tr.remove();
  } catch (er) {
    cargarError(er);
  }
};

async function nuevoProeveedor(id) {
  let prov = null;
  if (id) {
    prov = proveedores.find(p => p.id == id);
  }
  try {
    await agregarScript(RUTASCRIPT.PRODUCTO)
    const productos = await productoGet();
    const form = crearForm();
    titulo.textContent = 'Nuevo proveedor';
    form.formulario.insertBefore(crearInput('Nombre del proveedor: ', 'nombre', true, null, prov?.nombre), form.botonera);
    form.formulario.insertBefore(crearInput('Email del proveedor: ', 'email', false, 'email', prov?.email), form.botonera);
    form.formulario.insertBefore(crearInput('Telefono: ', 'telefono', true, null, prov?.telefono), form.botonera);
    form.formulario.insertBefore(crearCheckBox('Productos: ', 'productos', productos, prov?.productos), form.botonera);
  } catch (er) {
    cargarError(er);
  } finally {
    quitarScript(RUTASCRIPT.PRODUCTO.id)
  }
}

const provDto = () => {
  const nombre = document.querySelector('#nombre');
  const telefono = document.querySelector('#telefono');
  const email = document.querySelector('#email');

  const verificado = verificarProveedor(nombre.value, telefono.value);
  if (verificado) {
    efectoModal(`Error: ${verificado}`);
    return;
  }

  const productosCheck = document.querySelectorAll('.input-check:checked');
  const productosIds = Array.from(productosCheck).map(checkbox => checkbox.value);

  const dto = {
    nombre: nombre.value,
    telefono: telefono.value,
    email: email.value,
    productos: productosIds,
  }
  return dto;
}

async function proveedorFetch(id = null) {
  const ruta = id ? RUTAAPI.PROV + '/' + id : RUTAAPI.PROV;
  const method = id ? METODOS_FETCH.PUT : METODOS_FETCH.POST;

  try {
    await agregarScript(RUTASCRIPT.VERIFICAR);
    await agregarScript(RUTASCRIPT.PRODUCTO_ADAPTER);
    const respuesta = await fetchGenerico(
      ruta,
      provDto(),
      method,
      proveedorAdapter,
    );
    if (respuesta.error) {
      throw new Error(respuesta.error)
    }
    if (respuesta.res) {
      const index = proveedores.findIndex(p => p.id === respuesta.res.id);
      if (index != -1) {
        proveedores[index] = respuesta.res;
      } else {
        proveedores.push(respuesta.res);
      }
      window.location.hash = `${URLRUTAS.PROVEEDORES}`;
    }

  } catch (er) {
    cargarError(`${er.message}`);
  } finally {
    quitarScript(RUTASCRIPT.PROV_ADAPTER.id);
    quitarScript(RUTASCRIPT.PRODUCTO_ADAPTER.id);
    quitarScript(RUTASCRIPT.VERIFICAR.id);
  }
}

async function proveedorGet(id) {
  const ruta = id ? RUTAAPI.PROV + '/' + id : RUTAAPI.PROV;
  try {
    await agregarScript(RUTASCRIPT.PROV_ADAPTER);
    await agregarScript(RUTASCRIPT.PRODUCTO_ADAPTER);
    const adapter = id ? proveedorAdapter : proveedorAdapterArray;
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
    quitarScript(RUTASCRIPT.PROV_ADAPTER.id);
    quitarScript(RUTASCRIPT.PRODUCTO_ADAPTER.id);
  }
} 