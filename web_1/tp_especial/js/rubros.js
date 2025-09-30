const listaRubro = document.querySelector('#lista');

const mostrarRubros = () => {
   titulo.textContent = 'Lista de rubros'

   rubros.forEach(p => {
      const elemento = document.createElement('li');
      elemento.id = p.id;
      elemento.textContent = p.nombre;
      listaRubro.appendChild(elemento);
   })
}

mostrarRubros();

agregar.addEventListener('click', function() {
   navegar('rubros')
})