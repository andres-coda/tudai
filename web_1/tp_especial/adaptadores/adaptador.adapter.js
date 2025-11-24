const listaDefault = () => {
  return {
    id: '',
    fecha: '',
    estado: '',
    proveedor: '',
    telefono: '',
    productos: [],
  };
}

const listaProductoDefault = () => {
  return {
    id: '',
    producto: '',
    cantidad: '',
    unidad: '',
  };
};

const listaAdapter = (res) => {
  if (!res) return listaDefault();
  const lista = {
    id: res.id,
    fecha: res.fecha,
    estado: res.estado,
    proveedor: res.proveedor?.nombre || '',
    proveedorId: res.proveedor?.id || '',
    telefono: res.proveedor?.telefono || '',
    productos: listaProdAdapterArray(res.pedidos_productos)
  }
  return lista;
}

const listaAdapterArray = (res) => {
  if (!res || res.length === 0) return []
  return res.map(l => listaAdapter(l));
}

const listaProductoAdapter = (res) => {
  if (!res) return listaProductoDefault();
  const listaProd = {
    id: res.id,
    prodId: res.producto?.id || '',
    nombre: res.producto?.nombre || '',
    rubro: res.producto?.rubro?.nombre || '',
    cantidad: res.cantidad,
    unidad: res.producto?.unidad || '',
  }
  return listaProd;
}

const listaProdAdapterArray = (res) => {
  if (!res || res.length === 0) return []
  return res.map(l => listaProductoAdapter(l));
}

const loginAdaptador = (login) => {
  const token = login.access_token;

  setLocalStorageSeguro('token', token);
  return true
}

const profileAdaptador = (profile) => {
  const usuario = {
    telefono : profile.telefono,
    nombre: profile.name,
    email: profile.email,
    id: profile.sub,
  };

  return usuario;
}

const productoDefault =()=>{
  return {
    id: '',
    nombre: '',
    unidad:'',
    rubro: '',
    proveedores: []
  }
} 

const productoAdapter = (res) => {
  if (!res) return productoDefault();
  const proveedores = res.proveedores?.map(p => p.nombre) || [];
  const producto = {
    id: res.id,
    nombre: res.nombre,
    unidad: res.unidad,
    rubro: res.rubro?.nombre || '',
    proveedores,
  }
  return producto;
}

const productoAdapterArray = (res) => {
  if (!res || res.length === 0) return []
  return res.map(p => productoAdapter(p));
}

const proveedorDefault = () => {
  return {
    id: '',
    nombre: '',
    email: '',
    telefono: '',
  }
}


const prodProvAdapter = (res) => {
  if (!res) return productoDefault();
  const producto = {
    id: res.id,
    nombre: res.nombre,
    unidad: res.unidad,
  }
  return producto;
}

const productoAdapterProveedorArray = (res) => {
  if (!res || res.length === 0) return []
  return res.map(p => prodProvAdapter(p));
}

const proveedorAdapter = (res) => {
  if (!res) return proveedorDefault();
  console.log('<<new proveedor -->>', res)
  const productos = productoAdapterProveedorArray(res?.productos);
  const proveedor = {
    id: res.id,
    nombre: res.nombre,
    email: res.email,
    telefono: res.telefono,
    productos
  }
  return proveedor;
}

const proveedorAdapterArray = (res) => {
  if (!res || res.length === 0) return []
  const proveedor = res.map(p => proveedorAdapter(p));
  return proveedor;
}

const rubroDefault = () => {
  return {
    id: '',
    nombre: ''
  }
}


const rubroAdapter = (res) => {
  if (!res) return rubroDefault();

  const productos = productoAdapterArray(res.productos)
  const rubro = {
    id: res.id,
    nombre: res.nombre,
    productos
  }
  return rubro;
}

const rubroAdapterArray = (res) => {
  if (!res || res.length === 0) return []
  const rubros = res.map(r => rubroAdapter(r));
  return rubros;
}