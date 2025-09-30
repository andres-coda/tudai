const mostrarListaCrear = () => {
   titulo.textContent = `Crear lista de ${sessionStorage.getItem('proveedor')}`
   const titulos = ['Producto', 'Rubro', '', 'Cant', ''];
   crearTituloTabla(titulos);

   const proveedor = proveedores.find(p=> p.id === sessionStorage.getItem('proveedor'));
   const cantidades = [];
   proveedor.productos.forEach(prod=>{
      const producto = productos.find(p=> p.id=== prod);
      cantidades.push({id:producto.id, cantidad:0});
      const fila = tbody.insertRow();
      fila.id = producto.id;

      const nombre = fila.insertCell();
      nombre.textContent = producto.nombre;
   
      const rubro = fila.insertCell();
      const rubroSelec = rubros.find(r=> r.id===producto.rubro);
      rubro.textContent = rubroSelec.nombre;
      const menos = document.createElement('button');
      menos.classList.add('btn-menos');
      fila.appendChild(menos); 
      const cantidad = fila.insertCell();
      cantidad.textContent = 0;
      const mas = document.createElement('button');
      menos.classList.add('btn-mas');
      fila.appendChild(mas);     
   })
  
}
console.log(sessionStorage.getItem('tipo'))
if(sessionStorage.getItem('tipo') === 'crearLista') {
   
   mostrarListaCrear();
   
} ;
