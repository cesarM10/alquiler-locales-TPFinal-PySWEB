const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
const {Schema} = mongoose;

const LocalSchema = new Schema({
    numeroLocal: {type: String, required: true},
    superficie: {type: Number, required: true},
    habilitado: {type: Boolean, required: true},
    costoMes: {type: Number, required: true},
    imagen: {type: String, required: true},
    alquilado: {type: Boolean, required: true},
    usuario: { type: Schema.Types.ObjectId, ref: Usuario, required: true }
},{ versionKey: false })

module.exports = mongoose.models.Local || mongoose.model('Locales', LocalSchema);