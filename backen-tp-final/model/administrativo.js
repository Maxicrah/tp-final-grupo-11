const mongoose = require('mongoose');
const Usuario = require('./usuario');
const { Schema } = mongoose;

const AdministrativoSchema = new Schema({
    apellido: { type: String, required: true },
    nombre: { type: String, required: true },
    dni: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    domicilio: { type: String, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: Usuario, required: true }
});

module.exports = mongoose.models.Administrativo || mongoose.model('Administrativo', AdministrativoSchema);