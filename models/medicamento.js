const mysql = require('mysql2/promise');
const datosConexion = require('../conexionBD');
module.exports = {
    save: async (descripcion, consulta) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('INSERT INTO medicamentos (descripcion, id_consulta_fk) VALUES (?, ?)', [descripcion, consulta]);
            connection.end();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}