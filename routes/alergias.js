const express = require('express');
const router = express.Router();
const alergia = require('../controllers/alergia');
/* GET alergias listing. */
router.get('/', alergia.listar);
module.exports = router;