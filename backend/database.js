'use strict';
var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_7nv882cz:a1j0lma2kfau3ac0f09d94nk5n@ds013981.mlab.com:13981/heroku_7nv882cz'
|| 'mongodb://localhost/gamedb');

var db = mongoose.connection;

db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('Mongoose connected to MongoDB.');
});
