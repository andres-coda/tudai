const registro = () => {
	const form = crearForm();
	titulo.textContent = 'Registrarse';
	form.formulario.insertBefore(crearInput('Nombre de usuario: ', 'nombre', true, null), form.botonera);
	form.formulario.insertBefore(crearInput('Email del proveedor: ', 'email', true, 'email'), form.botonera);
	form.formulario.insertBefore(crearInput('Telefono: ', 'telefono', true, null), form.botonera);
	form.formulario.insertBefore(crearInput('Contraseña: ', 'password', true, 'password'), form.botonera);
	form.formulario.insertBefore(crearCaptchap(crearInput), form.botonera);
}

const login = () => {
	const form = crearForm();
	titulo.textContent = 'Iniciar sesion';
	form.formulario.insertBefore(crearInput('Email del proveedor: ', 'email', true, 'email'), form.botonera);
	form.formulario.insertBefore(crearInput('Contraseña: ', 'password', true, 'password'), form.botonera);
	form.formulario.insertBefore(crearCaptchap(crearInput), form.botonera);
}

const loginDto = () => {
	const email = document.querySelector('#email').value;
	const password = document.querySelector('#password').value;
	const captcha = document.querySelector('#captcha').value;
	const verificado = verificarLogin(email, password);
	const valiCaptchap = validarCaptchap(captcha);

	if (verificado || valiCaptchap) {
		efectoModal(`Error: ${verificado || valiCaptchap}`);
		return;
	}

	const dto = {
		email: email,
		password: password,
	}
	return dto;
}

async function loginFetch() {
	try{
    await agregarScript(RUTASCRIPT.LOGIN_ADAPTER);
	await agregarScript(RUTASCRIPT.VERIFICAR)
    localStorage.setItem('token','');
		const respuesta = await fetchGenerico(
      RUTAAPI.LOGIN, 
      loginDto(), 
      METODOS_FETCH.POST,
      loginAdaptador
    );
		
		if(respuesta.error) {
      throw new Error('Error al intentar logearse: '+respuesta.error);
    }
		if(respuesta.res){
			window.location.hash = `${URLRUTAS.PRODUCTOS}`;
		}
	} catch (er) {
    cargarError(`${er.message}`);
  } finally {
    quitarScript(RUTASCRIPT.LOGIN_ADAPTER.id);
	quitarScript(RUTASCRIPT.VERIFICAR.id);
  }
}