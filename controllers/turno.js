const turno = require('../models/turno');
const medico = require('../models/medico');

exports.listar = async (req, res) => {
    // const fecha = req.query.fecha || "2024-11-15"
    let date = new Date();
    date = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const fecha = req.query.dia_agenda || date;
    const dniMedico = req.session.dni;
    const especialidades = await medico.getEspecialidades(dniMedico);
    const matricula = req.query.matricula || especialidades[0].matricula;
    console.log(req.body);
    especialidades.map(element => {
        if (element.matricula === matricula) {
            element.selected = '';
        }
    })
    const turnos = await turno.get(matricula, fecha);
    // console.log(matricula, fecha);
    // turnos.forEach(turno => {
    //     turno.fecha = formatearFecha(turno.fecha);
    // })
    console.log(especialidades)
    // res.send(await turno.get(matricula, fecha));
    res.render('agenda/agenda', {
        turnos: turnos, 
        especialidades: especialidades, 
        medico: {
            dni: req.session.dni, 
            nombre: req.session.nombre, 
            correo: req.session.user
        },
        date: fecha
    });
}

// function formatearFecha(fecha) {
//     const day = String(fecha.getDate()).padStart(2, '0');
//     const month = String(fecha.getMonth() + 1).padStart(2, '0');
//     const year = fecha.getFullYear();
//     return `${day}-${month}-${year}`;
// }