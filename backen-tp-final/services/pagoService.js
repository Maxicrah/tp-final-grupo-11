const Pago = require('../model/pago');

class PagoService {
    async registrarPago(pagoData) {
        try {
            const nuevoPago = new Pago(pagoData);
            await nuevoPago.save();
            return nuevoPago;
        } catch (error) {
            console.error('Error al registrar el pago:', error);
            throw new Error('Error al registrar el pago: ' + error.message);
        }
    }

    async actualizarPagoConPreference(pagoId, preferenceId) {
        try {
            const pago = await Pago.findById(pagoId);
            if (!pago) {
                throw new Error('Pago no encontrado');
            }
            pago.preferenceId = preferenceId;
            await pago.save();
        } catch (error) {
            console.error('Error al actualizar el pago con la preferencia:', error);
            throw new Error('Error al actualizar el pago con la preferencia: ' + error.message);
        }
    }

    async actualizarEstadoPago(pagoId, estado) {
        try {
            const pago = await Pago.findById(pagoId);
            if (!pago) {
                throw new Error('Pago no encontrado');
            }
            pago.status = estado;
            await pago.save();
        } catch (error) {
            console.error('Error al actualizar el estado del pago:', error);
            throw new Error('Error al actualizar el estado del pago: ' + error.message);
        }
    }
}

module.exports = new PagoService();
