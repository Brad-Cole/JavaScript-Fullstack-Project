var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('gameslist', ['gameslist']);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/gameslist', function (req, res){
	console.log("GET request received")

	db.gameslist.find(function (err, docs){
		res.json(docs);

	});
});

app.post('/gameslist', function (req, res) {
	db.gameslist.insert(req.body, function(err, doc)  {
		res.json(doc);
	})
});

app.delete('/gameslist/:id', function (req, res) {
	var id = req.params.id;
	db.gameslist.remove({_id: mongojs.ObjectId(id)}, function (err, doc)  {
		res.json(doc);
	})
});

app.get('/gameslist/:id', function (req, res) {
	var id = req.params.id;
	db.gameslist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc)  {
		res.json(doc);
	});
});

app.put('/gameslist/:id', function (req, res) {
	var id = req.params.id;
	db.gameslist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {game: req.body.game, system: req.body.system, value: req.body.value}},
		new: true}, function (err, doc) {
			res.json(doc);
		});
});

app.listen(3000);
console.log("server is using port 3000");
