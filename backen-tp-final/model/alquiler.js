const mongoose = require('mongoose');
const { Schema } = mongoose;
const Propietario = require('./propietario');
const Local = require('./local');
const Pago = require('./pago');

const AlquilerSchema = new Schema({
    propietario: { type: Schema.Types.ObjectId, ref: Propietario, required: true },
    local: { type: Schema.Types.ObjectId, ref: Local, required: true },
    pagoAlquiler: [{ type: Pago.schema, required: true }],
    plazoMes: { type: Number, required: true },
    fechaAlquiler: { type: Date, required: true },
    costoAlquiler: { type: Number, required: true }
})
module.exports = mongoose.models.Alquiler || mongoose.model('Alquiler', AlquilerSchema);

