async function autenticarUsuario () {
    const correo = document.getElementById('correo').value;
    const contrasenia = document.getElementById('contrasenia').value;
    const usuario = {
        correo,
        contrasenia
    }
    const data = await fetch('/login/autenticar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    })
    console.log(data);
    const div = document.getElementById('login-errores');
    div.innerHTML = '';
    if (data.redirected) {
        window.location.href = data.url;
    }else if (data.status == 401) {
        div.append(document.createElement('p').innerHTML = 'Contraseña incorrecta');
    }else if (data.status == 404) {
        div.append(document.createElement('p').innerHTML = 'No se encontró el usuario');
    }
}