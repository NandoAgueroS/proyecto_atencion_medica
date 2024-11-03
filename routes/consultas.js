const express = require('express');
const router = express.Router();
const consulta = require('../controllers/consulta');
/* GET consultas listing. */
router.get('/iniciar/:id', consulta.iniciar);
router.post('/cargar', consulta.cargar);
router.get('/hce', consulta.historiaClinica);
module.exports = router;