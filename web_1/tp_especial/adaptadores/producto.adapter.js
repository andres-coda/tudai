const productoAdapter = (res) => {
  const proveedores = res.proveedores?.map(p => p.nombre) || [];
  const producto = {
    id: res.id,
    nombre: res.nombre,
    rubro: res.rubro?.nombre || '',
    precio:res.precio,
    medida: res.medida || '',
    porcentaje: res.porcentajeAumento,
    proveedores,
  }
  return producto;
}

const productoAdapterArray = (res)=> {
  return res.map(p=> productoAdapter(p));
}