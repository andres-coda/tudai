const contenedor = document.querySelector('#contenedor');
const botoneraAgregar = document.querySelector('#botonera-agregar');
const carpetaBase = '/paginas';

const URLRUTAS = {
  INICIO: '/',
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
  LOGIN: '/login',
  REGISTRO: '/registro',
  ERROR: '/error'
};

const rutas = {
  [URLRUTAS.INICIO]: carpetaBase + '/inicio.html',
  [URLRUTAS.PRODUCTOS]: carpetaBase + '/tabla.html',
  [URLRUTAS.PRODUCTOS_FORM]: carpetaBase + '/formulario.html',
  [URLRUTAS.RUBROS]: carpetaBase + '/tabla.html',
  [URLRUTAS.RUBROS_FORM]: carpetaBase + '/formulario.html',
  [URLRUTAS.PROVEEDORES]: carpetaBase + '/tabla.html',
  [URLRUTAS.PROVEEDORES_FORM]: carpetaBase + '/formulario.html',
  [URLRUTAS.LISTAS]: carpetaBase + '/tabla.html',
  [URLRUTAS.LISTAS_FORM]: carpetaBase + '/formulario.html',
  [URLRUTAS.LOGIN]: carpetaBase + '/formulario.html',
  [URLRUTAS.REGISTRO]: carpetaBase + '/formulario.html',
  [URLRUTAS.ERROR]: carpetaBase + '/error.html',
  [URLRUTAS.ERROR]: carpetaBase + '/cargando.html',
}

async function cargarRuta() {
  const path = window.location.hash.slice(1) || '/';
  const rutaVerif = verificarRutasDinamicas(path);
  const ruta = rutas[rutaVerif.newPath];

  if (!ruta) {
    contenedor.innerHTML = pgError;
    return;
  };
  try {
    const res = await fetch(ruta);
    const html = await res.text();

    contenedor.innerHTML = html;
    generarPantalla(rutaVerif);
  } catch (er) {
    cargarError(er);
    console.log(er);
  }
}

const verificarRutasDinamicas = (path) => {
  let idRubro = null;
  let idProveedor = null;
  let idSelect = null;
  let newPath = path;

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

  console.log('--- Nueva ruta ---', newPath);

  return { newPath, idRubro, idProveedor, idSelect }
}

async function generarPantalla(rutaVerif){
  try{

    switch (rutaVerif.newPath) {
      case URLRUTAS.INICIO: cargarInicio();
      break;
      case URLRUTAS.PRODUCTOS: {
        await agregarScript(RUTASCRIPT.PRODUCTO);
        await mostrarProductos(rutaVerif.idProveedor, rutaVerif.idRubro);
      }
      break;
      case URLRUTAS.PRODUCTOS_FORM: { 
        await nuevoProducto(rutaVerif.idSelect);
      }
      break
      case URLRUTAS.PROVEEDORES: {       
        await agregarScript({...RUTASCRIPT.PROV});
        mostrarProveedores()
      };
      break;
      case URLRUTAS.PROVEEDORES_FORM: nuevoProeveedor(rutaVerif.idSelect);
      break
      case URLRUTAS.RUBROS: {        
        await agregarScript({...RUTASCRIPT.RUBRO});
        await mostrarRubros();
      }
      break;
      case URLRUTAS.RUBROS_FORM: nuevoRubro(rutaVerif.idSelect);
      break;
      case URLRUTAS.LISTAS: {
        mostrarListas();
      };
      break;
      case URLRUTAS.LOGIN: login();
      break;
      case URLRUTAS.REGISTRO: registro();
      break;
    }
  } catch (er) {
    cargarError(er.message);
  }
}

window.addEventListener('DOMContentLoaded', cargarRuta);
window.addEventListener('hashchange', cargarRuta);