const mostrarRubros = () => {
  const ul = document.createElement('ul');
  ul.id='lista';
  titulo.textContent = 'Rubros';

  const btn = crearBtnAgregar();
   btn.addEventListener('click', ()=>{
    window.location.hash = `${URLRUTAS.RUBROS_FORM}`;
  });
  
  rubros.forEach(p => {
    const elemento = document.createElement('li');
    elemento.id = p.id;
    elemento.textContent = p.nombre;

    const subMenuEdit = crearBtnDesplegable(p.id, funcionEliminarRubro, URLRUTAS.RUBROS_FORM);
    
    elemento.appendChild(subMenuEdit)
    ul.appendChild(elemento);
    
    elemento.classList.add('clickeable');
    elemento.addEventListener('click', () =>{
      window.location.hash = `${URLRUTAS.PRODUCTOS_RUBRO}/${p.id}`;
    })
  })
  contenedor.innerHTML='';
  contenedor.appendChild(ul);
}

const funcionEliminarRubro = ()=>{};

const nuevoRubro = (id) => {
  let rubro = null;
  if (id) {
    rubro = rubros.find(r => r.id == id);
  }
  const form = crearForm();
  titulo.textContent = 'Nuevo rubro';
  form.formulario.insertBefore(crearInput('Nombre del rubro: ', 'nombre', true, null, rubro?.nombre), form.botonera);
}

const guardarRubro = () => {
  const nombre = document.querySelector('#nombre').value;
  const captcha = document.querySelector('#captcha').value;
  const verificado = verificarRubro(nombre);
  const valiCaptchap = validarCaptchap(captcha);
  if (verificado || valiCaptchap) {
    efectoModal(`Error: ${verificado || valiCaptchap}`);
    return;
  }
  const nuevoRubro = {
    id: selecId(productos),
    nombre: nombre,
  }
  rubros.push(nuevoRubro);
  return nuevoRubro;
}