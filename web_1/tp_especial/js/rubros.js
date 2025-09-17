const mostrarRubros = () => {
   titulo.textContent = 'Lista de rubros'
   const titulos = ['Nombre'];
   crearTituloTabla(titulos);

   rubros.forEach(p => {
      const fila = tbody.insertRow();
      fila.id = p.id;

      const nombre = fila.insertCell();
      nombre.textContent = p.nombre;
   })
}

mostrarRubros();

agregar.addEventListener('click', ()=> navegar('rubros'))