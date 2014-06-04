var express = require('express');
var apphbs = require('express3-handlebars');
// TODO: rewrite JAVA helpers into JAVASCRIPT ONES
var helpers = require('./lib/helpers');

// OWN FUNCTIONS
require('./lib/xhr');

// USE EXPRESS HANDLEBARS
var app = express();
var hbs;

hbs = apphbs.create({
    extname: '.hbs',
    // defaultLayout: 'main',
    helpers: helpers,
    partialsDir: [
        __dirname + '/views/partials'
    ]
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


// HOME
app.get('/', function(req, res){
    res.render('index');
});

// SAMPLE
app.get('/sample', function(req, res) {

    var url = 'http://www.oudenniel.nl/model.json';
    var tmpl = 'sample';
    var query = {};

    xhr(res, url, query, tmpl);

});

// SEARCH APP
app.get('/destinations/:country/:language/search', function(req, res) {

    var model = {
        country: req.param("country"),
        language: req.param("language")
    }

    res.render('search', model);

});

// CITY APP
// ARTICLE APP

// STATIC FILES
app.use('/static', express.static(__dirname + '/static'));

// START APP
app.listen(process.env.PORT || 3000);
console.log('app listening on: 3000');

