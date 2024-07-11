const mongoose = require('mongoose');
const { Schema } = mongoose;
const Rol = require('./rol');

const UsuarioSchema = new Schema({
  
})
module.exports = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);

