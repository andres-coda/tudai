const numero = Math.floor(Math.random() * 10000);

const crearCaptchap = (crearInput) => {
    const visor = document.createElement('p');
    const div = document.createElement('div');
    div.classList.add('div-captchap');
    div.appendChild(visor);
    visor.textContent = numero;
    div.appendChild(crearInput('Resuelve el captchap', 'captcha', true));
    return div;
}


const validarCaptchap = (valor) => {
    if (valor != numero) return 'Error al resolver el captchap, para mi que sos un robot';
    return null;
}