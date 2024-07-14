const Pago = require('../model/pago');
const Local = require('../model/local');
const Alquiler = require('../model/alquiler');
const axios = require('axios');
const pagoService = require('../services/pagoService');

const pagoCtrl = {};

// Ver pagos realizados por un propietario
pagoCtrl.getPagosByPropietario = async (req, res) => {
    try {
        const propietarioId = req.params.id;
        const alquileres = await Alquiler.find({ propietario: propietarioId }).populate('pagoAlquiler');
        const pagos = alquileres.flatMap(alquiler => alquiler.pagoAlquiler);
        res.json(pagos);
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error procesando operación.'
        });
    }
};

// Realizar un pago mensual de alquiler
pagoCtrl.createPago = async (req, res) => {
    try {
        const propietarioId = req.params.id;
        const { localId, metodoPago, descripcion, total } = req.body;
        const fechaPago = new Date();

        // Crear un nuevo pago
        const pago = new Pago({ fechaPago, total, descripcion, metodoPago, pagado: false });

        // Buscar alquiler existente o crear uno nuevo
        let alquiler = await Alquiler.findOne({ propietario: propietarioId, local: localId });

        if (!alquiler) {
            const local = await Local.findById(localId);
            alquiler = new Alquiler({
                propietario: propietarioId,
                local: localId,
                pagoAlquiler: [pago],
                plazoMes: 1,
                fechaAlquiler: new Date(),
                costoAlquiler: local.costoMes
            });
        } else {
            alquiler.pagoAlquiler.push(pago);
        }

        await alquiler.save();
        await pago.save();

        // Crear una preferencia de pago en Mercado Pago
        const preference = {
            items: [{
                title: descripcion,
                unit_price: parseFloat(total),
                quantity: 1,
            }],
            payment_methods: {
                excluded_payment_types: [
                    { id: 'ticket' }
                ],
                installments: 12  // Máximo de cuotas
            },
            back_urls: {
                success: 'http://www.your-site.com/success',
                failure: 'http://www.your-site.com/failure',
                pending: 'http://www.your-site.com/pending'
            },
            auto_return: 'approved'
        };

        const response = await axios.post('https://api.mercadopago.com/checkout/preferences', preference, {
            headers: {
                'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
                'Content-Type': 'application/json'
            }
        });

        const initPoint = response.data.init_point;

        // Actualizar el pago con el ID de preferencia
        await pagoService.actualizarPagoConPreference(pago._id, response.data.id);

        res.status(201).json({
            alquiler,
            initPoint  // URL para iniciar el pago en Mercado Pago
        });
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error procesando operación.',
            error: error.message
        });
    }
};

pagoCtrl.getEstadisticasPagos = async (req, res) => {
    try {
        // Pagos por mes
        const pagosPorMes = await Pago.aggregate([
            {
                $group: {
                    _id: { $month: "$fechaPago" },
                    totalPagos: { $sum: "$monto" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // Pagos por local
        const pagosPorLocal = await Pago.aggregate([
            {
                $group: {
                    _id: "$local",
                    totalPagos: { $sum: "$monto" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // Total de pagos
        const totalPagos = await Pago.aggregate([
            {
                $group: {
                    _id: null,
                    totalPagos: { $sum: "$monto" }
                }
            }
        ]);

        res.json({ pagosPorMes, pagosPorLocal, totalPagos });
    } catch (error) {
        res.status(500).json({
            status: '0',
            msg: 'Error procesando operación.'
        });
    }
};

module.exports = pagoCtrl;
