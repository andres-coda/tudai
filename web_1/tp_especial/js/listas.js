const mostrarListas = () => {
  const tbody = document.querySelector('#tabla tbody');

  titulo.textContent = 'Pedidos';
  const btn = crearBtnAgregar();
  btn.addEventListener('click', ()=>{
    window.location.hash = `${URLRUTAS.LISTAS_FORM}`;
  });

  const titulos = ['Fecha', 'Proveedor', 'Estado'];
  crearTituloTabla(titulos);

  lista.forEach(p => {
    const fila = tbody.insertRow();
    fila.id = p.id;

    const fecha = fila.insertCell();
    fecha.textContent = p.fecha;

    const proveedor = fila.insertCell();
    proveedor.textContent = p.proveedor;

    const estado = fila.insertCell();
    estado.textContent = p.estado;

    const subMenuEdit = crearBtnDesplegable(p.id, funcionEliminarPedido, URLRUTAS.LISTAS_FORM);
    fila.appendChild(subMenuEdit);
  })
}

const funcionEliminarPedido = ()=>{};

const nuevaLista = (id) => {
  let pedido = null;
  if (id) {
    pedido = lista.find(l => l.id == id);
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