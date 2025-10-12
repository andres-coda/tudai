const listaRubro = document.querySelector('#lista');

const mostrarRubros = () => {
  titulo.textContent = 'Rubros'

  rubros.forEach(p => {
    const elemento = document.createElement('li');
    elemento.id = p.id;
    elemento.textContent = p.nombre;
    listaRubro.appendChild(elemento);

    elemento.classList.add('clickeable');
  })
}

mostrarRubros();

agregar.addEventListener('click', function () {
  navegar('rubros')
})

const filas = document.querySelectorAll('.clickeable')

filas.forEach(f => {
  f.addEventListener('click', () => {
    sessionStorage.removeItem('proveedor')
    sessionStorage.setItem('rubro', `${f.id}`);
    navegarProductos('productos')
  })
})