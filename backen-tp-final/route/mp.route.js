const express = require('express');
const router = express.Router();

const mpPagoCtrl = require('../controller/mp.pago.controller');


router.post('/', mpPagoCtrl.createPayment);
router.post('/notifications', mpPagoCtrl.manejarNotificacion);

router.get('/estadisticas/pagos', mpPagoCtrl.getEstadisticasPagos);
router.get('/estadisticas/pagos/mes', mpPagoCtrl.getPagosPorMes);
router.get('/estadisticas/pagos/local', mpPagoCtrl.getPagosPorLocal);
router.get('/estadisticas/pagos/total', mpPagoCtrl.getTotalPagos);

module.exports = router;