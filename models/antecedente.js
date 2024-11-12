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
    },
    saveMultiple: async (antecedentes) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('INSERT INTO antecedentes (descripcion, fecha_desde, fecha_hasta, id_consulta_fk) VALUES (?, ?, ?, ?)', antecedentes);
            connection.end();
            if (result.affectedRows = antecedentes.length) {
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
            const [result, fields] = await connection.execute('SELECT * FROM antecedentes WHERE id_consulta_fk = ?', [consulta]);
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
    delete: async (ids_antecedente) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('DELETE FROM antecedentes WHERE id_antecedente = ?', [ids_antecedente]);
            connection.end();
            if (result.affectedRows = ids_antecedente.length) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    update: async (descripcion, fechaDesde, fechaHasta, idAntecedente) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('UPDATE antecedentes SET descripcion = ?, fecha_desde = ?, fecha_hasta = ? WHERE id_antecedente = ?', 
            [descripcion, fechaDesde, fechaHasta, idAntecedente]);
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
};