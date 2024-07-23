const mongoose = require ('mongoose');
const {Schema} = mongoose;
const Local = require ('./local')
const Usuario = require ('./usuario')

const NovedadSchema = new Schema({
    local: { type: Schema.Types.ObjectId, ref: Local, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: Usuario, required: true },
    texto: { type: String, required: true },
    estado: { type: String, enum: ['Pendiente', 'Procesado'], required: true }
  }, { versionKey: false });

module.exports = mongoose.models.Novedad || mongoose.model('Novedades', NovedadSchema);