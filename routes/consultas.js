const express = require('express');
const router = express.Router();
const consulta = require('../controllers/consulta');
/* GET consultas listing. */
router.get('/', consulta.listar);
router.get('/hce', consulta.historiaClinica);
module.exports = router;