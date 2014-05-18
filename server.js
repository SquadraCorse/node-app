var express = require('express');
var request = require('request');
var apphbs = require('express3-handlebars');
// var helpers = require('./lib/helpers');

var app = express();

var hbs;

hbs = apphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    // helpers      : helpers,
    partialsDir: [
        __dirname + '/views/partials'
    ]
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');



app.get('/', function(req, res){
  res.render('index');
});

app.get('/simple', function(req, res){
  var data = { name: 'TIF'};
  res.render('simple', data);
});

app.get('/loop', function(req, res){
  
  var days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  
  var data = {
    wins: [1,2,3],
    days: days
  };
  
  res.render('loop', data);
});


app.get('/google', function(req, res) {

  var options = {
    url: 'https://www.googleapis.com/urlshortener/v1/url',
    qs: {
      longUrl: 'http://travel-node.herokuapp.com',
      key: process.env.KEY
    },
    method: 'POST',
    json: true,
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  request(options, function (error, response, body) {
    res.render('google', body);
  });

});


// SEARCH APP
app.get('/destinations/:country/:language/search', function(req, res) {

  var model = {
    country: req.param("country"),
    language: req.param("language")
  }

  res.render('search', model);

});

app.listen(process.env.PORT || 3000);
console.log('app listening on: 3000');

