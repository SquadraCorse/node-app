var fs = require('fs');
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


// DYNAMIC HELPERS
// HELPER: lazy load template
app.locals.dynamic = function (file, context, opts) {

    file = file.replace(/\//g, '_') + hbs.extname;

    var myPartial = __dirname + '/views/partials/' + file;

    // Can't use compiled one on windows because of path / and \\ blah
    var template = hbs.handlebars.compile(fs.readFileSync(myPartial, 'utf8'));
    // Compiled template is already available...
    // var template = hbs.compiled[myPartial];

    return new hbs.handlebars.SafeString(template(context));

};
// HELPER: i18n




// HOME
app.get('/', function(req, res){
    var model = {
        copyright: 'aap',
        writer: 'oudenniel'
    }
    res.render('index', model);
});

// SAMPLE
app.get('/sample', function(req, res) {

    var url = 'http://www.oudenniel.nl/model.json';
    var tmpl = 'sample';
    var query = {};

    xhr(res, url, query, tmpl);

});

app.get('/search', function(req, res) {

    var url = 'http://www.ute1.klm.com/destinations/nl/nl/search';
    var tmpl = 'search';
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

