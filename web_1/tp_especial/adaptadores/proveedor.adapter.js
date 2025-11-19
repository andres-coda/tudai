const proveedorDefault = () => {
  return {
    id: '',
    nombre: '',
    email: '',
    telefono: '',
  }
}

const proveedorAdapter = (res) => {
  if (!res) return proveedorDefault();
  const productos = productoAdapterArray(res.productos);
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