let listas = [];

async function mostrarListas() {
  const tbody = document.querySelector('#tabla tbody');
  titulo.textContent = 'Pedidos';
  const btn = crearBtnAgregar();
  btn.addEventListener('click', () => {
    window.location.hash = `${URLRUTAS.LISTAS_FORM}`;
  });

  const titulos = ['Fecha', 'Proveedor', 'Estado'];
  crearTituloTabla(titulos);

  try {
    if (listas.length == 0) {
      listas = await listaGet();
    }
    listas.forEach(p => {
      const fila = tbody.insertRow();
      fila.id = `lista-${p.id}`;

      const fecha = fila.insertCell();
      fecha.textContent = formatearFechaLocal(p.fecha);

      const proveedor = fila.insertCell();
      proveedor.textContent = p.proveedor;

      const estado = fila.insertCell();
      estado.textContent = p.estado;

      fila.classList.add('clickeable');

      fila.addEventListener('click', () => {
        window.location.hash = `${URLRUTAS.PEDIDO}/${p.id}`;
      });

      const subMenuEdit = crearBtnDesplegable(p.id, funcionEliminarLista, URLRUTAS.LISTAS_FORM);
      fila.appendChild(subMenuEdit);
    })
  } catch (er) {
    cargarError(er);
  }

}

async function funcionEliminarLista(id) {
  try {
    const respuesta = await fetchGenerico(
      RUTAAPI.LISTA + '/' + id,
      null,
      METODOS_FETCH.DELETE,
      null
    )
    if (respuesta.error) {
      throw new Error('No se pudo eliminar la lista, ' + respuesta.error);
    }
    listas = listas.filter(p => p.id != id);

    const tr = document.querySelector(`#lista-${id}`);
    if (tr) tr.remove();
  } catch (er) {
    cargarError(er);
  }
};

async function nuevaLista(id) {
  let pedido = null;
  if (id) {
    pedido = listas.find(l => l.id == id);
  }
  try {
    await agregarScript(RUTASCRIPT.PROV)
    const proveedores = await proveedorGet()
    const form = crearForm(true);
    titulo.textContent = 'Nueva lista';
    form.formulario.insertBefore(crearInput('Fecha: ', 'fecha', true, 'date', pedido?.fecha), form.botonera);
    form.formulario.insertBefore(crearSelec('Proveedor: ', 'proveedor', proveedores, true, pedido?.proveedor), form.botonera);
    form.formulario.insertBefore(crearInput('Estado del pedido: ', 'estado', false, null, pedido?.estado), form.botonera);
  } catch (er) {
    cargarError(er);
  } finally {
    quitarScript(RUTASCRIPT.PROV.id)
  }
}

async function nuevoPedidoIndividual() {
  try {
    const pedido = JSON.parse(sessionStorage.getItem('pedidoActual'));

    if (!pedido) {
      throw new Error("No hay pedido cargado. Volvé a Nueva Lista.");
    }
    await agregarScript(RUTASCRIPT.PROV);
    await agregarScript(RUTASCRIPT.PRODUCTO);
    const proveedor = await proveedorGet(pedido.proveedor);

    const tbody = document.querySelector('#tabla tbody');
    titulo.textContent = `Completar pedido ${formatearFechaLocal(pedido.fecha)} de ${proveedor.nombre}`;

    const titulos = ['Unidad', 'Producto', 'Cantidad'];
    crearTituloTabla(titulos);


    proveedor.productos.map(p => {
      const fila = mostrarProductoIndividual(p, proveedor.id, true, false);
      const celda = fila.insertCell();
      celda.classList.add('celda-cant-botonera')
      const cantidad = document.createElement('p');
      cantidad.value = 0;
      cantidad.textContent = '0';
      cantidad.classList.add('celda-cantidad');
      cantidad.id = p.id;
      celda.appendChild(cantidad);
      celda.appendChild(crearBtnFlechas(cantidad));
      tbody.appendChild(fila);
    })

    contenedor.appendChild(crearBotonera(
      () => listaFetch(),
      () => window.history.back(),
      'Guardar',
    ));

  } catch (er) {
    cargarError(`${er.message}`);
  } finally {
    quitarScript(RUTASCRIPT.LISTA_ADAPTER.id);
    quitarScript(RUTASCRIPT.VERIFICAR.id);
  }
}

const listaDto = () => {
  const fecha = document.querySelector('#fecha');
  const proveedor = document.querySelector('#proveedor');
  const estado = document.querySelector('#estado');

  const verificado = verificarLista(fecha.value, proveedor.value);
  if (verificado) {
    efectoModal(`Error: ${verificado}`);
    return;
  }

  const dto = {
    proveedor: proveedor.value,
    fecha: fecha.value,
    estado: estado.value
  }

  return dto;
}

