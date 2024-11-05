const mysql = require('mysql2/promise');
const datosConexion = require('../conexionBD');
module.exports = {
    get: async (id_consulta) => {
        const connection = await mysql.createConnection(datosConexion);
        const [result] = await connection.execute('SELECT * FROM evoluciones WHERE id_consulta_fk = ?', [id_consulta]);
        connection.end();
        return result;
    },
    update: async (descripcion, id_consulta) => {
        const connection = await mysql.createConnection(datosConexion);
        const [result] = await connection.execute('UPDATE evoluciones SET descripcion = ? WHERE id_evolucion = ?', [descripcion, id_consulta]);
        connection.end();
        return result.insertId;
    },
    exists: async (id_evolucion) => {
        console.log(id_evolucion);
        try {
            
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('SELECT COUNT(*) as cantidad FROM evoluciones WHERE id_evolucion = ?', [id_evolucion]);
            connection.end();
            return result[0].cantidad;
        } catch (error) {
            console.log(error);
        }
    }
}