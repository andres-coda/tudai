const rutaBaseApiLocal = 'http://localhost:3030/';
const rutaBaseApi = 'https://verdulerialistas-bacck.onrender.com/'
const RUTAAPI = {
  REGISTRO: rutaBaseApi + 'user',
  LOGIN: rutaBaseApi + 'auth/login',
  PERFIL: rutaBaseApi + 'auth/profile',
  PRODUCTO: rutaBaseApi + 'producto',
  PROV: rutaBaseApi + 'proveedor',
  RUBRO: rutaBaseApi + 'rubro',
  LISTA: rutaBaseApi + 'pedido',
}

const METODOS_FETCH = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
}

/* <<<------------ 
 Realiza una petición fetch genérica.
 param {string} url - URL de la API a consumir
 param {object|null} dto - Datos a enviar en POST/PUT
 param {string} metodo - GET/POST/PUT/DELETE
 param {function|null} adaptador - Función para adaptar la respuesta
 returns {Promise<{res:any, error:string}>}
 ------------>>> */

async function fetchGenerico(url, dto = null, metodo = METODOS_FETCH.GET, adaptador = null) {
  const token = getLocalStorageSeguro('token');

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

    return adaptador ? adaptador(aux) : aux;
  } catch (er) {
    console.error('Error en fetchGenerico:', er);
    throw er;
  } 
}
