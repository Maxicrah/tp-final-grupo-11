const mongoose = require('mongoose');
const { Schema } = mongoose;
const Alquiler = require('./alquiler');


const PagoSchema = new Schema({
    fechaPago: { type: Date, required: true },
    total: { type: Number, required: true },
    descripcion: { type: String, required: true },
    pagado:{type:Boolean, required: true},
    // alquiler:{type: Schema.Types.ObjectId, ref: Alquiler, required: true } //NUEVO
    alquiler:{type: Schema.Types.ObjectId, ref: 'Alquiler', required: true } //NUEVO "nombre del local + precio + cantidad"
})
module.exports = mongoose.models.Pago || mongoose.model('Pago', PagoSchema);  