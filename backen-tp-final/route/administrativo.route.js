const express = require('express');
const router = express.Router();
const administrativoCtrl = require('../controller/administrativo.controller');
const verifyRole = require('../middleware/roleMiddleware');

router.get('/administrativos', verifyRole('administrador'), administrativoCtrl.getAllAdministrativos);
router.post('/', verifyRole('administrador'), administrativoCtrl.createAdministrativo);
router.get('/:id', verifyRole('administrador'), administrativoCtrl.getAdministrativoById);
router.put('/:id', verifyRole('administrador'), administrativoCtrl.updateAdministrativo);
router.delete('/:id', verifyRole('administrador'), administrativoCtrl.deleteAdministrativo);

module.exports = router;