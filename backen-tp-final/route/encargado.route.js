const express = require('express');
const router = express.Router();
const encargadoCtrl = require('../controller/encargado.controller');
const authController = require('../controller/auth.controller');

router.get('/encargados', authController.verifyToken, encargadoCtrl.getAllEncargados);
router.post('/encargados', authController.verifyToken, encargadoCtrl.createEncargado);
router.get('/encargados/:id', authController.verifyToken, encargadoCtrl.getEncargadoById);
router.put('/encargados/:id', authController.verifyToken, encargadoCtrl.updateEncargado);
router.delete('/encargados/:id', authController.verifyToken, encargadoCtrl.deleteEncargado);

module.exports = router;