const express = require('express');
const router = express.Router();
const pagoCtrl = require('../controller/pago-controller');

// Rutas para pagos
router.get('/:id/pagos', pagoCtrl.getPagosByPropietario);
router.post('/:id/pagos', pagoCtrl.createPago);

// Ruta para obtener estadísticas de pagos
router.get('/estadisticas/pagos', pagoCtrl.getEstadisticasPagos);




module.exports = router;
