const turno = require('../models/turno');

exports.listar = async (req, res) => {
    const matricula = req.query.matricula || "M12345";
    const fecha = req.query.fecha || "2024-11-15"
    console.log(matricula, fecha);
    const turnos = await turno.get(matricula, fecha);
    turnos.forEach(turno => {
        turno.fecha = formatearFecha(turno.fecha);
    })
    // res.send(await turno.get(matricula, fecha));
    res.render('agenda/agenda', {turnos: turnos});
}

function formatearFecha(fecha) {
    const day = String(fecha.getDate()).padStart(2, '0');
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const year = fecha.getFullYear();
    return `${day}-${month}-${year}`;
}