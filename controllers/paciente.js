const paciente = require('../models/paciente.js')
exports.listar = async (req, res) =>{
    const dniMedico = req.session.dni;
    const pacientes = await paciente.getPacientesDelMedico(dniMedico);
    res.render('paciente/listar_pacientes', {
        pacientes: pacientes,
        title: 'Pacientes'
    })
}