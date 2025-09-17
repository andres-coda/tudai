const mostrarProveedores = () => {
   titulo.textContent = 'Lista de proveedores'
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

mostrarProveedores();

agregar.addEventListener('click', ()=> navegar('proveedores'))