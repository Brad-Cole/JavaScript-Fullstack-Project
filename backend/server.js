var express = require('express');
var app = express();
var bodyParser = require('body-parser');

require('./database');

var db = require('./models/games');

app.set('port', process.env.PORT || 3000);

app.use('/', express.static("public"));
app.use(bodyParser.json());

app.get('/gamedb', function(req, res) {
  db.find(function(err, docs) {
    res.json(docs);
  });
});

app.post('/gamedb', function(req, res) {
  db.create(req.body, function(err, doc) {
    res.json(doc);
  })
});

app.delete('/gamedb/:id', function(req, res) {
  var id = req.params.id;
  db.findByIdAndRemove(id, function(err, doc) {
    res.json(doc);
  })
});

app.get('/gamedb/:id', function(req, res) {
  var id = req.params.id;
  db.findById({_id : id
  }, function(err, doc) {
    res.json(doc);
  });
});

app.put('/gamedb/:id', function(req, res) {
  var id = req.params.id;
  db.findByIdAndUpdate(
    id,{
      $set: {
        game: req.body.game,
        system: req.body.system,
        value: req.body.value
      },
    new: true
  }, function(err, doc) {
    res.json(doc);
  });
});

// Attempting to get  toatal value
// var getTotal = function(gamedbSchemaId) {
//     db.model.aggregate([
//         { $match: {
//             _id: gamedbSchemaId
//         }},
//         { $unwind: "$value" },
//         { $group: {
//             _id: "$_id",
//             balance: { $sum: "$game.value"  }
//         }}
//     ], function (err, result) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(result);
//     });
// }

app.listen(app.get('port'), function(){
 console.log('Server is using port ' + app.get('port'));
});
