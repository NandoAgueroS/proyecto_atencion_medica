const medico = require('../models/medico');


exports.listar = async (req, res) => {
    res.send(await medico.get());
}
exports.buscar = async (req, res) => {
    const {dni} = req.query || "";
    res.send(await medico.get(dni));
}