const listaPedidoDto = () => {
  const productosCelda = document.querySelectorAll('.celda-cantidad');
  const productosDto = [];
  productosCelda.forEach(pc => {
    console.log('<<<--- Productos --->>>', pc.value)
    if (Number(pc.value) > 0) {
      productosDto.push({
        producto: pc.id,
        cantidad: Number(pc.value)
      });
    };
  });

  const pedido = JSON.parse(sessionStorage.getItem('pedidoActual'));

  if (!pedido) throw new Error('No existe pedido');

  const dto = {
    ...pedido,
    productos: productosDto
  }

  return dto;
}

async function listaFetch(id = null) {
  const ruta = id ? RUTAAPI.LISTA + '/' + id : RUTAAPI.LISTA;
  const method = id ? METODOS_FETCH.PUT : METODOS_FETCH.POST;

  try {
    await agregarScript(RUTASCRIPT.VERIFICAR);
    await agregarScript(RUTASCRIPT.LISTA_ADAPTER);
    const respuesta = await fetchGenerico(
      ruta,
      listaPedidoDto(),
      method,
      listaAdapter,
    );
    if (respuesta.error) {
      throw new Error(respuesta.error)
    }
    if (respuesta.res) {
      const index = listas.findIndex(p => p.id === respuesta.res.id);
      if (index != -1) {
        listas[index] = respuesta.res;
      } else {
        listas.push(respuesta.res);
      }
      window.location.hash = `${URLRUTAS.LISTA}`;
    }
  } catch (er) {
    cargarError(`${er.message}`);
  } finally {
    quitarScript(RUTASCRIPT.LISTA_ADAPTER.id);
    quitarScript(RUTASCRIPT.VERIFICAR.id);
    sessionStorage.removeItem('pedidoActual');
  }
}

/*<<<------------
    Obtiene una o varias listas desde la API.
    Si recibe un ID devuelve un solo elemento, de lo contrario un array.
 ------------>>>*/

async function listaGet(id) {
  const ruta = id ? RUTAAPI.LISTA + '/' + id : RUTAAPI.LISTA;
  try {
    await agregarScript(RUTASCRIPT.LISTA_ADAPTER);
    const adapter = id ? listaAdapter : listaAdapterArray;
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
    quitarScript(RUTASCRIPT.LISTA_ADAPTER.id);
  }
}

/*<<<------------
  Crea los botones de + y - para modificar la cantidad en los pedidos individuales.
  param {HTMLElement} cantidad 
  returns {HTMLElement}
 ------------>>>*/

const crearBtnFlechas = (cantidad) => {
  const divBotoneraFlecha = document.createElement('div');
  divBotoneraFlecha.classList.add('botonera-cantidad');

  const btnMenos = document.createElement('button');
  btnMenos.classList.add('btn-icono');
  btnMenos.addEventListener('click', (e) => {
    e.stopPropagation();
    const cantidadAux = Number(cantidad.value);
    if (cantidadAux < 1) {
      cantidad.value = '0'
    }
    if (cantidadAux === 1) {
      cantidad.value = '0.5'
    }
    if (cantidadAux > 1) {
      cantidad.value = (cantidadAux - 1).toString();
    }
    cantidad.textContent = cantidad.value;
  });
  btnMenos.innerHTML = '-';

  const btnMas = document.createElement('button');
  btnMas.classList.add('btn-icono');
  btnMas.addEventListener('click', (e) => {
    console.log('cantidad value ', cantidad.value)
    console.log('cantidad textContext ', cantidad.textContent)
    e.stopPropagation();
    const cantidadAux = Number(cantidad.value);
    if (cantidadAux === 0.5) {
      cantidad.value = '1';
    } else {
      cantidad.value = (cantidadAux + 1).toString();
    }
    cantidad.textContent = cantidad.value;
  });
  btnMas.innerHTML = '+';

  divBotoneraFlecha.appendChild(btnMenos);
  divBotoneraFlecha.appendChild(btnMas);

  return divBotoneraFlecha;
}

async function pasarPedido(id) {
  try {
    await agregarScript(RUTASCRIPT.VERIFICAR);
    const pedido = listaDto();
    sessionStorage.setItem('pedidoActual', JSON.stringify(pedido));

    window.location.hash = `${URLRUTAS.LISTA_PEDIDO}/${id || ''}`;
  } catch (er) {
    cargarError(er);
  } finally {
    quitarScript(RUTASCRIPT.VERIFICAR.id);
  }
}

async function mostrarPedidoIndividual(id) {
  try {
    if (!id) throw new Error('Requiere un pedido');
    const pedido = await listaGet(id);

    const tbody = document.querySelector('#tabla tbody');
    titulo.textContent = `Pedido ${formatearFechaLocal(pedido.fecha)} para ${pedido.proveedor}`;

    const titulos = ['Unidad', 'Producto', 'rubro', 'Cantidad'];
    crearTituloTabla(titulos);
    await agregarScript(RUTASCRIPT.PRODUCTO)
    pedido.productos.map(p => {
      const fila = mostrarProductoIndividual(p, true, false, false);
      const celda = fila.insertCell();
      celda.textContent = p.cantidad;
      tbody.appendChild(fila);
    })
  } catch (er) {
    cargarError(er);
  } finally{
    quitarScript(RUTASCRIPT.PRODUCTO.id)
  }
}