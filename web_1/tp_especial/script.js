const thead = document.querySelector('#tabla thead');
const tbody = document.querySelector('#tabla tbody');
const agregar = document.querySelector('#nuevaLista');

const crearTituloTabla = (titulos) =>{
   thead.innerHTML = '';
   const filaTitulo = document.createElement('tr');
   titulos.forEach(titulo => {
      const th = document.createElement('th');
      th.textContent = titulo;
      filaTitulo.appendChild(th);
   });
   
   thead.appendChild(filaTitulo);
}

const mostrarListas = () => {
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

const mostrarProveedores = () => {
   const titulos = ['Proveedor', 'Telefono'];
   crearTituloTabla(titulos);

   proveedores.forEach(p => {
      const fila = tbody.insertRow();
      fila.id = p.id;

      const nombre = fila.insertCell();
      nombre.textContent = p.nombre;

      const telefono = fila.insertCell();
      telefono.textContent = p.telefono;
   })
}

const listaSeleccion = (idElemento) => {
   console.log('idEle: ', idElemento)
   lista.map(p => {
      if (p.id === idElemento) {
         console.log(p.proveedor);
         return
      }
   })
}

const tr = document.querySelectorAll('tr');
tr.forEach(elemento => {
   elemento.addEventListener('click', function () {
      listaSeleccion(elemento.id)
   });
})

const navegar = () => {
   tipo = tipo;
   window.location.href = 'formulario.html';
}

nuevaLista.addEventListener('click', () => navegar());

switch (tipo) {
   case 'proveedores':
      mostrarProveedores();
      break;
   case 'listas':
      mostrarListas();
      break;
   default: console.log('no hay tipo')
}
