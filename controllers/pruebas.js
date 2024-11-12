const mysql = require('mysql2/promise');
const datosConexion = require('../conexionBD');

exports.probar = async (req, res) => {
    console.log('probando');
    const alergias = 
        [
           1, 2, '2024-01-01','2024-01-02', 220
]
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result] = await connection.execute(
                'INSERT INTO consultas_alergias (id_alergia_fk, id_importancia_fk, fecha_desde, fecha_hasta, id_consulta_fk) VALUES (?, ?, ?, ?, ?) ',
                alergias);
            connection.end();
            res.status(200).end();
            if (result.affectedRows = alergias.length) {
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            res.status(200).end();
            return false;
        }
    }