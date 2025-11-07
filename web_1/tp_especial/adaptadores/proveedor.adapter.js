const proveedorAdapter = (res) => {
    const proveedor = {
        id: res.id,
        nombre: res.nombre,
        email: res.email,
        telefono: res.telefono,
    }
    return proveedor;
}

const proveedorAdapterArray = (res) => {
    const proveedor = res.map(p => proveedorAdapter(p));
    return proveedor;
}