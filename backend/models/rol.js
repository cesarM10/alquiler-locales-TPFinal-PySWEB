const mongoose = require('mongoose');
const { Schema } = mongoose;

const RolSchema = new Schema({
    nombre: { type: String, required: true }
  }, { versionKey: false })

module.exports = mongoose.models.Rol || mongoose.model('Roles', RolSchema);

