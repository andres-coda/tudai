const loginAdaptador = (login) =>{
    const usuario = {
        nombre: login.nombre,
        email: login.email,
        id: login.userId,
    };

    localStorage.setItem('token', login.token);
    
    return usuario; 
}