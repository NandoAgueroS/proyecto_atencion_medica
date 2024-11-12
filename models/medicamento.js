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
    },
    saveMultiple: async (medicamentos) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('INSERT INTO medicamentos (descripcion, id_consulta_fk) VALUES (?, ?)', medicamentos);
            connection.end();
            if (result.affectedRows = medicamentos.length) {
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
            const [result, fields] = await connection.execute('SELECT * FROM medicamentos WHERE id_consulta_fk = ?', [consulta]);
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
    delete: async (ids_medicamento) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('DELETE FROM medicamentos WHERE id_medicamento = ?', [ids_medicamento]);
            connection.end();
            if (result.affectedRows = ids_medicamento.length) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    update: async (descripcion, idMedicamento) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute('UPDATE medicamentos SET descripcion = ? WHERE id_medicamento = ?', 
                [descripcion, idMedicamento]
            );
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