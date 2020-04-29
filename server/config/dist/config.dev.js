"use strict";

//============= PUERTO =============
process.env.PORT = process.env.PORT || 3000; //============= ENTORNO =============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; //============= BASE DE DATOS =============

var urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/cafe';
} else {
  urlDB = 'mongodb+srv://slyfer:zyO8l6NrFTbp7Wtj@cluster0-8vfmz.mongodb.net/cafe';
}

process.env.URLDB = urlDB;