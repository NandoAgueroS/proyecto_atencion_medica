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
    },
    saveMultiple: async (habitos) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('INSERT INTO habitos (descripcion, fecha_desde, fecha_hasta, id_consulta_fk) VALUES ?', habitos);
            connection.end();
            if (result.affectedRows = habitos.length) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    findByConsulta: async (consulta) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result, fields] = await connection.execute('SELECT * FROM habitos WHERE id_consulta_fk = ?', [consulta]);
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
    },
    delete: async (ids_habito) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('DELETE FROM habitos WHERE id_habito = ?', [ids_habito]);
            connection.end();
            if (result.affectedRows = ids_habito.length) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    update: async (descripcion = null, fechaDesde = null, fechaHasta = null, id_habito) => {
        // console.log(habitos);
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('UPDATE habitos SET descripcion = ?, fecha_desde = ?, fecha_hasta = ? WHERE id_habito = ?', 
                [descripcion, fechaDesde, fechaHasta, id_habito]);
            connection.end();
            if (result.affectedRows = 1) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}