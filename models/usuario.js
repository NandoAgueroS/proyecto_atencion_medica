mysql = require('mysql2/promise');
const datosConexion = require('../conexionBD');
module.exports = {
    findByCorreo: async (correo) => {
        const connection = await mysql.createConnection(datosConexion);
        const [result] = await connection.execute(`
            SELECT 
            u.*,
            m.nombre,
            m.dni 
            FROM usuarios u
            JOIN medicos m ON u.correo = m.correo_fk
            WHERE correo = ?`, [correo]);
        connection.end();
        return result[0];
    }
}