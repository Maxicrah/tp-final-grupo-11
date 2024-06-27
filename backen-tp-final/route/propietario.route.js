const express = require('express');
const router = express.Router();
const propietarioCtrl = require('../controller/propietario-controller');

// Rutas para propietarios
router.get('/', propietarioCtrl.getPropietarios);
router.post('/', propietarioCtrl.createPropietario);
router.get('/:id', propietarioCtrl.getPropietario);
router.put('/:id', propietarioCtrl.editPropietario);
router.delete('/:id', propietarioCtrl.deletePropietario);

// Rutas para pagos
// router.get('/:id/pagos', propietarioCtrl.getPagos);
// router.post('/:id/pagos', propietarioCtrl.createPago);

module.exports = router;
