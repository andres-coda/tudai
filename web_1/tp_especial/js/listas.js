
const leerListaSesionStorage = () => {
  const aux = sessionStorage.getItem('listas')
  const listas = aux ? JSON.parse(aux) : [];
  return listas;
}

const editarLista = (lista) => {
  let aux = null;
  if (lista && lista.length > 0) {
    aux = lista
  };
  sessionStorage.setItem('listas', JSON.stringify(aux))
}

const leerPedidoSesionStorage = () => {
  const aux = sessionStorage.getItem('pedidoActual')
  const pedido = aux ? JSON.parse(aux) : null;
  return pedido;
}

async function mostrarListas(idProveedor) {
  let listas = leerListaSesionStorage();
  const tbody = document.querySelector('#tabla tbody');
  titulo().textContent = 'Pedidos';
  const btn = crearBtnAgregar();
  btn.addEventListener('click', () => {
    window.location.hash = `${URLRUTAS.LISTAS_FORM}`;
  });
  btn.title = 'Nuevo pedido';

  const titulos = ['Fecha', 'Proveedor', 'Estado'];
  crearTituloTabla(titulos);

  try {
    if (listas.length == 0) {
      listas = await listaGet();
      editarLista(listas);
    }
    listas
      .filter(l=> idProveedor ? l.proveedorId === idProveedor : true)
      .forEach(p => {
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

      const subMenuEdit = crearBtnDesplegable(p.id, funcionEliminarLista, `${URLRUTAS.LISTAS_FORM}/${p.id}`);
      fila.appendChild(subMenuEdit);
    })
  } catch (er) {
    cargarError(er);
  }

}

async function funcionEliminarLista(id) {
  try {
    let listas = leerListaSesionStorage();
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

    editarLista(listas);
  } catch (er) {
    cargarError(er);
  }
};

async function nuevaLista(id) {
  try {
    let pedido = null;
    if (id) {
      pedido =  await listaGet(id);
    }

    const proveedores = await proveedorGet()
    const form = crearForm(true);
    titulo().textContent = 'Nueva lista';
    form.formulario.insertBefore(crearInput('Fecha: ', 'fecha', true, 'date', pedido?.fecha), form.botonera);
    form.formulario.insertBefore(crearSelec('Proveedor: ', 'proveedor', proveedores, true, pedido?.proveedor), form.botonera);
    form.formulario.insertBefore(crearInput('Estado del pedido: ', 'estado', false, null, pedido?.estado), form.botonera);
  } catch (er) {
    cargarError(er);
  }
}

async function nuevoPedidoIndividual(id) {
  try {
    const pedido = leerPedidoSesionStorage();
    let lista = null;
    if(id){
      lista = await listaGet(id);
    }
    if (!pedido) {
      throw new Error("No hay pedido cargado. Volvé a Nueva Lista.");
    }
    const proveedor = await proveedorGet(pedido.proveedor);

    const tbody = document.querySelector('#tabla tbody');
    titulo().textContent = `Completar pedido ${formatearFechaLocal(pedido.fecha)} de ${proveedor.nombre}`;

    const titulos = ['Unidad', 'Producto', 'Cantidad'];
    crearTituloTabla(titulos);


    proveedor.productos.map(p => {
      const fila = mostrarProductoIndividual(p, proveedor.id, true);
      const celda = fila.insertCell();
      celda.classList.add('celda-cant-botonera')
      const cantidad = document.createElement('p');
      const cantidadActual = lista?.productos.find(prod=> prod.prodId === p.id) || null;
      cantidad.value = cantidadActual ? Number(cantidadActual.cantidad) : 0;
      cantidad.textContent = mostrarCantidad(cantidad.value);
      cantidad.classList.add('celda-cantidad');
      cantidad.id = p.id;
      celda.appendChild(cantidad);
      celda.appendChild(crearBtnFlechas(cantidad));
      tbody.appendChild(fila);
    })

    const botonera = crearBotonera(
      () => listaFetch(id),
      () => window.history.back(),
      'Guardar',
    );
    contenedor().appendChild(botonera);

  } catch (er) {
    cargarError(`${er.message}`);
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

    let listas = leerListaSesionStorage();
    const respuesta = await fetchGenerico(
      ruta,
      listaPedidoDto(),
      method,
      listaAdapter,
    );
    
    const index = listas.findIndex(p => p.id === respuesta.id);
    if (index != -1) {
      listas[index] = respuesta;
    } else {
      listas.push(respuesta);
    }
    editarLista(listas);
    window.location.hash = `${URLRUTAS.PEDIDO}/${respuesta.id}`;
  } catch (er) {
    cargarError(`${er.message}`);
  } finally {
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
    const adapter = id ? listaAdapter : listaAdapterArray;
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
      cantidad.value = 0
    }
    if (cantidadAux === 1) {
      cantidad.value = 0.5
    }
    if (cantidadAux > 1) {
      cantidad.value = (cantidadAux - 1).toString();
    }
    cantidad.textContent = mostrarCantidad(cantidad.value);
  });
  btnMenos.innerHTML = '-';

  const btnMas = document.createElement('button');
  btnMas.classList.add('btn-icono');
  btnMas.addEventListener('click', (e) => {
    e.stopPropagation();
    const cantidadAux = Number(cantidad.value);
    if (cantidadAux === 0.5) {
      cantidad.value = 1;
    } else {
      cantidad.value = (cantidadAux + 1).toString();
    }
    cantidad.textContent = mostrarCantidad(cantidad.value);
  });
  btnMas.innerHTML = '+';

  divBotoneraFlecha.appendChild(btnMenos);
  divBotoneraFlecha.appendChild(btnMas);

  return divBotoneraFlecha;
}

async function pasarPedido(pedid) {
  try {
    const pedido = pedid
      ? { ...pedid, proveedor: pedid.proveedorId}
      : listaDto();

    sessionStorage.setItem('pedidoActual', JSON.stringify(pedido));

    window.location.hash = `${URLRUTAS.LISTA_PEDIDO}/${pedid?.id ?? ''}`;
  } catch (er) {
    cargarError(er);
  }
}

async function mostrarPedidoIndividual(id) {
  try {
    if (!id) throw new Error('Requiere un pedido');
    const pedido = await listaGet(id);

    const tbody = document.querySelector('#tabla tbody');
    titulo().textContent = `Pedido ${formatearFechaLocal(pedido.fecha)} para ${pedido.proveedor}`;

    const titulos = ['Unidad', 'Producto', 'rubro', 'Cantidad'];
    crearTituloTabla(titulos);
    pedido.productos.map(p => {
      const fila = mostrarProductoIndividual(p, true, false);
      const celda = fila.insertCell();
      celda.textContent = mostrarCantidad(p.cantidad);
      tbody.appendChild(fila);
    });

    const botonera = crearBotonera(
      () => {
        const msj = armarMensajePedido(pedido);
        enviarPedidoWhatsApp(pedido.telefono, msj);
      },
      ()=>pasarPedido(pedido),
      'Enviar',
      'Editar'
    );

    contenedor().appendChild(botonera);
  } catch (er) {
    cargarError(er);
  }
}

function mostrarCantidad(val) {
  const valor = Number(val)
  if (valor % 1 === 0) {
    return valor.toString(); // entero
  }
  return valor.toFixed(1); // con 1 decimal
}