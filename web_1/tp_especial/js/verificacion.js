const verificarProducto = (nombre, rubro) => {
  if (!nombre) return 'El producto requiere nombre';
  if (nombre.length < 2 || nombre.length > 50) return 'El nombre del producto debe tener entre 2 y 50 caracteres';
  if (!rubro) return 'El producto requiere un rubro';
  return null;
}

const verificarProveedor = (nombre, telefono) => {
  if (!nombre) return 'El proveedor requiere nombre';
  if (nombre.length < 2 || nombre.length > 50) return 'El nombre del proveedor debe tener entre 2 y 50 caracteres';
  if (!email) return 'El proveedor requiere un email';
  if (!telefono) return 'El proveedor debe tener un número de telefono';
  if (!Number(telefono)) 'El telefono debe ser númerico';
  if (numero.length < 10 || numero.length > 15) 'El número debe tener entre 10 y 15 caracteres';
  return null;
}

const verificarRubro = (nombre) => {
  if (!nombre) return 'El rubro requiere nombre';
  if (nombre.length < 2 || nombre.length > 50) return 'El nombre del rubro debe tener entre 2 y 50 caracteres';
  return null;
}

const verificarLista = (fecha, proveedor) => {
  if (!fecha) return 'La lista requiere fecha';
  if (!proveedor) return 'La lista requiere proveedor';
  return null;
}