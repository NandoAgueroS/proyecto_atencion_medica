const express = require('express');
const router = express.Router();
const plantilla = require('../controllers/plantilla');
/* GET medicos listing. */
router.get('/agregar', plantilla.agregar);
router.get('/', plantilla.listar);
router.post('/cargar', plantilla.nueva);
router.get('/eliminar/:id', plantilla.eliminar);
module.exports = router;