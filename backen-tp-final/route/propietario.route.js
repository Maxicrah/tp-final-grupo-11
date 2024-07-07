const express = require('express');
const router = express.Router();
const propietarioCtrl = require('../controller/propietario.controller');
const verifyRole = require('../middleware/roleMiddleware');

// Rutas para propietarios
router.get('/propietarios', verifyRole("propietario"), propietarioCtrl.getAllPropietarios);
router.post('/', verifyRole("propietario"), propietarioCtrl.createPropietario);
router.get('/:id', verifyRole("propietario"), propietarioCtrl.getPropietarioById);
router.put('/:id', verifyRole("propietario"), propietarioCtrl.updateProietario);
router.delete('/:id', verifyRole("propietario"), propietarioCtrl.deletePropietario);

// Rutas para pagos
// router.get('/:id/pagos', propietarioCtrl.getPagos);
// router.post('/:id/pagos', propietarioCtrl.createPago);

module.exports = router;
