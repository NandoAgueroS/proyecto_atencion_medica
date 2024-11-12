const mysql = require('mysql2/promise')
const datosConexion = require('../conexionBD');
module.exports = {
    getPacientesDelMedico: async (dniMedico) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result, fields] = await connection.execute(`
                SELECT DISTINCT p.*
                FROM pacientes p
                JOIN turnos t ON p.dni = t.dni_paciente_fk
                JOIN agendas a ON a.id_agenda = t.id_agenda_fk
                JOIN medicos_especialidades me ON me.matricula = a.matricula_fk
                WHERE me.dni_medico_fk = ?
                `, [dniMedico]);
            connection.end();
            if(result.length > 0){
                return result;
            }
            else{
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}