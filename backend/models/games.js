'use strict';

var mongoose = require('mongoose');

// todo.name
// todo.completed

var gamedbSchema = new mongoose.Schema({
	game: String,
	system: String,
	value: Number
});

var model = mongoose.model('db', gamedbSchema);

module.exports = model;
