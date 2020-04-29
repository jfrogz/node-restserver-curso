"use strict";

require('./config/config');

var express = require('express');

var app = express();

var mongoose = require('mongoose');

var bodyParser = require('body-parser'); // parse application/x-www-form-urlencoded


app.use(bodyParser.urlencoded({
  extended: false
})); // parse application/json

app.use(bodyParser.json());
app.use(require('./routes/usuario'));
mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useCreateIndex: true
}, function (err, res) {
  if (err) throw err;
  console.log('Base de datos ONLINE');
});
app.listen(process.env.PORT, function () {
  console.log('Escuchando en el puerto: ', process.env.PORT);
});