const verificarProducto = (nombre, rubro) => {
  if (!nombre) return 'El producto requiere nombre';
  if (nombre.length < 2 || nombre.length > 50) return 'El nombre del producto debe tener entre 2 y 50 caracteres';
  if (!rubro) return 'El producto requiere un rubro';
  return null;
}

const verificarProveedor = (nombre, telefono) => {
  if (!nombre) return 'El proveedor requiere nombre';
  if (nombre.length < 2 || nombre.length > 50) return 'El nombre del proveedor debe tener entre 2 y 50 caracteres';
  if (!telefono) return 'El proveedor debe tener un número de telefono';
  if (!Number(telefono)) 'El telefono debe ser númerico';
  if (telefono.length < 10 || telefono.length > 15) 'El número debe tener entre 10 y 15 caracteres';
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

const verificarLogin = (email, password) => {
  if (!email) return 'Para loguiarse agregue el mail';
  if (email.length < 5 || email.length > 256) return 'El mail del login debe tener entre 5 y 256 caracteres';
  if (!password) return 'Requiere una contraseña';
  if (password.length < 6 || password.length > 30) return 'La contraseña debe tener entre 6 y 30 caracteres';
  return null;
}
