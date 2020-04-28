"use strict";

require('./config/config');

var express = require('express');

var app = express();

var bodyParser = require('body-parser'); // parse application/x-www-form-urlencoded


app.use(bodyParser.urlencoded({
  extended: false
})); // parse application/json

app.use(bodyParser.json());
app.get('/usuario', function (req, res) {
  res.json('get Usuario');
});
app.post('/usuario', function (req, res) {
  var body = req.body;

  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      mensaje: 'El nombre es necesario'
    });
  } else {
    res.json({
      "persona": body
    });
  }
});
app.put('/usuario/:identificador', function (req, res) {
  var id = req.params.identificador;
  res.json({
    id: id
  });
});
app["delete"]('/usuario', function (req, res) {
  res.json('delete Usuario');
});
app.listen(process.env.PORT, function () {
  console.log('Escuchando en el puerto: ', process.env.PORT);
});