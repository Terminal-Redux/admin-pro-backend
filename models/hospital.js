// Opcion : usar mongoose.atributo para usarlo
// const mongoose = require('mongoose');

const { Schema, model } = require("mongoose");

const HospitalSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
}, { collection: 'hospitales' });

HospitalSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Usuario", HospitalSchema);