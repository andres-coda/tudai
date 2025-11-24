const contenedor = () => {
  return document.querySelector('#contenedor');
}
const botoneraAgregar = () => {
  return document.querySelector('#botonera-agregar');
}

const carpetaBase = () => {
  return '/paginas';
}

/*<<<------------ 
  Constante para guardar las rutas del navegador 
------------>>>*/
const URLRUTAS = {
  INICIO: '/index',
  CONFIGURACION: '/configuracion',
  PRODUCTOS: '/productos',
  PRODUCTOS_PROV: '/productos/prov',
  PRODUCTOS_RUBRO: '/productos/rubro',
  PRODUCTOS_FORM: '/productos/formulario',
  RUBROS: '/rubros',
  RUBROS_FORM: '/rubros/formulario',
  PROVEEDORES: '/proveedores',
  PROVEEDORES_FORM: '/proveedores/formulario',
  LISTAS: '/listas',
  LISTAS_FORM: '/listas/formulario',
  LISTAS_PROV: '/listas/proveedor',
  LISTA_PEDIDO: '/listas/pedidos',
  PEDIDO: '/listas/pedido-muestra',
  LOGIN: '/login',
  REGISTRO: '/registro',
  ERROR: '/error',
  PERFIL: '/perfil'
};

/*<<<------------
  Constante para guardar las rutas interna de carpetas y archivos 
------------>>> */
const rutas = {
  [URLRUTAS.INICIO]: `${carpetaBase()}/inicio.html`,
  [URLRUTAS.CONFIGURACION]: `${carpetaBase()}/configuracion.html`,
  [URLRUTAS.PRODUCTOS]: `${carpetaBase()}/tabla.html`,
  [URLRUTAS.PRODUCTOS_FORM]: `${carpetaBase()}/formulario.html`,
  [URLRUTAS.RUBROS]: `${carpetaBase()}/tabla.html`,
  [URLRUTAS.RUBROS_FORM]: `${carpetaBase()}/formulario.html`,
  [URLRUTAS.PROVEEDORES]: `${carpetaBase()}/cardProveedor.html`,
  [URLRUTAS.PROVEEDORES_FORM]: `${carpetaBase()}/formulario.html`,
  [URLRUTAS.LISTAS]: `${carpetaBase()}/tabla.html`,
  [URLRUTAS.LISTAS_FORM]: `${carpetaBase()}/formulario.html`,
  [URLRUTAS.LISTA_PEDIDO]: `${carpetaBase()}/tabla.html`,
  [URLRUTAS.LISTAS_PROV]: `${carpetaBase()}/tabla.html`,
  [URLRUTAS.PEDIDO]: `${carpetaBase()}/tabla.html`,
  [URLRUTAS.LOGIN]: `${carpetaBase()}/formulario.html`,
  [URLRUTAS.REGISTRO]: `${carpetaBase()}/formulario.html`,
  [URLRUTAS.PERFIL]: `${carpetaBase()}/perfil.html`,
  [URLRUTAS.ERROR]: `${carpetaBase()}/cargando.html`,
}

async function verificarUsuario() {
  const login = document.querySelector('#login');
  
  try {
    const token = getLocalStorageSeguro('token');
    let user = getLocalStorageSeguro('user');
    
    if (!user && token && token !== 'null' && token.length > 10) {
      user = await perfilFetch();
    }

    if (user) {
      login.textContent = user.nombre;
      login.href = "#/perfil";
      return user;
    }
    login.textContent = 'Iniciar sesión';
    login.href = "#/login";
    return null;
  } catch (er) {
    cargarError(er);
    return null;
  }
}

/*<<<------------
  Metodo que convina las dos constantes anteriores, 
  llama al metodo para verificar rutas,  
  y llama al metodo para generar la pantalla 
  tambien maneja errores  
 ------------>>>*/

async function cargarRuta() {
  const path = window.location.hash.slice(1) || '/';
  try {
    const rutaVerif = await verificarRutasDinamicas(path);
    if (!rutaVerif) throw new Error('Error verificando ruta');
    
    const ruta = rutas[rutaVerif.newPath];
    if (!ruta) {
      contenedor().innerHTML = '';
      throw new Error('No existe ruta ' + ruta);
    };
    const res = await fetch(ruta);
    const html = await res.text();
    eliminarBotonAtras();
    contenedor().innerHTML = html;
    generarPantalla(rutaVerif);
  } catch (er) {
    cargarError(er);
    console.log(er);
  }
}

/*<<<------------
  Procesa rutas con segmentos dinámicos (IDs)
  y devuelve la ruta base + parámetros detectados.
 ------------>>>*/


