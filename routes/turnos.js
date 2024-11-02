const express = require('express');
const router = express.Router();
const turnos = require('../controllers/turno');
/* GET consultas listing. */
router.get('/', turnos.listar);
module.exports = router;