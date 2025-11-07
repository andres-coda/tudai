const productoAdapter = (res) => {
  const producto = {
    id: res.id,
    nombre: res.nombre,
    rubro: res.rubro?.nombre,
  }
  return producto;
}

const productoAdapterArray = (res)=> {
  return res.map(p=> productoAdapter(p));
}