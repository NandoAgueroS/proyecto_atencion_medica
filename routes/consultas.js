const express = require('express');
const router = express.Router();
const consulta = require('../controllers/consulta');
/* GET consultas listing. */
router.get('/iniciar/:id', consulta.iniciar);
router.post('/cargar', consulta.cargar);
router.get('/editar', consulta.editar);
router.get('/hce', consulta.historiaClinica);
router.get('/estados_de_diagnosticos', consulta.estadosDeDiagnosticos);
module.exports = router;