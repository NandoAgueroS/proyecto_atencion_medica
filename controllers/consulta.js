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
    console.log(ultimaConsulta);
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
exports.actualizar = async (req, res) => {
    console.log(req.body);
    const eliminar = req.body.eliminar;
    if(eliminar.alergias.length > 0) {
        const alergiasEliminadas = await alergia.delete(eliminar.alergias);
    }
    if(eliminar.alergias.length > 0) {
        const diagnosticosEliminados = await diagnostico.delete(eliminar.diagnosticos);
    }
    if(eliminar.medicamentos.length > 0) {
    const medicamentosEliminados = await medicamento.delete(eliminar.medicamentos);
    }
    if(eliminar.habitos.length > 0) {
        const habitosEliminados = await habito.delete(eliminar.habitos);
    }
    if(eliminar.antecedentes.length > 0) {
        const antecedentesEliminados = await antecedente.delete(eliminar.antecedentes);
    }
    const insertar = req.body.insertar;
    if(insertar.alergias.length > 0) {
        const alergiasInsertadas = await alergia.saveMultiple(insertar.alergias);
    }
    if(insertar.diagnosticos.length > 0) {
        const diagnosticosInsertados = await diagnostico.saveMultiple(insertar.diagnosticos);
    }
    if(insertar.medicamentos.length > 0) {
        const medicamentosInsertados = await medicamento.saveMultiple(insertar.medicamentos);
    }
    if(insertar.habitos.length > 0) {
        const habitosInsertados = await habito.saveMultiple(insertar.habitos);
    }
    if(insertar.antecedentes.length > 0) {
        const antecedentesInsertados = await antecedente.saveMultiple(insertar.antecedentes);
    }
    
    const actualizar = req.body.actualizar;
    // const alergiasActualizadas = await alergia.update(actualizar.alergias);
    // const diagnosticosActualizados = await diagnostico.update(actualizar.diagnosticos);
    // const medicamentosActualizados = await medicamento.update(actualizar.medicamentos);
    // const habitosActualizados = await habito.update(actualizar.habitos);
    // const antecedentesActualizados = await antecedente.update(actualizar.antecedentes);
    console.log("---------",actualizar.habitos,"-------------");
    if (actualizar.alergias.length > 0) {
        for (const element of actualizar.alergias) {
            await alergia.update(element.id_alergia, element.id_importancia, element.descripcion, element.fecha_desde, element.fecha_hasta, element.id);
        }
    }
    if (actualizar.antecedentes.length > 0) {
        for (const element of actualizar.antecedentes) {
            await antecedente.update(element.descripcion, element.fecha_desde, element.fecha_hasta, element.id);
        }
    }
    if (actualizar.habitos.length > 0) {
        for (const element of actualizar.habitos) {
            await habito.update(element.descripcion, element.fecha_desde, element.fecha_hasta, element.id);
        }
    }
    if (actualizar.diagnosticos.length > 0) {
        for (const element of actualizar.diagnosticos) {
            await diagnostico.update(element.descripcion, element.id_estado, element.id);
        }
    }
    if (actualizar.medicamentos.length > 0) {
        for (const element of actualizar.medicamentos) {
            await medicamento.update(element.descripcion, element.id);
        }
    }
    console.log("datos recibidos:");
    console.log(eliminar, actualizar);
    // console.log("actualizaciones:",alergiasActualizadas, diagnosticosActualizados, medicamentosActualizados, habitosActualizados, antecedentesActualizados);
    // console.log("eliminaciones:",alergiasEliminadas, diagnosticosEliminados, medicamentosEliminados, habitosEliminados, antecedentesEliminados);
    // console.log("insersiones:",alergiasInsertadas, diagnosticosInsertados, medicamentosInsertados, habitosInsertados, antecedentesInsertados);
    res.status(200).end();
}
exports.evolucion = async (req, res) => {
    const idConsulta = req.params.id;
    const evolucion = await consulta.getEvolucion(idConsulta);
    console.log(evolucion);
    res.json(evolucion);
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
// function formatearFecha(fecha) {
//     const day = String(fecha.getDate()).padStart(2, '0');
//     const month = String(fecha.getMonth() + 1).padStart(2, '0');
//     const year = fecha.getFullYear();
//     return `${day}-${month}-${year}`;
// }