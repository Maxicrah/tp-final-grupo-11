const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocalSchema = new Schema({
    superficie: { type: Number, required: true },
    habilitado: { type: Boolean, required: true },
    costoMes: { type: Number, required: true },
    alquilado: { type: Boolean, required: true },
    pathImagen: { type: String, required: true }
})
module.exports = mongoose.models.Local || mongoose.model('Local', LocalSchema);

