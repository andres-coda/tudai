const rutaBaseApi = 'http://localhost:8080/api/'
const RUTAAPI = {
    REGISTRO : rutaBaseApi+'auth/register',
    LOGIN : rutaBaseApi+'auth/login',
}


const METODOS_FETCH ={
  GET : 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
}

async function fetchGenerico(url, dto = null, metodo = METODOS_FETCH.GET) {
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
      error = `Error ${respuesta.status}: ${textoError}`;
    }

    res = await respuesta.json().catch(() => null);
  } catch (er) {
    console.error('Error en fetchGenerico:', er);
    error += er.message;
  } finally {
    return {res, error}
  }
}




