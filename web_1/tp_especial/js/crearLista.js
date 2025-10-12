
const nuevaCrearLista = (dto) => {
  const proveedor = proveedores.find(p => p.id === dto.proveedor);
  titulo.textContent = `Lista de ${proveedor.nombre} del ${dto.fecha}`;
  const titulos = ['Nombre', '-', 'Cant', '+'];

  crearTituloTabla(titulos);
  productos
    .filter(p => proveedor.productos.includes(p.id))
    .map(p => {
      const fila = tbody.insertRow();
      fila.id = p.id;

      const nombre = fila.insertCell();
      nombre.textContent = p.nombre;

      const btnMenos = document.createElement('button');
      const menos = fila.insertCell();
      btnMenos.id = `menos-${p.id}`;
      btnMenos.classList.add('btnLista')
      menos.appendChild(btnMenos);
      btnMenos.textContent = '-';

      const cantidad = fila.insertCell();
      cantidad.textContent = '0';
      cantidad.id = `cant-${p.id}`
      cantidad.classList.add('cantLista')

      const btnMas = document.createElement('button');
      const mas = fila.insertCell();
      mas.appendChild(btnMas);
      btnMas.classList.add('btnLista');
      btnMas.textContent = '+';
      btnMas.id = `mas-${p.id}`;
    });
}

const crearBotonera = () => {
  const contenedor = document.querySelector('.contenedor');
  const botonera = document.createElement('div');
  botonera.classList.add('botonera')
  const btnGuardarLista = document.createElement('button');
  btnGuardarLista.id = 'guardarLista';
  btnGuardarLista.textContent = 'Guardar lista'

  botonera.appendChild(btnGuardarLista)
  contenedor.appendChild(botonera);
}

const clacularCantidad = (btn) => {
  const productoId = btn.id.split('-')[1];
  const cantActual = document.querySelector(`#cant-${productoId}`);
  let cant = Number(cantActual.textContent);
  if (btn.id.includes('mas')) {
    cant++;
  } else {
    cant--;
  }
  if (cant < 0) {
    cant = 0;
  }
  cantActual.textContent = `${cant}`;
}

if (sessionStorage.getItem('tipo') === 'crearLista') {
  const dto = JSON.parse(sessionStorage.getItem('crearLista'));
  agregar.classList.add('oculto');
  nuevaCrearLista(dto);
  crearBotonera();
};

const btnLista = document.querySelectorAll('.btnLista');

btnLista.forEach(btn => {
  btn.addEventListener('click', ()=>clacularCantidad(btn))
});
const btnGuardarLista = document.querySelector('#guardarLista');
if(btnGuardarLista){
  btnGuardarLista.addEventListener('click', ()=>navegarProductos('listas'))
}