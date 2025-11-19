let listas = [];

async function mostrarListas(){
  const tbody = document.querySelector('#tabla tbody');
  titulo.textContent = 'Pedidos';  
  const btn = crearBtnAgregar();
  btn.addEventListener('click', ()=>{
    window.location.hash = `${URLRUTAS.LISTAS_FORM}`;
  });

  const titulos = ['Fecha', 'Proveedor', 'Estado'];
  crearTituloTabla(titulos);

  try{
    if(listas.length == 0){
      listas= await listaGet();
    }
    listas.forEach(p => {
      const fila = tbody.insertRow();
      fila.id = `lista-${p.id}`;
  
      const fecha = fila.insertCell();
      fecha.textContent = p.fecha;
  
      const proveedor = fila.insertCell();
      proveedor.textContent = p.proveedor;
  
      const estado = fila.insertCell();
      estado.textContent = p.estado;

      fila.classList.add('clickeable');

      fila.addEventListener('click', () => {
        window.location.hash = `${URLRUTAS.PRODUCTOS_LISTA}/${p.id}`;
      });
  
      const subMenuEdit = crearBtnDesplegable(p.id, funcionEliminarLista, URLRUTAS.LISTAS_FORM);
      fila.appendChild(subMenuEdit);
    })
  } catch (er) {
    cargarError(er);
  }

}

async function funcionEliminarLista(id){
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

async function nuevaLista(id){
  let pedido = null;
  if (id) {
    pedido = listas.find(l => l.id == id);
  }
  try{    
    await agregarScript(RUTASCRIPT.PROV)
    const proveedores = await proveedorGet()
    const form = crearForm(true);
    titulo.textContent = 'Nueva lista';
    form.formulario.insertBefore(crearInput('Fecha: ', 'fecha', true, 'date', pedido?.fecha), form.botonera);
    form.formulario.insertBefore(crearSelec('Proveedor: ', 'proveedor', proveedores, true, pedido?.proveedor), form.botonera);
    form.formulario.insertBefore(crearInput('Estado del pedido: ', 'estado', false, null, pedido?.estado), form.botonera);
  } catch(er){
    cargarError(er);
  } finally {
    quitarScript(RUTASCRIPT.PROV.id)
  }
}

async function nuevoPedidoIndividual(pedidoId){
  try {
    if(!pedidoId) throw new Error('Debe completar el pedido para continuar');
    const pedido = await listaGet(pedidoId);
    const tbody = document.querySelector('#tabla tbody');
    titulo.textContent = `Completar pedido ${pedido.fecha} de ${pedido.proveedor}`;  
    
    const titulos = ['Unidad', 'Producto', 'Cantidad'];
    crearTituloTabla(titulos);

    await agregarScript(RUTASCRIPT.PROV);
    await agregarScript(RUTASCRIPT.PRODUCTO);
    const proveedor = await proveedorGet(pedido.proveedor);

    proveedor.productos.map(p=>{
      const fila = mostrarProductoIndividual(p, proveedor.id, true, false);
      const celda = fila.insertCell();
      celda.textContent = '0';
      celda.appendChild(crearBtnFlechas(celda))
      tbody.appendChild(fila);
    })

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
  
  const verificado = verificarLista(fecha, proveedor);
  if (verificado) {
    efectoModal(`Error: ${verificado}`);
    return;
  }

  const dto = {
    proveedor,
    fecha,
    estado
  }

  return dto;
}

async function listaFetch(id=null) {
  const ruta = id ? RUTAAPI.LISTA + '/' + id : RUTAAPI.LISTA;
  const method = id ? METODOS_FETCH.PUT : METODOS_FETCH.POST;

  try {
    await agregarScript(RUTASCRIPT.VERIFICAR);
    await agregarScript(RUTASCRIPT.LISTA_ADAPTER);
    const respuesta = await fetchGenerico(
      ruta,
      listaDto(),
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
      window.location.hash = `${URLRUTAS.LISTA_PEDIDO}/${respuesta.res.id}`;
    }
  } catch (er) {
    cargarError(`${er.message}`);
  } finally {
    quitarScript(RUTASCRIPT.LISTA_ADAPTER.id);
    quitarScript(RUTASCRIPT.VERIFICAR.id);
  }
}

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

const crearBtnFlechas = (cantidad) => {
  const divBotoneraFlecha = document.createElement('div');
  divBotoneraFlecha.classList.add('botonera-cantidad');

  const btnMenos = document.createElement('button');
  btnMenos.classList.add('btn-icono');
  btnMenos.addEventListener('click', (e) => {
    e.stopPropagation();
    cantidad.textContent = cantidad.textContent < 1
    ? 0
    : Number(cantidad.textContent - 1);    
  });
  btnMenos.innerHTML = '-';

  const btnMas = document.createElement('button');
  btnMas.classList.add('btn-icono');
  btnMas.addEventListener('click', (e) => {
    e.stopPropagation();
    cantidad.textContent = Number(cantidad.textContent + 1);    
  });
  btnMas.innerHTML = '+';

  divBotoneraFlecha.appendChild(btnMenos);
  divBotoneraFlecha.appendChild(btnMas);

  return divBotoneraFlecha;
}