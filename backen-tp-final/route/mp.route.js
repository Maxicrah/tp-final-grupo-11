const express = require('express');
const router = express.Router();

const mpPagoCtrl = require('../controller/mp.pago.controller');


router.post('/', mpPagoCtrl.createPayment);
router.post('/notifications', mpPagoCtrl.manejarNotificacion);

module.exports = router;