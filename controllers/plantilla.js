const plantilla = require('../models/plantilla');

exports.listar = async (req, res) => {
    res.render('consulta/cargar_plantilla', {
        plantillas: await plantilla.findByMedico(req.session.dni)
    })
}
exports.nueva = async (req, res) => {
    const {plantilla_nombre,plantilla_descripcion, plantilla_disenio} = req.body;
    const plantillaGuardada = await plantilla.save(req.session.dni, plantilla_nombre, plantilla_descripcion, plantilla_disenio);
    res.redirect('/plantillas');
}