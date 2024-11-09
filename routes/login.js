const express = require('express');
const router = express.Router();
const login = require('../controllers/login');

router.post('/autenticar', login.autenticar);

router.get('/logout', login.logout)

module.exports = router;