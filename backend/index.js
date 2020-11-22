'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
        .then(()=> {
            console.log('conexion a base de atos establecida...');
            app.listen(port,()=>{
                console.log("servidor corriendo correctamente")
            })        
        })
        .catch(err=> console.log(err));