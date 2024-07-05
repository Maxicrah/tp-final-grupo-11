const express = require('express');
const router = express.Router();
const encargadoCtrl = require('../controller/encargado.controller');
const verifyRole = require('../middleware/roleMiddleware');

router.get('/encargados', verifyRole('encargado'), encargadoCtrl.getAllEncargados);
router.post('/', verifyRole('administrador'), encargadoCtrl.createEncargado);
router.get('/:id', verifyRole('administrador'), encargadoCtrl.getEncargadoById);
router.put('/:id', verifyRole('administrador'), encargadoCtrl.updateEncargado);
router.delete('/:id', verifyRole('administrador'), encargadoCtrl.deleteEncargado);

module.exports = router;