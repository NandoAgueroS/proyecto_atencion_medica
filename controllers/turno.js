const turno = require('../models/turno');

exports.listar = async (req, res) => {
    const matricula = req.query.matricula || "M12345";
    const fecha = req.query.fecha || "2024-11-10";
    console.log(matricula, fecha);
    res.send(await turno.get(matricula, fecha));
}