const consulta = require('../models/consulta');
const alergia = require('../models/alergia');
const diagnostico = require('../models/diagnostico');
const habito = require('../models/habito');
const medicamento = require('../models/medicamento');
const antecedente = require('../models/antecedente');
const turno = require('../models/turno');
exports.iniciar = async (req, res) => {
    const idTurno = req.params.id;
    const alergias = await alergia.get();
    const importanciasDeAlergias = await consulta.getImportanciasDeAlergias(); 
    const estadosDeDiagonosticos = await consulta.getEstadosDeDiagnosticos();
    const resultado = await consulta.crear(req.params.id, req.query.dni);

    console.log(idTurno);
    res.render('consulta/cargar_consulta', 
    {
        idTurno: idTurno, 
        alergias: alergias,
        estados_de_diagnosticos: estadosDeDiagonosticos,
        importancias_de_alergias: importanciasDeAlergias,
        iniciador: resultado
    });
}
exports.cargar = async (req, res) => {
    const consultaData = req.body;
    console.log(consultaData);
    // await turno.setAtendido(consultaData.id_turno);
    if(consultaData.id_consulta){
        const consultaSaved = await consulta.save(consultaData.id_consulta, consultaData.evolucion.descripcion);
        if(consultaData.alergias){
            const alergiaSaved = await alergia.save(consultaData.alergias[0].id_alergia, consultaData.alergias[0].id_importancia, consultaData.alergias[0].fecha_desde, consultaData.alergias[0].fecha_hasta, consultaData.id_consulta);
        }
        if(consultaData.diagnosticos){
            const diagnosticoSaved = await diagnostico.save(consultaData.diagnosticos[0].descripcion,consultaData.diagnosticos[0].id_estado, consultaData.id_consulta);
        }
        if(consultaData.habitos){
            const habitoSaved = await habito.save(consultaData.habitos[0].descripcion, consultaData.habitos[0].fecha_desde, consultaData.habitos[0].fecha_hasta, consultaData.id_consulta);
        }
        if(consultaData.medicamentos){
            const medicamentoSaved = await medicamento.save(consultaData.medicamentos[0].descripcion, consultaData.id_consulta);
        }
        if(consultaData.antecedentes){
            const antecedenteSaved = await antecedente.save(consultaData.antecedentes[0].descripcion, consultaData.antecedentes[0].fecha_desde, consultaData.antecedentes[0].fecha_hasta, consultaData.id_consulta);
        }
    }
    res.status(200).end();
}
exports.historiaClinica = async (req, res) => {
    const dni = req.query.dni_paciente || "98765432A";
    console.log(dni);
    res.send(await consulta.getHistoriaClinica(dni));
}

exports.estadosDeDiagnosticos = async (req, res) => {
    res.json(await consulta.getEstadosDeDiagnosticos());
}