const mysql = require('mysql2/promise');
const datosConexion = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'atencion_medica_prueba'
}

module.exports = {
    findByDni: async (dni) =>{
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result, fields] = await connection.execute('SELECT * FROM medicos m JOIN medicos_especialidades e ON m.dni = e.dni_medico_fk WHERE dni = ? ', [dni]);
            connection.end();
            if(result.length > 0){
                return result[0];
            }
            else{
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    findByIdTurno: async (idTurno) =>{
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result, fields] = await connection.execute(`
                SELECT m.* 
                FROM medicos m
                JOIN medicos_especialidades e ON m.dni = e.dni_medico_fk
                JOIN agendas a ON e.matricula = a.matricula_fk
                JOIN turnos t ON a.id_agenda = t.id_agenda_fk
                WHERE t.id_turno = ?
                `, [idTurno]);
            connection.end();
            if(result.length > 0){
                return result[0];
            }
            else{
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    ,
    get: async () =>{
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result, fields] = await connection.execute(
                'SELECT m.*, me.matricula, e.id_especialidad, e.descripcion AS especialidad FROM medicos m JOIN medicos_especialidades me ON m.dni = me.dni_medico_fk JOIN especialidades e ON me.id_especialidad_fk = e.id_especialidad');
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
    getEspecialidades: async (dniMedico) =>{
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result, fields] = await connection.execute(
                'SELECT e.*, me.matricula FROM especialidades e JOIN medicos_especialidades me ON e.id_especialidad = me.id_especialidad_fk WHERE me.dni_medico_fk = ? ', [dniMedico]);
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