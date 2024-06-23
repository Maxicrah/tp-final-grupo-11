const mongoose = require('mongoose');
const { Schema } = mongoose;
const Rol = require('./rol');

const UsuarioSchema = new Schema({
    email: { type: String, required: true },
    usuario: { type: String, required: true },
    password: { type: String, required: true },
    activo: { type: Boolean, required: true},
    rol: { type: Schema.Types.ObjectId, ref: Rol, required: true }
})
module.exports = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);

