const mysql = require('mysql2/promise');
const datosConexion = require('../conexionBD');
module.exports = {
    save: async (antecedente, fechaDesde, fechaHasta, consulta) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('INSERT INTO antecedentes (descripcion, fecha_desde, fecha_hasta, id_consulta_fk) VALUES (?, ?, ?, ?)', [antecedente, fechaDesde, fechaHasta, consulta]);
            connection.end();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}