const mongoose = require('mongoose');
const {Schema} = mongoose;
const Local = require ('./local')
const Usuario = require ('./usuario')

const AlquilerSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: Usuario, required: true },
    local: { type: Schema.Types.ObjectId, ref: Local, required: true },
    plazomes: { type: Number, required: true },
    costoalquiler: { type: Number, required: true },
    fechaAlquiler: { type: Date, required: true }
  }, { versionKey: false });

module.exports = mongoose.models.Alquiler || mongoose.model('Alquileres', AlquilerSchema);
