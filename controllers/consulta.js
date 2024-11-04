const consulta = require('../models/consulta');
const alergia = require('../models/alergia');
exports.iniciar = async (req, res) => {
    const idTurno = req.params.id;
    const alergias = await alergia.get();
    const importanciasDeAlergias = await consulta.getImportanciasDeAlergias(); 
    const estadosDeDiagonosticos = await consulta.getEstadosDeDiagnosticos();
    console.log(idTurno);
    res.render('consulta/cargar_consulta', 
    {
        idTurno: idTurno, 
        alergias: alergias,
        estados_de_diagnosticos: estadosDeDiagonosticos,
        importancias_de_alergias: importanciasDeAlergias
    });
}
exports.cargar = async (req, res) => {
    const consulta = req.body;
    console.log(consulta);
    res.status(200);
}
exports.historiaClinica = async (req, res) => {
    const dni = req.query.dni_paciente || "98765432A";
    console.log(dni);
    res.send(await consulta.getHistoriaClinica(dni));
}

exports.estadosDeDiagnosticos = async (req, res) => {
    res.json(await consulta.getEstadosDeDiagnosticos());
}