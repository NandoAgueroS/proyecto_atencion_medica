const mysql = require('mysql2/promise');
const datosConexion = require('../conexionBD');
module.exports = {
    findByMedico: async (medico) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('SELECT * FROM plantillas WHERE dni_medico_fk = ?', [medico]);
            if (result.length > 0) {
                return result;
            }else{
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    save: async (dni, nombre, descripcion, plantilla) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('INSERT INTO plantillas (dni_medico_fk, nombre, descripcion, plantilla) VALUES (?, ?, ?, ?)', [dni, nombre, descripcion, plantilla]);
            connection.end();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    delete: async (id) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('DELETE FROM plantillas WHERE id_plantilla = ?', [id]);
            connection.end();
            if (result.affectedRows === 1) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
}}