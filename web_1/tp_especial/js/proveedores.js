async function crearCard(proveedor) {
  try {
    const resp = await fetch(rutas[URLRUTAS.PROVEEDORES]);
    const html = await resp.text();

    const temp = document.createElement("div");
    temp.innerHTML = html.trim();

    const card = temp.querySelector(".card");

    const nombre = card.querySelector("#nombre");
    nombre.textContent = proveedor.nombre;
    nombre.removeAttribute('id');

    const email = card.querySelector("#email");
    email.textContent = proveedor.email;
    email.removeAttribute('id');

    const telefono = card.querySelector("#telefono");
    telefono.textContent = proveedor.telefono;
    telefono.removeAttribute('id');

    const btnProd = card.querySelector("#btn-prod");
    btnProd.removeAttribute('id');

    const btnPedid = card.querySelector("#btn-pedid");
    btnPedid.removeAttribute('id');

    const editar = card.querySelector("#editar");
    editar.removeAttribute('id');

    btnPedid.addEventListener('click', () => {
      window.location.hash = `${URLRUTAS.LISTAS_PROV}/${proveedor.id}`;
    });
    btnProd.addEventListener('click', () => {
      window.location.hash = `${URLRUTAS.PRODUCTOS_PROV}/${proveedor.id}`;
    });
    editar.addEventListener('click', () => {
      window.location.hash = `${URLRUTAS.PROVEEDORES_FORM}/${proveedor.id}`;
    });

    return card;
  } catch (er) {
    cargarError(er);
  }
}

async function mostrarProveedoresCard() {
  titulo().textContent = 'Proveedores';
  const btn = crearBtnAgregar();
  btn.addEventListener('click', () => {
    window.location.hash = `${URLRUTAS.PROVEEDORES_FORM}`;
  });

  btn.title = 'Nuevo proveedor';
  let proveedores = getSesionStorageSeguro('proveedores');
  try {
    if (!proveedores || proveedores.length == 0) {
      proveedores = await proveedorGet();
    }
    contenedor().innerHTML = '';
    for (const prov of proveedores) {
      const card = await crearCard(prov);
      contenedor().appendChild(card);
    }
  } catch (er) {
    cargarError(er);
  }
}

async function funcionEliminarProveedor(id) {
  let proveedores = getSesionStorageSeguro('proveedores');
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


    setSesionStorageSeguro('proveedores', proveedores);
  } catch (er) {
    cargarError(er);
  }
};

async function nuevoProeveedor(id) {
  try {
    const prov = await proveedorGet(id)
    const productos = await productoGet();
    const datos = prov.productos?.map(p => p.id) || [];
    const form = crearForm();
    titulo().textContent = 'Nuevo proveedor';
    form.formulario.insertBefore(crearInput('Nombre del proveedor: ', 'nombre', true, null, prov?.nombre), form.botonera);
    form.formulario.insertBefore(crearInput('Email del proveedor: ', 'email', false, 'email', prov?.email), form.botonera);
    form.formulario.insertBefore(crearInput('Telefono: ', 'telefono', true, null, prov?.telefono), form.botonera);
    form.formulario.insertBefore(crearCheckBox('Productos: ', 'productos', productos, datos), form.botonera);
  } catch (er) {
    cargarError(er);
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

  let proveedores = getSesionStorageSeguro('proveedores');
  try {
    const respuesta = await fetchGenerico(
      ruta,
      provDto(),
      method,
      proveedorAdapter,
    );

    const index = proveedores.findIndex(p => p.id === respuesta.id);
    if (index != -1) {
      proveedores[index] = respuesta;
    } else {
      proveedores.push(respuesta);
    }

    setSesionStorageSeguro('proveedores', proveedores);

    window.location.hash = `${URLRUTAS.PROVEEDORES}`;
  } catch (er) {
    cargarError(`${er.message}`);
  }
}

async function proveedorGet(id) {
  const ruta = id ? RUTAAPI.PROV + '/' + id : RUTAAPI.PROV;
  try {
    const adapter = id ? proveedorAdapter : proveedorAdapterArray;
    const respuesta = await fetchGenerico(
      ruta,
      null,
      METODOS_FETCH.GET,
      adapter,
    );
    if (!respuesta) throw new Error(respuesta.error);

    return respuesta;
  } catch (er) {
    cargarError(er);
  }
} 