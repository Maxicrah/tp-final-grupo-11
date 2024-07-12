const mongoose = require('mongoose');
const { Schema } = mongoose;
const Usuario = require('./usuario');

const PropietarioSchema = new Schema({
    apellido: { type: String, required: true },
    nombre: { type: String, required: false },
    dni: { type: String, required: false },
    email: { type: String, required: false },
    telefono: { type: String, required: false },
    domicilio: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: Usuario }
})
module.exports = mongoose.models.Propietario || mongoose.model('Propietario', PropietarioSchema);