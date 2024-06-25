const mongoose = require('mongoose');
const { Schema } = mongoose;
const PropietarioSchema = new Schema({
    apellido: { type: String, required: true },
    nombre: { type: String, required: true },
    dni: { type: Number, required: true },
    email: { type: String, required: true },
    telefono: { type: Number, required: true },
    domicilio: { type: String, required: true }
})
module.exports = mongoose.models.Propietario || mongoose.model('Propietario', PropietarioSchema);