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