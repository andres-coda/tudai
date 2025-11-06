const rubroAdapter = (res) =>{
    const rubro = {
        id: res.id,
        nombre: res.nombre
    }
    return rubro;
}

const rubroAdapterArray = (res) => {
    const rubros = res.map(r => rubroAdapter(r));
    return rubros;
}