const tbody = document.querySelector('#tabla tbody');
const agregar = document.querySelector('#nuevaLista');

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

const listaSeleccion = (idElemento) => {
   console.log('idEle: ', idElemento)
   lista.map(p=>{
      if(p.id===idElemento){
         console.log(p.proveedor);         
         return
      }
   })
}

const tr = document.querySelectorAll('tr');
tr.forEach(elemento =>{
   elemento.addEventListener('click', function() {
      listaSeleccion(elemento.id)
});      
})

const navegar = (tipo) =>{
   tipo = tipo;
   window.location.href = 'formulario.html';
}

nuevaLista.addEventListener('click', ()=>navegar('proveedor'))