const mysql = require('mysql2/promise');
const datosConexion = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'atencion_medica_prueba'
}

module.exports = {
    get: async (dni_paciente) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result, fields] = await connection.execute('SELECT * FROM consultas WHERE dni_paciente_fk = ?',[dni_paciente]);
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
    getHistoriaClinica: async (dni_paciente) => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result, fields] = 
            await connection.execute(
                `SELECT 
                c.id_consulta,
                c.fecha,
                c.motivo,
                e.id_evolucion,
                e.descripcion AS desc_evolucion,

                d.id_diagnostico,
                d.descripcion AS desc_diagnostico,
                d.id_estado_fk,

                an.id_antecedente,
                an.descripcion AS desc_antecedente,
                an.fecha_desde AS fecha_desde_antecedente,
                an.fecha_hasta AS fecha_hasta_antecedente,

                h.id_habito,
                h.descripcion AS desc_habito,
                h.fecha_desde AS fecha_desde_habito,
                h.fecha_hasta AS fecha_hasta_habito,
                
                al.id_alergia_fk,
                al.id_importancia_fk,
                al.fecha_desde AS fecha_desde_alergia,
                al.fecha_hasta AS fecha_hasta_alergia,

                m.id_medicamento,
                m.descripcion AS desc_medicamento
                FROM consultas c
                LEFT JOIN antecedentes an ON c.id_consulta = an.id_consulta_fk
                LEFT JOIN diagnosticos d ON c.id_consulta = d.id_consulta_fk
                LEFT JOIN habitos h ON c.id_consulta = h.id_consulta_fk
                LEFT JOIN consultas_alergias al ON c.id_consulta = al.id_consulta_fk
                LEFT JOIN medicamentos m ON c.id_consulta = m.id_consulta_fk
                JOIN evoluciones e ON c.id_evolucion_fk = e.id_evolucion
                WHERE dni_paciente_fk = ?`
                ,[dni_paciente]);
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
    getEstadosDeDiagnosticos: async () => {
        try {
            const connection = await mysql.createConnection(datosConexion);
            const [result, fields] = await connection.execute('SELECT * FROM estados_de_diagnosticos');
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
    }
}