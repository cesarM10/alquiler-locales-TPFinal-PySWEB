const mongoose = require('mongoose');
const { Schema } = mongoose;
const Alquiler = require ('./alquiler')

const CuotaSchema = new Schema({
    alquiler: { type: Schema.Types.ObjectId, ref: Alquiler, required: true },
    montoPago: { type: Number, required: true },
    estadoPago: { type: String, required: true },
    mesPago: { type: Number, required: true },
    anioPago: { type: Number, required: true },
    idMercadoPago:  { type: String, required: true },
  });
  
  module.exports = mongoose.models.Cuota || mongoose.model('Cuotas', CuotaSchema);