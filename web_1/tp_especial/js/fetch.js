const rutaBaseApi = 'http://localhost:8080/api/'
const RUTAAPI = {
    REGISTRO : rutaBaseApi+'auth/register',
    LOGIN : rutaBaseApi+'auth/login',
    PRODUCTO: rutaBaseApi+'productos-particulares',
    RUBRO : rutaBaseApi+'rubros-particulares'
}

const RUTASCRIPT = {
  RUBRO_ADAPTER : { id : 'rubroAdapter', src : 'adaptadores/rubro.adapter.js'},
  RUBRO : { id : 'rubroScript', src : 'js/rubros.js'}
}


const METODOS_FETCH ={
  GET : 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
}

async function fetchGenerico(url, dto = null, metodo = METODOS_FETCH.GET, adaptador=null) {
  const token = localStorage.getItem('token');
  let error = '';
  let res;

  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const opciones = {
    method: metodo.toUpperCase(),
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: (dto && metodo !== METODOS_FETCH.GET) ? JSON.stringify(dto) : undefined
  };

  try {
    const respuesta = await fetch(url, opciones);

    if (!respuesta.ok) {
      const textoError = await respuesta.text();
      throw new Error(`Error ${respuesta.status}: ${textoError}`);
    }

    const aux = await respuesta.json().catch(() => null);
    
    if(!adaptador) {
      res = aux;
    } else {
      res = adaptador(aux);
    }

  } catch (er) {
    console.error('Error en fetchGenerico:', er);
    error += er.message;
  } finally {
    return {res, error}
  }
}




