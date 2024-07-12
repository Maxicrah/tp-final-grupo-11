const express = require('express');
const router = express.Router();
const encargadoCtrl = require('../controller/encargado.controller');
const verifyRole = require('../middleware/roleMiddleware');

router.get('/encargados', verifyRole('encargado'), encargadoCtrl.getAllEncargados);
router.post('/', verifyRole('encargado'), encargadoCtrl.createEncargado);
router.get('/:id', verifyRole('encargado'), encargadoCtrl.getEncargadoById);
router.put('/:id', verifyRole('encargado'), encargadoCtrl.updateEncargado);
router.delete('/:id', verifyRole('encargado'), encargadoCtrl.deleteEncargado);

module.exports = router;