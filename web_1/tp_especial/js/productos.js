const mostrarProductos = () => {
   titulo.textContent = 'Lista de productos'
   const titulos = ['Nombre', 'Rubro', 'Proveedores'];
   crearTituloTabla(titulos);

   productos.forEach(p => {
      const fila = tbody.insertRow();
      fila.id = p.id;

      const nombre = fila.insertCell();
      nombre.textContent = p.nombre;

      const rubro = fila.insertCell();
      const rubroSelec = rubros.find(r=> r.id===p.rubro);
      rubro.textContent = rubroSelec.nombre;

      const proveedor = fila.insertCell();
      const nombresProveedores = [];
      proveedores.forEach(prov=>{
         const provCoincidentes = prov.productos.find(prod => prod === p.id);
         if (provCoincidentes) { 
            nombresProveedores.push(prov.nombre);
         }
      });
      proveedor.textContent = nombresProveedores.join(', ');
   })
}

mostrarProductos();

agregar.addEventListener('click', ()=> navegar('productos'))

