const express = require('express');
const router = express.Router();
const medico = require('../controllers/medico');
/* GET medicos listing. */
router.get('/', medico.listar);
module.exports = router;