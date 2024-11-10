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
                p.nombre AS nombre_paciente,
                p.apellido AS apellido_paciente,
                p.dni AS dni_paciente
                FROM turnos
                JOIN pacientes p ON turnos.dni_paciente_fk = p.dni
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
    findById: async (id) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result, fields] = await connection.execute(
                'SELECT * FROM turnos WHERE id_turno = ?',
                [id]);
            connection.end();
            if(result.length = 1){
                return result[0];
            }
            else{
                return {};
            }
        } catch (error) {
            console.log(error);
            return {};
        }
    },
    setAtendido: async (id_turno) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute(
                'UPDATE turnos SET id_estado_fk = 3 WHERE id_turno = ?',
                [id_turno]);
            connection.end();
            return result;
        } catch (error) {
            console.log(error);
            return {};
        }
    }
}