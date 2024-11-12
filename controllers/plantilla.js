const plantilla = require('../models/plantilla');

exports.listar = async (req, res) => {
    const plantillas = await plantilla.findByMedico(req.session.dni);
    console.log(plantillas);
    res.render('consulta/listar_plantillas', {
        plantillas: plantillas,
        title: 'Plantillas'
    })
}

exports.eliminar = async (req, res) => {
    await plantilla.delete(req.params.id);
    res.redirect('/plantillas');
}

exports.agregar = async (req, res) => {
    res.render('consulta/cargar_plantilla', {
        title: 'Nueva plantilla'
    })
}
exports.nueva = async (req, res) => {
    const {plantilla_nombre,plantilla_descripcion, plantilla_disenio} = req.body;
    const plantillaGuardada = await plantilla.save(req.session.dni, plantilla_nombre, plantilla_descripcion, plantilla_disenio);
    res.redirect('/plantillas');
}