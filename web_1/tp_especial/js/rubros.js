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

const rubroDto = () => {
  const nombre = document.querySelector('#nombre').value;
  const verificado = verificarRubro(nombre);
   if (verificado) {
    efectoModal(`Error: ${verificado}`);
    return;
  }
  const dto = {
    nombre: nombre,
  }
  return dto;
}

async function rubroFetch(id=null) {
  agregarScript(RUTASCRIPT.RUBRO_ADAPTER);
  console.log('id rubro', id);
  const ruta = id ? RUTAAPI.RUBRO + '/' + id :RUTAAPI.RUBRO ;
  const method = id ? METODOS_FETCH.PUT : METODOS_FETCH.POST;

  console.log('ruta', ruta)
  try{
	const respuesta = await fetchGenerico(
    ruta, 
    rubroDto(), 
    method,
    rubroAdapter,
  );

	if(respuesta.error) {
    throw new Error(respuesta.error)
  }
	if(respuesta.res){
    const index = rubros.findIndex(r=> r.id === respuesta.res.id);
    if (index != -1){
      rubros[index] = respuesta.res;
    } else {
      rubros.push(respuesta.res);
    }
    quitarScript(RUTASCRIPT.RUBRO_ADAPTER.id)
    window.location.hash = `${URLRUTAS.RUBROS}`;
	}

  } catch (er){
    console.log(er);
  }
}