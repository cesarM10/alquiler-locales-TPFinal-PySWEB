const mongoose = require('mongoose');
const Rol = require ('./rol');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: Number, required: true },
  password: { type: String, required: true },
  activo: { type: Boolean, required: true },
  rol: {type: Schema.Types.ObjectId, ref: Rol, required: true}
}, { versionKey: false });

module.exports = mongoose.models.Usuario || mongoose.model('Usuarios', UsuarioSchema);