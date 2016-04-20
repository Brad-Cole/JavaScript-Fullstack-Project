var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var db = mongojs('mongodb://heroku_7nv882cz:a1j0lma2kfau3ac0f09d94nk5n@ds013981.mlab.com:13981/heroku_7nv882cz' || 'gamedb', ['gamedb']);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/gamedb', function(req, res) {
  db.gamedb.find(function(err, docs) {
    res.json(docs);
  });
});

app.post('/gamedb', function(req, res) {
  db.gamedb.insert(req.body, function(err, doc) {
    res.json(doc);
  })
});

app.delete('/gamedb/:id', function(req, res) {
  var id = req.params.id;
  db.gamedb.remove({
    _id: mongojs.ObjectId(id)
  }, function(err, doc) {
    res.json(doc);
  })
});

app.get('/gamedb/:id', function(req, res) {
  var id = req.params.id;
  db.gamedb.findOne({
    _id: mongojs.ObjectId(id)
  }, function(err, doc) {
    res.json(doc);
  });
});

app.put('/gamedb/:id', function(req, res) {
  var id = req.params.id;
  db.gamedb.findAndModify({
    query: {
      _id: mongojs.ObjectId(id)
    },
    update: {
      $set: {
        game: req.body.game,
        system: req.body.system,
        value: req.body.value
      }
    },
    new: true
  }, function(err, doc) {
    res.json(doc);
  });
});

app.listen(3000 || process.env.PORT);
console.log("server is using port 3000");
