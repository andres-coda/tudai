let rubros = [];

async function mostrarRubros() {
  const ul = document.createElement('ul');
  ul.id = 'lista';
  titulo.textContent = 'Rubros';

  const btn = crearBtnAgregar();
  btn.addEventListener('click', () => {
    window.location.hash = `${URLRUTAS.RUBROS_FORM}`;
  });
  try {
    if (rubros.length == 0) {
      await agregarScript({ ...RUTASCRIPT.RUBRO_ADAPTER });
      await rubrosGet();
    }
    rubros.forEach(p => {
      const elemento = document.createElement('li');
      elemento.id = p.id;
      elemento.textContent = p.nombre;

      const subMenuEdit = crearBtnDesplegable(p.id, funcionEliminarRubro, URLRUTAS.RUBROS_FORM);

      elemento.appendChild(subMenuEdit)
      ul.appendChild(elemento);

      elemento.classList.add('clickeable');
      elemento.addEventListener('click', () => {
        window.location.hash = `${URLRUTAS.PRODUCTOS_RUBRO}/${p.id}`;
      })
    })
    contenedor.innerHTML = '';
    contenedor.appendChild(ul);

  } catch (er) {
    contenedor.innerHTML = URLRUTAS.ERROR;
    cargarError(er);
  }

}

const funcionEliminarRubro = () => { };

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

  console.log('ruta', ruta)
  try {
    const respuesta = await fetchGenerico(
      ruta,
      rubroDto(),
      method,
      rubroAdapter,
    );

    if (respuesta.error) {
      throw new Error(respuesta.error)
    }
    if (respuesta.res) {
      const index = rubros.findIndex(r => r.id === respuesta.res.id);
      if (index != -1) {
        rubros[index] = respuesta.res;
      } else {
        rubros.push(respuesta.res);
      }
      quitarScript(RUTASCRIPT.RUBRO_ADAPTER.id)
      window.location.hash = `${URLRUTAS.RUBROS}`;
    }

  } catch (er) {
    console.log(er);
  }
}

async function rubrosGet() {
  try {
    const respuesta = await fetchGenerico(
      RUTAAPI.RUBRO,
      null,
      METODOS_FETCH.GET,
      rubroAdapterArray,
    );
    if (respuesta.error) {
      throw new Error(respuesta.error)
    }
    if (respuesta.res) {
      rubros = respuesta.res;
    }
  } catch (er) {
    contenedor.innerHTML = URLRUTAS.ERROR;
    cargarError(er);
  }
} 