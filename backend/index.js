'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/portafolio', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('conexion a base de atos establecida...');
        app.listen(port, () => {
            console.log("servidor corriendo correctamente")
        })
    })
    .catch(err => console.log(err));