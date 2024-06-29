const mongoose = require('mongoose');
const { Schema } = mongoose;
const Usuario = require('./usuario');

const PropietarioSchema = new Schema({
    apellido: { type: String, required: true },
    nombre: { type: String, required: true },
    dni: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    domicilio: { type: String, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: Usuario }
})
module.exports = mongoose.models.Propietario || mongoose.model('Propietario', PropietarioSchema);