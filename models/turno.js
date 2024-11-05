const mysql = require('mysql2/promise');
const datosConexion = require('../conexionBD')

module.exports = {
    get: async (matricula, fecha) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result, fields] = await connection.execute(
                `SELECT 
                turnos.*,
                e.descripcion AS estado,
                pacientes.nombre AS nombre_paciente
                FROM turnos
                JOIN pacientes ON turnos.dni_paciente_fk = pacientes.dni
                JOIN estados_de_turnos e ON turnos.id_estado_fk = e.id_estado
                WHERE id_agenda_fk = 
                    (SELECT id_agenda 
                    FROM agendas 
                    WHERE matricula_fk = ?) 
                    AND fecha = ?`,
                 [matricula, fecha]);
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
    },
    setAtendido: async (id_turno) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute(
                'UPDATE turnos SET id_estado_fk = 2 WHERE id_turno = ?',
                [id_turno]);
            connection.end();
            return result;
        } catch (error) {
            console.log(error);
            return {};
        }
    }
}