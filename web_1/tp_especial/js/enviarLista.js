const armarMensajePedido=(pedido) =>{
  let msg = `Pedido para ${pedido.proveedor}\n`;
  msg += `Fecha: ${formatearFechaLocal(pedido.fecha)}\n\n`;
  msg += `Detalle:\n`;

  pedido.productos.forEach((item) => {
    msg += `• ${item.nombre} – ${item.unidad} – ${item.cantidad}\n`;
  });

  return msg;
}

const enviarPedidoWhatsApp=(numeroProveedor, mensaje) =>{
  if(!numeroProveedor) throw new Error('Falta el número de telefono');
  if(!mensaje) throw new Error('Falta el mensaje');
  const url = `https://wa.me/${numeroProveedor}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
