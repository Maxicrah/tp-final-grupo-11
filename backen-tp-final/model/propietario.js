const mongoose = require('mongoose');
const { Schema } = mongoose;
const PropietarioSchema = new Schema({
    dni: { type: Number, required: true },
    apellido: { type: String, required: true },
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: Number, required: true }
})
module.exports = mongoose.models.Propietario || mongoose.model('Propietario', PropietarioSchema);