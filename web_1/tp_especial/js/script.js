const thead = document.querySelector('#tabla thead');
const tbody = document.querySelector('#tabla tbody');
const agregar = document.querySelector('#nuevaLista');
const titulo = document.querySelector('#titulo');
const provederesNav = document.querySelector('#proveedores');
const productosNav = document.querySelector('#productos');
const listasNav = document.querySelector('#listas');

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

const listaSeleccion = (idElemento) => {
   lista.map(p => {
      if (p.id === idElemento) {
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


const navegar = (tipo) => {
   sessionStorage.setItem('tipo', tipo);
   window.location.href = 'formulario.html';
}

provederesNav.addEventListener('click', function (){
   sessionStorage.setItem('tipo', 'proveedores');
})

productosNav.addEventListener('click', function (){
   sessionStorage.setItem('tipo', 'productos');
})

listasNav.addEventListener('click', function (){
   sessionStorage.setItem('tipo', 'listas');
})