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
  console.log('rubro adapter res: ', res)
  if (!res || res.length === 0) return []
  const rubros = res.map(r => rubroAdapter(r));
  return rubros;
}