async function verificarRutasDinamicas(path) {
  let idRubro = null;
  let idProveedor = null;
  let idSelect = null;
  let newPath = path;

  try {
    const user = await verificarUsuario();
    if (path.startsWith(URLRUTAS.REGISTRO)) {
      return { newPath, idRubro, idProveedor, idSelect }
    }
    if (path.startsWith(URLRUTAS.INICIO)) {
      return { newPath, idRubro, idProveedor, idSelect }
    }
    if (!user) {
      newPath = URLRUTAS.LOGIN;
      return { newPath, idRubro, idProveedor, idSelect }
    }

    if (path.startsWith(URLRUTAS.PRODUCTOS_PROV)) {
      const partes = path.split('/');
      idProveedor = partes[3];
      newPath = URLRUTAS.PRODUCTOS;
    }

    if (path.startsWith(URLRUTAS.PRODUCTOS_RUBRO)) {
      const partes = path.split('/');
      idRubro = partes[3];
      newPath = URLRUTAS.PRODUCTOS;
    }

    if (path.startsWith(URLRUTAS.PRODUCTOS_FORM)) {
      const partes = path.split('/');
      idSelect = partes[3];
      newPath = URLRUTAS.PRODUCTOS_FORM;
    }

    if (path.startsWith(URLRUTAS.RUBROS_FORM)) {
      const partes = path.split('/');
      idSelect = partes[3];
      newPath = URLRUTAS.RUBROS_FORM;
    }

    if (path.startsWith(URLRUTAS.PROVEEDORES_FORM)) {
      const partes = path.split('/');
      idSelect = partes[3];
      newPath = URLRUTAS.PROVEEDORES_FORM;
    }
    if (path.startsWith(URLRUTAS.LISTAS_FORM)) {
      const partes = path.split('/');
      idSelect = partes[3];
      newPath = URLRUTAS.LISTAS_FORM;
    }
    if (path.startsWith(URLRUTAS.LISTA_PEDIDO)) {
      const partes = path.split('/');
      idSelect = partes[3];
      newPath = URLRUTAS.LISTA_PEDIDO;
    }
    if (path.startsWith(URLRUTAS.LISTAS_PROV)) {
      const partes = path.split('/');
      idProveedor = partes[3];
      newPath = URLRUTAS.LISTAS_PROV;
    }
    if (path.startsWith(URLRUTAS.PEDIDO)) {
      const partes = path.split('/');
      idSelect = partes[3];
      newPath = URLRUTAS.PEDIDO;
    }

    return { newPath, idRubro, idProveedor, idSelect }
  } catch (er) {
    cargarError(er);
    return {
      newPath: URLRUTAS.LOGIN,
      idRubro: null,
      idProveedor: null,
      idSelect: null
    };
  }
}

/* <<<------------
  Metodo que recive el objeto verificado por la ruta, 
  y crea la pantalla que corresponde,
  para eso carga los script que la pantalla creada requiera 
 ------------>>>*/

async function generarPantalla(rutaVerif) {
  try {

    switch (rutaVerif.newPath) {
      case URLRUTAS.INICIO: {
        cargarInicio()
        break;
      };
      case URLRUTAS.PRODUCTOS: {
        await mostrarProductos(rutaVerif.idProveedor, rutaVerif.idRubro);
        break;
      }
      case URLRUTAS.PRODUCTOS_FORM: {
        await nuevoProducto(rutaVerif.idSelect);
        break
      }
      case URLRUTAS.PROVEEDORES: {
        mostrarProveedoresCard(contenedor(), titulo())
        break;
      };
      case URLRUTAS.PROVEEDORES_FORM: nuevoProeveedor(rutaVerif.idSelect);
        break
      case URLRUTAS.RUBROS: {
        await mostrarRubros();
        break;
      }
      case URLRUTAS.RUBROS_FORM: nuevoRubro(rutaVerif.idSelect);
        break;
      case URLRUTAS.LISTAS: {
        await mostrarListas();
        break;
      };
      case URLRUTAS.LISTAS_FORM: nuevaLista(rutaVerif.idSelect);
        break;
      case URLRUTAS.LISTA_PEDIDO: {
        await nuevoPedidoIndividual(rutaVerif.idSelect)
        break;
      }
      case URLRUTAS.LISTAS_PROV: {
        await mostrarListas(rutaVerif.idProveedor)
        break;
      }
      case URLRUTAS.PEDIDO: {
        await mostrarPedidoIndividual(rutaVerif.idSelect)
        break;
      }
      case URLRUTAS.LOGIN: login();
        break;
      case URLRUTAS.REGISTRO: registro();
        break;
      case URLRUTAS.PERFIL: perfil();
        break;
      case URLRUTAS.CONFIGURACION: await configuracion();
        break;
    }
  } catch (er) {
    cargarError(er.message);
  }
}

window.addEventListener('DOMContentLoaded', cargarRuta);
window.addEventListener('hashchange', cargarRuta);