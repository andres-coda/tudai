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
  
      const subMenuEdit = crearBtnDesplegable(p.id, funcionEliminarPedido, URLRUTAS.LISTAS_FORM);
      fila.appendChild(subMenuEdit);
    })
  } catch (er) {
    cargarError(er);
  }

}

async function funcionEliminarPedido(id){
  try {
    const respuesta = await fetchGenerico(
      RUTAAPI.PROV + '/' + id,
      null,
      METODOS_FETCH.DELETE,
      null
    )
    if (respuesta.error) {
      throw new Error('No se pudo eliminar la lista, ' + respuesta.error);
    }
    proveedores = proveedores.filter(p => p.id != id);

    const tr = document.querySelector(`#lista-${id}`);
    if (tr) tr.remove();
  } catch (er) {
    cargarError(er);
  }
};

const nuevaLista = (id) => {
  let pedido = null;
  if (id) {
    pedido = listas.find(l => l.id == id);
  }
  const form = crearForm();
  titulo.textContent = 'Nueva lista';
  form.formulario.insertBefore(crearInput('Fecha: ', 'fecha', true, 'date', pedido?.fecha), form.botonera);
  form.formulario.insertBefore(crearSelec('Proveedor: ', 'proveedor', proveedores, true, pedido?.proveedor), form.botonera);
}

const guardarLista = (formulario) => {
  const fecha = document.querySelector('#fecha').value;
  const proveedor = document.querySelector('#proveedor').value;
  const verificado = verificarLista(fecha, proveedor);
  if (verificado) {
    efectoModal(`Error: ${verificado}`);
    return;
  }

  const dto = {
    proveedor,
    fecha
  }

  formulario.reset();
  sessionStorage.setItem('crearLista', JSON.stringify(dto));
  
}