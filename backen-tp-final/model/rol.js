const mongoose = require('mongoose');
const { Schema } = mongoose;
const RolSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true }
})
module.exports = mongoose.models.Rol || mongoose.model('Rol', RolSchema);