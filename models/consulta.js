const mysql = require('mysql2/promise');
const datosConexion = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'atencion_medica_prueba'
}

module.exports = {
    get: async (dni_paciente) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result, fields] = await connection.execute('SELECT * FROM consultas WHERE dni_paciente_fk = ?',[dni_paciente]);
            connection.end();
            if (result.length > 0) {
                return result;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}