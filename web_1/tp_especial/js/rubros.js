const leerRubroSesionStorage = () => {
  const aux  = sessionStorage.getItem('rubros')
  const rubros = aux ? JSON.parse(aux) : [] ;
  return rubros;
}

const editarRubros = (rubros) => {
  let aux = null;
  if(rubros && rubros.length > 0){
    aux = rubros
  };
  sessionStorage.setItem('rubros', JSON.stringify(aux))
}

async function mostrarRubros() {
  const ul = document.createElement('ul');
  ul.id = 'lista';
  titulo().textContent = 'Rubros';

  const btn = crearBtnAgregar();
  btn.addEventListener('click', () => {
    window.location.hash = `${URLRUTAS.RUBROS_FORM}`;
  });
  btn.title = 'Nuevo rubro';
  let rubros = leerRubroSesionStorage();
  console.log('<<<--- rubros --->>>', rubros)
  try {
    if (rubros.length == 0) {
      rubros = await rubrosGet();
  console.log('<<<--- rubros --->>>', rubros)
      editarRubros(rubros);
    }
    rubros.forEach(p => {
      const elemento = document.createElement('li');
      elemento.id = `rubro-${p.id}`;
      elemento.textContent = p.nombre;

      const subMenuEdit = crearBtnDesplegable(p.id, funcionEliminarRubro, URLRUTAS.RUBROS_FORM);

      elemento.appendChild(subMenuEdit)
      ul.appendChild(elemento);

      elemento.classList.add('clickeable');
      elemento.addEventListener('click', () => {
        window.location.hash = `${URLRUTAS.PRODUCTOS_RUBRO}/${p.id}`;
      })
    })
    contenedor().innerHTML = '';
    if (rubros.length == 0) {
      contenedor().appendChild(listaVacia('rubros'));
    } else {
      contenedor().appendChild(ul);
    }

  } catch (er) {
    cargarError(er);
  }

}

async function funcionEliminarRubro(id) {
  try {
    let rubros = leerRubroSesionStorage();
    const respuesta = await fetchGenerico(
      RUTAAPI.RUBRO + '/' + id,
      null,
      METODOS_FETCH.DELETE,
      null
    )
    if (respuesta.error) {
      throw new Error('No se pudo eliminar el rubro, ' + respuesta.error);
    }
    rubros = rubros.filter(r => r.id != id);
    editarRubros(rubros);
    const li = document.querySelector(`#rubro-${id}`);
    if (li) li.remove();
  } catch (er) {
    cargarError(er);
  }
};

const nuevoRubro = (id) => {
  const rubros = leerRubroSesionStorage();
  let rubro = null;
  if (id) {
    rubro = rubros.find(r => r.id == id);
  }
  const form = crearForm();
  titulo().textContent = 'Nuevo rubro';
  form.formulario.insertBefore(crearInput('Nombre del rubro: ', 'nombre', true, null, rubro?.nombre), form.botonera);
}

const rubroDto = () => {
  const nombre = document.querySelector('#nombre');
  const verificado = verificarRubro(nombre.value);
  if (verificado) {
    efectoModal(`Error: ${verificado}`);
    return;
  }
  const dto = {
    nombre: nombre.value,
  }
  return dto;
}

async function rubroFetch(id = null) {
  const ruta = id ? RUTAAPI.RUBRO + '/' + id : RUTAAPI.RUBRO;
  const method = id ? METODOS_FETCH.PUT : METODOS_FETCH.POST;
  console.log('fetch');
  const rubros = leerRubroSesionStorage();
  try {
    const res = await fetchGenerico(
      ruta,
      rubroDto(),
      method,
      rubroAdapter,
    );

    const index = rubros.findIndex(r => r.id === res.id);
    if (index != -1) {
      rubros[index] = res;
    } else {
      rubros.push(res);
    }
    editarRubros(rubros);
    window.location.hash = `${URLRUTAS.RUBROS}`;

  } catch (er) {
    cargarError(`${er.message}`);
  }
}

async function rubrosGet(id) {
  const ruta = id ? RUTAAPI.RUBRO + '/' + id : RUTAAPI.RUBRO;
  try {
    const adapter = id ? rubroAdapter : rubroAdapterArray;
    const respuesta = await fetchGenerico(
      ruta,
      null,
      METODOS_FETCH.GET,
      adapter,
    );
    return respuesta;
  } catch (er) {
    cargarError(er);
  }
} 