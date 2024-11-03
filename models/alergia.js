const mysql = require('mysql2/promise');
const datosConexion = require('../conexionBD');
module.exports = {
    get: async () => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result, fields] = await connection.execute('SELECT * FROM alergias');
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