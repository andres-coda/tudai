/**
 * JS-Ingreso v1.0
 * H.Curti - 2022
 */

const tipos = {}

function ajustarTipo (nombre, valor) {
  return ((tipos[nombre] == "integer") || (tipos[nombre] == "number")) ?
    Number.parseInt(valor, 10) :
      (tipos[nombre] == "float") ?
    Number.parseFloat(valor) :
      valor
}

function entrada (nombre) {
  const domEntrada = document.getElementById('__' + nombre)
  return domEntrada && ajustarTipo(nombre, domEntrada.value)
}

function salida (nombre, valor) {
  const domSalida = document.getElementById('__' + nombre)
  domSalida && ( domSalida.value = valor )
}

function consola (valor) {
  const domConsola = document.getElementById("consola")
  domConsola && ( domConsola.innerHTML += '<div>' + valor + '</div>' )
}

function limpiarConsola () {
  const domConsola = document.getElementById("consola")
  domConsola.innerHTML = ''
}

function mostrarConsola () {
  $('#consola').show("slow")
}

function ocultarConsola () {
  $('#consola').hide("slow")
}

function construirEntrada(dom, nombre, tipo, ayuda, etiqueta) {
  dom.innerHTML += '<div>'
  tipos[nombre] = tipo
  etiqueta && (
    dom.innerHTML += '<label>' + etiqueta +
      '</label> '
  )

  if ((tipo=='number') || (tipo=='float') || (tipo=='text') || (tipo=='date'))
  {
    dom.innerHTML += '<input type="'+tipo+'" id="__' +
    nombre + '" placeholder="' + ( ayuda ? ayuda : "" ) +
    '"></input></div>'
  }

  if (tipo=='boolean') {
    dom.innerHTML += '<select  id="__' + nombre + '" >' +
                     '<option value="true">Verdadero</option>' +
                     '<option value="false">Falso</option>' +
                     '</select></div>'
  }
}

function cargarEntradasYSalidas () {

  let domEntradas = document.getElementById("entradas")
  const domSalidas = document.getElementById("salidas")
  const entradas = especificarEntradas()
  const salidas = especificarSalidas()

  document.getElementById("ejecutar")
    .addEventListener("click", principal)

  document.getElementById("limpiar")
    .addEventListener("click", limpiarConsola)

  document.getElementById("mostrar")
    .addEventListener("click", mostrarConsola)

  document.getElementById("ocultar")
    .addEventListener("click", ocultarConsola)

  if( Array.isArray(entradas) && entradas.length > 0 ) {
    domEntradas.innerHTML = ""
    entradas.forEach(function (e) {
      if( e && e.nombre ) {
        construirEntrada(domEntradas, e.nombre, e.tipo, e.ayuda, e.etiqueta)
      }
    })
  }
  if( Array.isArray(salidas) && salidas.length > 0 ) {
    domSalidas.innerHTML = ""
    salidas.forEach(function (s) {
      if( s && s.nombre ) {
        domSalidas.innerHTML += '<div>'
        s.etiqueta && ( domSalidas.innerHTML += s.etiqueta + " " )
        domSalidas.innerHTML += '<input readonly id="__' + s.nombre + '"></input></div>'
      }
    })
  }
}

window.onload = cargarEntradasYSalidas
