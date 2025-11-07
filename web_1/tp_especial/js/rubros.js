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
      rubros = await rubrosGet();
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
    contenedor.innerHTML = '';
    if (rubros.length == 0) {
      contenedor.appendChild(listaVacia('rubros'));
    } else {
      contenedor.appendChild(ul);
    }

  } catch (er) {
    cargarError(er);
  }

}

async function funcionEliminarRubro(id) {
  try {
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

    const li = document.querySelector(`#rubro-${id}`);
    console.log('... li ...', li)
    if (li) li.remove();
  } catch (er) {
    cargarError(er);
  }
};

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

  try {
    await agregarScript(RUTASCRIPT.RUBRO_ADAPTER);
    await agregarScript(RUTASCRIPT.VERIFICAR);
    const respuesta = await fetchGenerico(
      ruta,
      rubroDto(),
      method,
      rubroAdapter,
    );

    if (respuesta.error) {
      console.log('respuesta ', respuesta.error)
      throw new Error(respuesta.error)
    }
    if (respuesta.res) {
      const index = rubros.findIndex(r => r.id === respuesta.res.id);
      if (index != -1) {
        rubros[index] = respuesta.res;
      } else {
        rubros.push(respuesta.res);
      }
      quitarScript(RUTASCRIPT.RUBRO_ADAPTER.id);
      quitarScript(RUTASCRIPT.VERIFICAR.id);
      window.location.hash = `${URLRUTAS.RUBROS}`;
    }

  } catch (er) {
    cargarError(`${er.message}`);
  } finally {
    quitarScript(RUTASCRIPT.RUBRO_ADAPTER.id)
  }
}

async function rubrosGet(id) {
  const ruta = id ? RUTAAPI.RUBRO + '/' + id : RUTAAPI.RUBRO;
  try {
    await agregarScript(RUTASCRIPT.RUBRO_ADAPTER);
    const adapter = id ? rubroAdapter : rubroAdapterArray;
    const respuesta = await fetchGenerico(
      ruta,
      null,
      METODOS_FETCH.GET,
      adapter,
    );
    if (respuesta.error) {
      throw new Error(respuesta.error)
    }
    return respuesta.res;
  } catch (er) {
    cargarError(er);
  } finally {
    quitarScript(RUTASCRIPT.RUBRO_ADAPTER.id)
  }
} 