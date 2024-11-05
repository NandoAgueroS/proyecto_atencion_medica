const mysql = require('mysql2/promise');
const datosConexion = require('../conexionBD');
module.exports = {
    save: async (descripcion, estado, consulta) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('INSERT INTO diagnosticos (descripcion, id_estado_fk, id_consulta_fk) VALUES (?, ?, ?)', [descripcion, estado, consulta]);
            connection.end();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}