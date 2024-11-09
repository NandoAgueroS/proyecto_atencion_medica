const usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

exports.autenticar = async (req, res) => {
    const {correo, contrasenia} = req.body;
    console.log(correo, contrasenia);
    const user = await usuario.findByCorreo(correo);
    if (user) {
        const validPassword = await bcrypt.compare(contrasenia, user.contrasenia);
        if (validPassword) {
            req.session.user = user.correo;
            req.session.dni = user.dni;
            req.session.nombre = user.nombre;
            res.redirect('/turnos');
        } else {
        res.status(400).end();
       }
    } else {
        res.status(401).end();
    }
}
exports.logout = (req, res) => {
    req.session.destroy( ()=> {
        res.redirect('/login');
    });
}
