const mostrarListas = () => {
  titulo.textContent = 'Pedidos'
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
  })
}

if (sessionStorage.getItem('tipo') === 'listas') {

  mostrarListas();

  agregar.addEventListener('click', () => navegar('listas'))
}