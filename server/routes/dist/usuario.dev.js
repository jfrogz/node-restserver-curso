"use strict";

var express = require('express');

var app = express();

var bcrypt = require('bcrypt');

var _ = require('underscore');

var Usuario = require('../models/usuario');

app.get('/usuario', function (req, res) {
  var desde = Number(req.query.desde) || 0;
  var limite = Number(req.query.limite) || 5;
  var estadoActivo = {
    estado: true
  }; // Funcionamiento de paginación

  Usuario.find(estadoActivo, 'nombre email role estado google img').skip(desde).limit(limite).exec(function (err, usuarios) {
    if (err) {
      return res.status(400).json({
        ok: false,
        err: err
      });
    }

    Usuario.count(estadoActivo, function (err, conteo) {
      res.json({
        ok: true,
        usuarios: usuarios,
        cuantos: conteo
      });
    });
  });
});
app.post('/usuario', function (req, res) {
  var body = req.body;
  var usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });
  usuario.save(function (err, usuarioDB) {
    if (err) {
      return res.status(400).json({
        ok: false,
        err: err
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});
app.put('/usuario/:identificador', function (req, res) {
  var id = req.params.identificador;

  var body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

  Usuario.findByIdAndUpdate(id, body, {
    "new": true,
    runValidators: true
  }, function (err, usuarioDB) {
    if (err) {
      return res.status(400).json({
        ok: false,
        err: err
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});
app["delete"]('/usuario/:id', function (req, res) {
  var id = req.params.id; //Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{

  var cambiaEstado = {
    estado: false
  };
  Usuario.findByIdAndUpdate(id, cambiaEstado, {
    "new": true
  }, function (err, usuarioBorrado) {
    if (err) {
      return res.status(400).json({
        ok: false,
        err: err
      });
    }

    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no encontrado'
        }
      });
    }

    res.json({
      ok: true,
      usuario: usuarioBorrado
    });
  });
});
module.exports = app;