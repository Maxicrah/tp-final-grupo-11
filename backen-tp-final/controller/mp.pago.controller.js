const express = require('express');
const router = express.Router();
const PaymentsService = require('../services/mp.pago.service');

const mpPagoCtrl = {};

mpPagoCtrl.createPayment = async (req, res) => {
    try {
        const payment = req.body;
        const newPayment = await PaymentsService.createPayment(payment);
        res.json({
            status: '1',
            msg: 'Pago creado correctamente',
            data: {
                urlPago: newPayment.urlPago // Esto debe ser una cadena
            }
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al crear el pago: ' + error.message
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
        const response = await PaymentsService.manejarNotificacionPago(payment.resource);
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

mpPagoCtrl.getEstadisticasPagos = async (req, res) => {
    try {
        const estadisticas = await PaymentsService.getEstadisticasPagos();
        res.json({
            status: '1',
            msg: 'Estadísticas obtenidas correctamente',
            data: estadisticas
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al obtener las estadísticas: ' + error.message
        });
    }
}

mpPagoCtrl.getPagosPorMes = async (req, res) => {
    try {
        const pagosPorMes = await PaymentsService.getPagosPorMes();
        res.json(pagosPorMes);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error procesando operación.'
        });
    }
};

mpPagoCtrl.getPagosPorLocal = async (req, res) => {
    try {
        const pagosPorLocal = await PaymentsService.getPagosPorLocal();
        res.json(pagosPorLocal);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error procesando operación.'
        });
    }
};

mpPagoCtrl.getTotalPagos = async (req, res) => {
    try {
        const totalPagos = await PaymentsService.getTotalPagos();
        res.json(totalPagos);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error procesando operación.'
        });
    }
};

module.exports = mpPagoCtrl;
