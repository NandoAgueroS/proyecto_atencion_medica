const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const pruebas = require('../controllers/pruebas');
router.post('/autenticar', login.autenticar);
// router.get('/pruebas', pruebas.probar);
router.get('/logout', login.logout)

module.exports = router;