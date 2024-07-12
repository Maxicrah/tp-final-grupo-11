const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pagoSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  montoPago: {
    type: Number,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  fechaPago: {
    type: Date,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  metodoPago: {
    type: String,
    required: true
  },
  preferenceId: {
    type: String
  },
  alquiler: {
    type: Schema.Types.ObjectId,
    ref: 'Alquiler',
    required: true
  }
});

module.exports = mongoose.model('Pago', pagoSchema);
