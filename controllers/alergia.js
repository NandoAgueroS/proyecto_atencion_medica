const alergia = require('../models/alergia');

exports.listar = async (req, res) => {
    const alergias = await alergia.get();
    res.json(alergias);
}