const numero = Math.floor(Math.random() * 10000);

const crearCaptchap = (crearInput) => {
  const visor = document.createElement('p');
  const div = document.createElement('div');
  div.classList.add('div-captchap');
  div.appendChild(visor);
  visor.textContent = numero;
  div.appendChild(crearInput('Ingresa el número del cuadro para verificar que es humano', 'captcha', true));
  return div;
}


const validarCaptchap = (valor) => {
  if (valor != numero) return 'Error al resolver el captchap, para mi que sos un robot';
  return null;
}