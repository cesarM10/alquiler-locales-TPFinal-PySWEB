const mongoose = require ('mongoose');
const {Schema} = mongoose;
const Local = require ('./local');
const Usuario = require('./usuario');

const PromocionSchema = new Schema({
    local: { type: Schema.Types.ObjectId, ref: Local, required: true },
    imagen: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true }
  }, { versionKey: false });

module.exports = mongoose.models.Promocion || mongoose.model('Promociones', PromocionSchema);