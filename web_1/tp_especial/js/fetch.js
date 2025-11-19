const rutaBaseApi = 'http://localhost:3030/'
const RUTAAPI = {
  REGISTRO: rutaBaseApi + 'user',
  LOGIN: rutaBaseApi + 'auth/login',
  PRODUCTO: rutaBaseApi + 'producto',
  PROV: rutaBaseApi + 'proveedor',
  RUBRO: rutaBaseApi + 'rubro',
  LISTA: rutaBaseApi + 'pedido'
}

const RUTASCRIPT = {

  INICIO: { id: 'inicioScript', src: 'js/inicio.js' },
  LOGIN_ADAPTER: { id: 'loginAdapter', src: 'adaptadores/login.adapter.js' },
  PRODUCTO_ADAPTER: { id: 'productoAdapter', src: 'adaptadores/producto.adapter.js' },
  PRODUCTO: { id: 'productoScript', src: 'js/productos.js' },
  PROV_ADAPTER: { id: 'proveedorAdapter', src: 'adaptadores/proveedor.adapter.js' },
  PROV: { id: 'proveedorScript', src: 'js/proveedores.js' },
  RUBRO_ADAPTER: { id: 'rubroAdapter', src: 'adaptadores/rubro.adapter.js' },
  RUBRO: { id: 'rubroScript', src: 'js/rubros.js' },
  LISTA_ADAPTER: { id: 'listaAdapter', src: 'adaptadores/lista.adapter.js' },
  LISTA: { id: 'listaScript', src: 'js/listas.js' },
  VERIFICAR: { id: 'verificarScript', src: 'js/verificacion.js' },
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

    if (!adaptador) {
      res = aux;
    } else {
      res = adaptador(aux);
    }

  } catch (er) {
    console.error('Error en fetchGenerico:', er);
    error += er.message;
  } finally {
    return { res, error }
  }
}




