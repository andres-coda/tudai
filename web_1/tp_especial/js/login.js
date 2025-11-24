async function registro() {
	const user = getLocalStorageSeguro('user');

	const form = crearForm();
	titulo().textContent = user ? `Editar ${user.nombre}` : 'Registrarse';
	if (!user) {
		const btn = crearBtnAgregar();
		btn.addEventListener('click', () => {
			window.location.hash = `${URLRUTAS.LOGIN}`;
		});
		btn.title = 'Login'
	}
	form.formulario.insertBefore(crearInput('Nombre de usuario: ', 'nombre', true, null, user?.nombre || ''), form.botonera);
	form.formulario.insertBefore(crearInput('Email del proveedor: ', 'email', true, 'email', user?.email || ''), form.botonera);
	form.formulario.insertBefore(crearInput('Telefono: ', 'telefono', true, null, user?.telefono || ''), form.botonera);
	form.formulario.insertBefore(crearInput('Contraseña: ', 'password', true, 'password'), form.botonera);
	
	form.formulario.insertBefore(crearCaptchap(crearInput), form.botonera);
}

async function login() {
	const form = crearForm();
	titulo().textContent = 'Iniciar sesion';
	const btn = crearBtnAgregar();
	btn.addEventListener('click', () => {
		window.location.hash = `${URLRUTAS.REGISTRO}`;
	});
	btn.title = 'Registrarse'

	form.formulario.insertBefore(crearInput('Email del proveedor: ', 'email', true, 'email'), form.botonera);
	form.formulario.insertBefore(crearInput('Contraseña: ', 'password', true, 'password'), form.botonera);
	form.formulario.insertBefore(crearCaptchap(crearInput), form.botonera);
}

const logout = () => {
	setLocalStorageSeguro('token', null);
	setLocalStorageSeguro('user', null);
	sessionStorage.clear();
}

const perfil = () => {
	const user = getLocalStorageSeguro('user');
	titulo().textContent = 'Perfil';
	botoneraAgregar().innerHTML = '';
	const nombre = document.querySelector('#nombre');
	nombre.textContent = 'Nombre: ' + user.nombre;

	const email = document.querySelector('#email');
	email.textContent = 'Email: ' + user.email;

	const telefono = document.querySelector('#telefono');
	telefono.textContent = 'Telefono: ' + user.telefono;

	const cerrarSesion = document.querySelector('#sesion');
	cerrarSesion.addEventListener('click', () => {
		logout();
		window.location.hash = URLRUTAS.LOGIN;
	});

	const editar = document.querySelector('#editar');
	editar.addEventListener('click', () => {
		window.location.hash = `${URLRUTAS.REGISTRO}`;
	});

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

const registroDto = () => {
	const nombre = document.querySelector('#nombre');
	const telefono = document.querySelector('#telefono');
	const email = document.querySelector('#email');
	const password = document.querySelector('#password');
	const captcha = document.querySelector('#captcha');
	const verificado = verificarRegistro(email.value, password.value, nombre.value, telefono.value);
	const valiCaptchap = validarCaptchap(captcha.value);

	console.log('<<<--- dto nombre ---->>>', nombre.value)
	console.log('<<<--- nombre ---->>>', nombre)
	if (verificado || valiCaptchap) {
		console.log('<<<--- verificado ---->>>', verificado)
		console.log('<<<--- valiCaptchap ---->>>', valiCaptchap)
		efectoModal(`Error: ${verificado || valiCaptchap}`);
		return;
	}

	const dto = {
		email: email.value,
		password: password.value,
		nombre:nombre.value,
		telefono:telefono.value,
	}
	console.log('<<<--- dto registro dto ---->>>', dto)
	return dto;
}

async function loginFetch() {
	try {
		logout();
		const respuesta = await fetchGenerico(
			RUTAAPI.LOGIN,
			loginDto(),
			METODOS_FETCH.POST,
			loginAdaptador
		);

		if (!respuesta) throw new Error('Error al intentar logearse');

		await perfilFetch();
		window.location.hash = `${URLRUTAS.PERFIL}`;
	} catch (er) {
		cargarError(`${er.message}`);
	}
}

async function registroFetch() {
	const user = getLocalStorageSeguro('user');
	const url = user ? `${RUTAAPI.REGISTRO}/${user.id}` : RUTAAPI.REGISTRO;
	const metodo = user ? METODOS_FETCH.PUT : METODOS_FETCH.POST;
	const dto = registroDto();
	console.log('dto --->>', dto);
	console.log('url --->>', url);
	console.log('metodo --->>', metodo);
	try {
		const respuesta = await fetchGenerico(
			url,
			registroDto(),
			metodo,
			profileAdaptador
		);
		logout();

		if (!respuesta) throw new Error('Error al intentar logearse');

		await perfilFetch();
		window.location.hash = `${URLRUTAS.PERFIL}`;
	} catch (er) {
		cargarError(`${er.message}`);
	}
}

async function perfilFetch() {
	try {
		const respuesta = await fetchGenerico(
			RUTAAPI.PERFIL,
			null,
			METODOS_FETCH.GET,
			profileAdaptador
		);

		if (!respuesta) throw new Error('Error al intentar obtener el perfil ');

		setLocalStorageSeguro('user', respuesta);
		return respuesta;
	} catch (er) {
		logout()
		cargarError(`${er.message}`);
	}
}