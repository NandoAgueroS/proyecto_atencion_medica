const consulta = require('../models/consulta');
const alergia = require('../models/alergia');
const diagnostico = require('../models/diagnostico');
const habito = require('../models/habito');
const medicamento = require('../models/medicamento');
const antecedente = require('../models/antecedente');
const turno = require('../models/turno');
const medico = require('../models/medico');
const plantilla = require('../models/plantilla');
exports.iniciar = async (req, res) => {
    const idTurno = req.params.id;
    const alergias = await alergia.get();
    const importanciasDeAlergias = await consulta.getImportanciasDeAlergias(); 
    const estadosDeDiagonosticos = await consulta.getEstadosDeDiagnosticos();
    const resultado = await consulta.crear(req.params.id, req.query.dni_paciente);
    turno.setAtendido(idTurno);
    console.log(req.session);
    res.render('consulta/cargar_consulta', 
    {
        dni_paciente: req.query.dni_paciente,
        idTurno: idTurno, 
        alergias: alergias,
        estados_de_diagnosticos: estadosDeDiagonosticos,
        importancias_de_alergias: importanciasDeAlergias,
        iniciador: resultado,
        consultas: await traerHistoriaClinica(req.query.dni_paciente),
        medico: {dni: req.session.dni, plantillas: await plantilla.findByMedico(req.session.dni)}
    });
}
exports.cargar = async (req, res) => {
    const consultaData = req.body;
    console.log(consultaData);
    // await turno.setAtendido(consultaData.id_turno);
    if(consultaData.id_consulta){
        const consultaSaved = await consulta.save(consultaData.id_consulta, consultaData.evolucion.descripcion);
        if(consultaData.alergias){
            // const alergiaSaved = 
            consultaData.alergias.forEach(async element => {
                await alergia.save(element.id_alergia, element.id_importancia, element.fecha_desde, element.fecha_hasta, consultaData.id_consulta);
            });
        }
        if(consultaData.diagnosticos){
            consultaData.diagnosticos.forEach(async element => {
                await diagnostico.save(element.descripcion,element.id_estado, consultaData.id_consulta);
            })
        }
        if(consultaData.habitos){
            consultaData.habitos.forEach(async element => {
                await habito.save(element.descripcion, element.fecha_desde, element.fecha_hasta, consultaData.id_consulta);
            })
        }
        if(consultaData.medicamentos){
            consultaData.medicamentos.forEach(async element => {
                await medicamento.save(element.descripcion, consultaData.id_consulta);
            })
        }
        if(consultaData.antecedentes){
            consultaData.antecedentes.forEach(async element => {
                await antecedente.save(element.descripcion, element.fecha_desde, element.fecha_hasta, consultaData.id_consulta);
            })
        }
    }
    // res.status(200).end();
    res.redirect('/turnos');
}
exports.editar = async (req, res) => {
    const ultimaConsulta = await consulta.getUltimaConsulta(req.query.dni_paciente, req.session.dni);
    // console.log(ultimaConsulta);
    const consulta_alergias = await alergia.findByConsulta(ultimaConsulta.id_consulta);
    const diagnosticos = await diagnostico.findByConsulta(ultimaConsulta.id_consulta);
    const medicamentos = await medicamento.findByConsulta(ultimaConsulta.id_consulta);
    const habitos = await habito.findByConsulta(ultimaConsulta.id_consulta);
    const antecedentes = await antecedente.findByConsulta(ultimaConsulta.id_consulta);
    const alergias = await alergia.get();
    const importanciasDeAlergias = await consulta.getImportanciasDeAlergias(); 
    const estadosDeDiagonosticos = await consulta.getEstadosDeDiagnosticos();
    console.log(estadosDeDiagonosticos)
    res.render('consulta/editar_consulta',
    {consulta:
        {
            id_consulta: ultimaConsulta.id_consulta,
            evolucion: ultimaConsulta.evolucion,
            motivo: ultimaConsulta.motivo,
            fecha: formatearFechaYHora(ultimaConsulta.fecha),
            alergias: consulta_alergias,
            diagnosticos: diagnosticos,
            medicamentos: medicamentos,
            habitos: habitos,
            antecedentes: antecedentes,
        },
        adicional:{
            alergias: alergias,
            estados_de_diagnosticos: estadosDeDiagonosticos,
            importancias_de_alergias: importanciasDeAlergias,
        }
    })
}

exports.historiaClinica = async (req, res) => {
    const dni = req.query.dni_paciente;
    console.log(dni);
    // res.send(await consulta.getHistoriaClinica(dni));
    const alergias = await alergia.get();
    const importanciasDeAlergias = await consulta.getImportanciasDeAlergias(); 
    const estadosDeDiagonosticos = await consulta.getEstadosDeDiagnosticos();
    const hce = await traerHistoriaClinica(dni);
    console.log(await hce);
    // res.json(hce);
    res.render('consulta/hce',
         {
            dni_paciente: dni,
            consultas: hce, 
            medico: {
                dni: req.session.dni, 
                plantillas: await plantilla.findByMedico(req.session.dni)},
            adicional:{
                alergias: alergias,
                estados_de_diagnosticos: estadosDeDiagonosticos,
                importancias_de_alergias: importanciasDeAlergias,
            }
            });
    }
const traerHistoriaClinica = async (dni_paciente) => {
    const dni = dni_paciente;
    console.log(dni);
    // res.send(await consulta.getHistoriaClinica(dni));
    const hce = [];
    const consultasDelPaciente = await consulta.findByPaciente(dni);
    // consultasDelPaciente.reverse();
    // console.log(consultasDelPaciente);
    for await (const element of consultasDelPaciente){
        console.log(element);
        try {
            element.fecha = formatearFechaYHora(element.fecha);
        } catch (error) {
            console.log(error);
        }
        hce.push({
            id_consulta: element.id_consulta,
            fecha_consulta: element.fecha,
            evolucion: element.evolucion,
            motivo: element.motivo,
            turno: await turno.findById(element.id_turno_fk),
            diagnosticos: await diagnostico.findByConsulta(element.id_consulta),
            alergias: await alergia.findByConsulta(element.id_consulta),
            antecedentes: await antecedente.findByConsulta(element.id_consulta),
            habitos: await habito.findByConsulta(element.id_consulta),
            medicamentos: await medicamento.findByConsulta(element.id_consulta),
            medico: await medico.findByIdTurno(element.id_turno_fk)
        })
    }
    console.log(await hce);
    // res.json(hce);
    // res.render('consulta/hce', {consultas: hce});
    return hce;
}

exports.estadosDeDiagnosticos = async (req, res) => {
    res.json(await consulta.getEstadosDeDiagnosticos());
}

function formatearFechaYHora(fecha) {
    const day = String(fecha.getDate()).padStart(2, '0');
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const year = fecha.getFullYear();
    const hour = String(fecha.getHours()).padStart(2, '0');
    const minute = String(fecha.getMinutes()).padStart(2, '0');
    const second = String(fecha.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}