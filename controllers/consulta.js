const consulta = require('../models/consulta');

exports.listar = async (req, res) => {
    const dni = req.query.dni_paciente || "98765432A";
    res.send(await consulta.get(dni));
}
exports.historiaClinica = async (req, res) => {
    const dni = req.query.dni_paciente || "98765432A";
    console.log(dni);
    res.send(await consulta.getHistoriaClinica(dni));
}