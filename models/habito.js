const mysql = require('mysql2/promise');
const datosConexion = require('../conexionBD');

module.exports = {
    save: async (habito, fechaDesde, fechaHasta, consulta) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('INSERT INTO habitos (descripcion, fecha_desde, fecha_hasta, id_consulta_fk) VALUES (?, ?, ?, ?)', [habito, fechaDesde, fechaHasta, consulta]);
            connection.end();
            return result;
        } catch (error) {
            console.log(error);
            return {};
        }
    }
}