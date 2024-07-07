const mongoose = require('mongoose');
const { Schema } = mongoose;
const Propietario = require('./propietario');
const Local = require('./local');
const Pago = require('./pago');

const AlquilerSchema = new Schema({
    local: { type: Schema.Types.ObjectId, ref: Local, required: true },
    propietario: { type: Schema.Types.ObjectId, ref: Propietario, required: true },
    //pagoAlquiler: [{ type: Pago.schema, required: false }],
    plazoMes: { type: Number, required: true },
    fechaAlquiler: { type: Date, required: true },
    costoAlquiler: { type: Number, required: false }
})
module.exports = mongoose.models.Alquiler || mongoose.model('Alquiler', AlquilerSchema);

