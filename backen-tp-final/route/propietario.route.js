const express = require('express');
const router = express.Router();
const propietarioCtrl = require('../controller/propietario.controller');
const authCtrl = require('../controller/auth.controller');

// Rutas para propietarios
router.get('/propietarios', authCtrl.verifyToken, propietarioCtrl.getAllPropietarios);
router.post('propietario/', authCtrl.verifyToken, propietarioCtrl.createPropietario);
router.get('/propietario/:id', authCtrl.verifyToken, propietarioCtrl.getPropietarioById);
router.put('/propietario/:id', authCtrl.verifyToken, propietarioCtrl.updateProietario);
router.delete('/propietario/:id', authCtrl.verifyToken, propietarioCtrl.deletePropietario);

// Rutas para pagos
// router.get('/:id/pagos', propietarioCtrl.getPagos);
// router.post('/:id/pagos', propietarioCtrl.createPago);

module.exports = router;
