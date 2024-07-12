const express = require('express');
const router = express.Router();
const MpPagoService = require('../services/mp.pago.service');

const mpPagoCtrl = {};

mpPagoCtrl.createPayment = async (req, res) => {
    try {
        const payment = req.body;
        const newPayment = await MpPagoService.createPayment(payment);
        res.json({
            status: '1',
            msg: 'Pago creado correctamente',
            data: newPayment
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al crear el pago: ' + error.message
        });
    }
}

mpPagoCtrl.manejarNotificacion = async (req, res) => {
    try {
        const payment = req.body;
        if (payment.topic !== 'payment') {
            return res.json({
                status: '1',
                msg: 'Notificación manejada correctamente',
            });
        }
        const response = await MpPagoService.manejarNotificacionPago(payment.resource);
        res.json({
            status: '1',
            msg: 'Notificación manejada correctamente',
            data: response
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al manejar la notificación: ' + error.message
        });
    }
}

module.exports = mpPagoCtrl;
