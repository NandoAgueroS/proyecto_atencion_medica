const paciente = require('../controllers/paciente');
const express = require('express');
const router = express.Router();

/* GET pacientes listing. */
router.get('/', paciente.listar);
module.exports = router;