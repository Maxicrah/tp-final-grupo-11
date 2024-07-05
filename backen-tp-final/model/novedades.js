const mongoose = require('mongoose');
const { Schema } = mongoose;
const Usuario = require('./usuario');

const NovedadesSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: Usuario, required: true },
    texto: { type: String, required: true },
    estado: { type: String, required: true },
    image: { type: String, required: true }
})
module.exports = mongoose.models.Novedades || mongoose.model('Novedades', NovedadesSchema);

