const contenedor = document.querySelector('#contenedor');
const botoneraAgregar = document.querySelector('#botonera-agregar');
const carpetaBase = '/paginas';

/* ------- Constante para guardar las rutas del navegador ------- */
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
  LISTA_PEDIDO: '/listas/pedidos',
  LOGIN: '/login',
  REGISTRO: '/registro',
  ERROR: '/error'
};

/* ------- Constante para guardar las rutas interna de carpetas y archivos ------- */
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
  [URLRUTAS.LISTA_PEDIDO]: carpetaBase + '/tabla.html',
  [URLRUTAS.LOGIN]: carpetaBase + '/formulario.html',
  [URLRUTAS.REGISTRO]: carpetaBase + '/formulario.html',
  [URLRUTAS.ERROR]: carpetaBase + '/error.html',
  [URLRUTAS.ERROR]: carpetaBase + '/cargando.html',
}

/* ------- Metodo que convina las dos constantes anteriores, 
          llama al metodo para verificar rutas,  
          y llama al metodo para generar la pantalla 
          tambien maneja errores                            ------- */

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

/* ------- Metodo para verificar rutas del navegador
           y si tienen elementos como id los guarda en un objeto para despues manipularlo, 
          le entra la url del navegador y devuelve una nueva url que es la que debe usarse
          para crear la pantalla, idSeleccionado si es que hay, y tambien el id de rubro o provedor
          requerido para mostrar productos                           ------- */

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
  if(path.startsWith(URLRUTAS.LISTA_PEDIDO)){
    const partes = path.split('/');
    idSelect = partes[3];
    newPath = URLRUTAS.LISTA_PEDIDO;
  }

  return { newPath, idRubro, idProveedor, idSelect }
}

/* ------- Metodo que recive el objeto verificado por la ruta, 
          y crea la pantalla que corresponde,
          para eso carga los script que la pantalla creada requiera ------- */

async function generarPantalla(rutaVerif){
  try{

    switch (rutaVerif.newPath) {
      case URLRUTAS.INICIO: {
        await agregarScript(RUTASCRIPT.INICIO);
        cargarInicio()
        break;
      };
      case URLRUTAS.PRODUCTOS: {
        await agregarScript(RUTASCRIPT.PRODUCTO);
        await mostrarProductos(rutaVerif.idProveedor, rutaVerif.idRubro);
        break;
      }
      case URLRUTAS.PRODUCTOS_FORM: { 
        await nuevoProducto(rutaVerif.idSelect);
        break
      }
      case URLRUTAS.PROVEEDORES: {       
        await agregarScript({...RUTASCRIPT.PROV});
        mostrarProveedores()
        break;
      };
      case URLRUTAS.PROVEEDORES_FORM: nuevoProeveedor(rutaVerif.idSelect);
      break
      case URLRUTAS.RUBROS: {        
        await agregarScript({...RUTASCRIPT.RUBRO});
        await mostrarRubros();
        break;
      }
      case URLRUTAS.RUBROS_FORM: nuevoRubro(rutaVerif.idSelect);
      break;
      case URLRUTAS.LISTAS: {        
        await agregarScript({...RUTASCRIPT.LISTA});
        await mostrarListas();
        break;
      };
      case URLRUTAS.LISTAS_FORM: nuevaLista(rutaVerif.idSelect);
      break;
      case URLRUTAS.LISTA_PEDIDO: {
        await agregarScript({...RUTASCRIPT.LISTA});
        await nuevoPedidoIndividual(rutaVerif.idSelect)
        break;
      }
      case URLRUTAS.LOGIN: login();
      break;
      case URLRUTAS.REGISTRO: registro();
      break;
    }
  } catch (er) {
    cargarError(er.message);
  } finally{
    quitarScript(RUTASCRIPT.INICIO.id);
    quitarScript(RUTASCRIPT.LISTA.id);
    quitarScript(RUTASCRIPT.RUBRO.id);
    quitarScript(RUTASCRIPT.PROV.id);
    quitarScript(RUTASCRIPT.PRODUCTO.id);
  }
}

window.addEventListener('DOMContentLoaded', cargarRuta);
window.addEventListener('hashchange', cargarRuta);