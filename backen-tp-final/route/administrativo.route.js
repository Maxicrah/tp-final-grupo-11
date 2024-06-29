const express = require('express');
const router = express.Router();
const administrativoCtrl = require('../controller/administrativo.controller');
const authController = require('../controller/auth.controller');

router.get('/administrativos', authController.verifyToken, administrativoCtrl.getAllAdministrativos);
router.post('/administrativo', authController.verifyToken, administrativoCtrl.createAdministrativo);
router.get('/administrativo/:id', authController.verifyToken, administrativoCtrl.getAdministrativoById);
router.put('/administrativo/:id', authController.verifyToken, administrativoCtrl.updateAdministrativo);
router.delete('/administrativo/:id', authController.verifyToken, administrativoCtrl.deleteAdministrativo);

module.exports = router;