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
    },
    saveMultiple: async (diagnosticos) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('INSERT INTO diagnosticos (descripcion, id_estado_fk, id_consulta_fk) VALUES (?, ?, ?)', diagnosticos);
            connection.end();
            if (result.affectedRows = diagnosticos.length) {
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
            const [result, fields] = await connection.execute(`
                SELECT 
                d.*,
                e.descripcion AS estado 
                FROM diagnosticos d
                JOIN estados_de_diagnosticos e ON d.id_estado_fk = e.id_estado
                WHERE id_consulta_fk = ?`, 
                [consulta]);
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
    delete: async (ids_diagnostico) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('DELETE FROM diagnosticos WHERE id_diagnostico = ?', [ids_diagnostico]);
            connection.end();
            if (result.affectedRows = ids_diagnostico.length) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    update: async (descripcion, idEstado, idDiagnostico) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('UPDATE diagnosticos SET descripcion = ?, id_estado_fk = ? WHERE id_diagnostico = ?',
                 [descripcion, idEstado, idDiagnostico]);
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