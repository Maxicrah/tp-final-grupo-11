const express = require('express');
const router = express.Router();
const administrativoCtrl = require('../controller/administrativo.controller');
const authController = require('../controller/auth.controller');

router.get('/administrativos', authController.verifyToken, administrativoCtrl.getAllAdministrativos);
router.post('/', authController.verifyToken, administrativoCtrl.createAdministrativo);
router.get('/:id', authController.verifyToken, administrativoCtrl.getAdministrativoById);
router.put('/:id', authController.verifyToken, administrativoCtrl.updateAdministrativo);
router.delete('/:id', authController.verifyToken, administrativoCtrl.deleteAdministrativo);

module.exports = router;