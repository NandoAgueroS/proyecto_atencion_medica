const express = require('express');
const router = express.Router();
const plantilla = require('../controllers/plantilla');
/* GET medicos listing. */
router.get('/', plantilla.listar);
router.post('/cargar', plantilla.nueva);
module.exports = router;