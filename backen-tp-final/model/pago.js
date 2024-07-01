const mongoose = require('mongoose');
const { Schema } = mongoose;
const PagoSchema = new Schema({
    fechaPago: { type: Date, required: true },
    total: { type: Number, required: true },
    descripcion: { type: String, required: true },
    pagado:{type:Boolean, required: true},
    alquiler:{type: Schema.Types.ObjectId, ref: Alquiler, required: true }
})
module.exports = mongoose.models.Pago || mongoose.model('Pago', PagoSchema);