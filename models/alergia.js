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
    },
    save: async (alergia, importancia, fechaDesde, fechaHasta, consulta) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('INSERT INTO consultas_alergias (id_alergia_fk, id_consulta_fk, id_importancia_fk, fecha_desde, fecha_hasta) VALUES (?, ? ,?, ?, ?)',
                 [alergia, consulta, importancia, fechaDesde, fechaHasta]);
            connection.end();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    saveMultiple: async (alergias) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('INSERT INTO consultas_alergias (id_alergia_fk, id_consulta_fk, id_importancia_fk, fecha_desde, fecha_hasta) VALUES ?',
                alergias);
            connection.end();
            if (result.affectedRows = alergias.length) {
                return true;
            }else{
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
            const [result, fields] = await connection.execute(`
                SELECT 
                ca.id_consulta_alergia,
                ca.fecha_desde,
                ca.fecha_hasta,
                a.nomenclatura,
                a.id_alergia,
                i.descripcion AS importancia_descripcion,
                i.id_importancia
                FROM consultas_alergias ca 
                JOIN alergias a ON ca.id_alergia_fk = a.id_alergia
                JOIN importancias_de_alergias i ON ca.id_importancia_fk = i.id_importancia
                WHERE id_consulta_fk = ?`, [consulta]);
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
    delete: async (ids_consulta_alergia) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('DELETE FROM consultas_alergias WHERE id_consulta_alergia IN (?)', ids_consulta_alergia);
            connection.end();
            if (result.affectedRows === ids_consulta_alergia.length) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    update: async (idAlergia, idImportancia, fechaDesde, fechaHasta, consultaAlergiaId) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('UPDATE consultas_alergias SET id_alergia_fk = ?, id_importancia_fk = ?, fecha_desde = ?, fecha_hasta = ? WHERE id_consulta_alergia = ?',
                [idAlergia, idImportancia, fechaDesde, fechaHasta, consultaAlergiaId]);
            connection.end();
            if (result.affectedRows = 1) {
                return true;
            } else {
                return false;
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}