const PagoService = require('./pagoService');
const axios = require('axios');
const hostBack = 'http://localhost:3000';
const hostFront = 'http://localhost:4200';

class PaymentsService {
    async createPayment(payment) {
        try {
            // Validar los datos del pago
            if (!payment.usuario || !payment.unit_price || !payment.title || !payment.tipo || !payment.alquiler) {
                throw new Error("Datos de pago incompletos");
            }

            // Registrar el pago con estado "pending" sin el ID de preferencia
            const pago = {
                usuario: payment.usuario,
                montoPago: payment.unit_price,
                tipo: payment.tipo,
                status: payment.tipo === 'Mercado Pago' ? 'pending' : 'success',
                fechaPago: new Date(), // Agregar la fecha del pago actual
                descripcion: payment.descripcion || `Pago de ${payment.title} por ${payment.unit_price}`, // Agregar descripción
                metodoPago: payment.tipo, // Asumir que el tipo es el método de pago
                alquiler: payment.alquiler // Asignar el alquiler
            };

            const newPago = await PagoService.registrarPago(pago);
            console.log("Pago registrado:", newPago);

            if (payment.tipo !== 'Mercado Pago') {
                return { ...newPago, urlPago: null };
            }

            const url = 'https://api.mercadopago.com/checkout/preferences';

            const body = {
                items: [
                    {
                        title: payment.title,
                        unit_price: payment.unit_price,
                        quantity: 1,
                        description: payment.descripcion || `Pago de ${payment.title} por ${payment.unit_price}`
                    }
                ],
                back_urls: {
                    success: `${hostFront}/pago/success`,
                    failure: `${hostFront}/pago/failure`,
                    pending: `${hostFront}/pago/pending`
                },
                notification_url: `${hostBack}/api/payments/notifications`,
                external_reference: newPago._id,
                payment_methods: {
                    installments: 1
                }
            };

            const paymentResponse = await axios.post(url, body, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
                }
            });

            console.log("Respuesta de MercadoPago:", paymentResponse.data);

            // Actualizar el registro del pago con el ID de preferencia de MercadoPago
            await PagoService.actualizarPagoConPreference(newPago._id, paymentResponse.data.id);

            // Devolver solo la URL de pago de MercadoPago
            return { urlPago: paymentResponse.data.init_point };

        } catch (error) {
            console.error("Error al crear el pago: ", error);
            throw new Error("Error al crear el pago: " + error.message);
        }
    }

    async manejarNotificacionPago(resource) {
        try {
            const link = resource;
            const partes = link.split("/");
            const id = partes[partes.length - 1];
            const url = "https://api.mercadolibre.com/collections/notifications/" + id;
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
                }
            });

            const externalReference = response.data.collection.external_reference;
            const paymentStatus = response.data.collection.status;
            console.log(`Actualizando estado de pago: ${externalReference} ${paymentStatus}`);
            if (paymentStatus === 'approved') {
                await PagoService.actualizarEstadoPago(externalReference, 'success');
            } else if (paymentStatus === 'pending') {
                await PagoService.actualizarEstadoPago(externalReference, 'pending');
            } else {
                await PagoService.actualizarEstadoPago(externalReference, 'failure');
            }

            return response.data;

        } catch (error) {
            console.error("Error al manejar la notificación del pago: ", error);
            throw new Error("Error al manejar la notificación del pago: " + error.message);
        }
    }
}

module.exports = new PaymentsService();
