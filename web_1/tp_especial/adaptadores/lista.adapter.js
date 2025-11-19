const listaDefault = {
  id: '',
  fecha: '',
  estado: '',
  proveedor: '',
}

const listaProductoDefault = {
  id: '',
  producto: '',
  cantidad: '',
  unidad:'',
}

const listaAdapter = (res) => {
  if (!res) return listaDefault;
  const lista = {
    id: res.id,
    fecha: res.fecha,
    estado: res.estado,
    proveedor: res.proveedor?.nombre || '',
    productos: listaProdAdapterArray(res.pedidos_productos)
  }
  return lista;
}

const listaAdapterArray = (res) => {
  if (!res || res.length === 0) return []
  return res.map(l => listaAdapter(l));
}

const listaProductoAdapter = (res) => {
  if(!res) return listaProductoDefault;
  const listaProd = {
    id: res.id,
    producto: res.producto?.nombre || '',
    cantidad: res.cantidad,
    unidad:res.producto?.unidad || '',
  }
  return listaProd;
}

const listaProdAdapterArray=(res) => {
  if (!res || res.length === 0) return []
  return res.map(l => listaProductoAdapter(l));
}