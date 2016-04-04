var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');
var OAuth = require('../secrets');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Beer = require('../models/beer');

app.use(cors());

// parse application/json
app.use(bodyParser.json());
// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// connect to mongodb
mongoose.connect('mongodb://localhost/peertapp');

var authCheck = jwt({
	secret: new Buffer(OAuth.auth.secret, 'base64'),
	audience: OAuth.auth.audience
});

app.get('/api/public', function(req, res) {
	res.json({message: "Hello from a public endpoint. you dont need to be authenticated"});
});

app.get('/api/private', authCheck, function(req, res) {
	res.json({message: "Hello from a private endpoint. you DO need to be authenticated"});
});

app.get('/api/beers', function (req, res) {
    Beer.find(function (err, allBeers) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(allBeers);
    }
  });
});

app.post('/api/beers', function (req, res) {
    var newBeer = new Beer(req.body);
  newBeer.save(function (err, savedBeer) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(savedBeer);
    }
  });
});

app.get('/api/beers/:id', function (req, res) {
// get beer id from url params (`req.params`)
  var beerId = req.params.id;


  // find beer in db by id
  Beer.findOne({ _id: beerId }, function (err, foundBeer) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(foundBeer);
    }
  });


});

//update beer
app.put('/api/beers/:id', function (req, res) {
    var id = req.params.id;
    console.log('hit update route');
    Beer.findById({_id: id}, function (err, foundBeer){
        if (err) console.log(err);
        foundBeer.brand = req.body.brand;
        foundBeer.kind = req.body.kind;
        foundBeer.upvotes = req.body.upvotes;
        foundBeer.save(function (err, saved){
            if (err) { console.log(err);}
            res.json(saved);
        });
    });
});

app.delete('/api/beers/:id', function (req, res) {
	var id = req.params.id;
	Beer.remove({_id:id}, function (err) {
		if (err)
		console.log(err);
  });
});

app.listen(3000);
console.log('Listening on localhost:3000');