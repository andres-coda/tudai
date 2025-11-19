const productoDefault = {
  id: '',
  nombre: '',
  unidad:'',
  rubro: '',
  proveedores: []
}

const productoAdapter = (res) => {
  if (!res) return productoDefault;
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