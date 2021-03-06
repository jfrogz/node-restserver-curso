"use strict";

var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol válido'
};
var Schema = mongoose.Schema;
var usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    "default": 'USER_ROLE',
    "enum": rolesValidos
  },
  estado: {
    type: Boolean,
    "default": true
  },
  google: {
    type: Boolean,
    "default": false
  }
});

usuarioSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

usuarioSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser único'
});
module.exports = mongoose.model('Usuario', usuarioSchema);