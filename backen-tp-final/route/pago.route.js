const express = require('express');
const router = express.Router();
const pagoCtrl = require('../controller/pago-controller');

// Rutas para pagos
router.get('/:id/pagos', pagoCtrl.getPagosByPropietario);
router.post('/:id/pagos', pagoCtrl.createPago);
router.get('/pago-alquiler/:id',pagoCtrl.getObtenerPagosPorAlquiler);
module.exports = router;
