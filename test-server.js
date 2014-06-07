var fs = require('fs');
var express = require('express');
var apphbs = require('express3-handlebars');
var i18n = require("i18n");

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

// INTERNATIONALISATION
i18n.configure({
    locales:['en', 'fr'],
    defaultLocale: 'en',
    extension: '.js',
    directory: __dirname + '/locales'
});


// DYNAMIC HELPERS

// HELPER: lazy load template
hbs.handlebars.registerHelper('dynamic', function (file, context, options) {

    file = file.replace(/\//g, '_') + hbs.extname;

    var myPartial = __dirname + '/views/partials/' + file;

    // Can't use compiled one on windows because of path / and \\ blah
    // var template = hbs.handlebars.compile(fs.readFileSync(myPartial, 'utf8'));
    // Compiled template is already available...
    var template = hbs.compiled[myPartial];

    return new hbs.handlebars.SafeString(template(context));

});

// HELPER: i18n
hbs.handlebars.registerHelper('__', function () {
  return i18n.__.apply(this, arguments);
});
hbs.handlebars.registerHelper('i18n', function () {
  return i18n.__.apply(this, arguments);
});
hbs.handlebars.registerHelper('__n', function () {
  return i18n.__n.apply(this, arguments);
});


// GET AND SET LANGUAGE FROM URL
app.all('/destinations/*', function(req, res, next) {

    // SET GLOBAL...
    // TODO: WORK OUT DEFAULT LANGUAGE FOR INDEX...
    app.locals.ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

    var rxLocal = /^\/destinations\/.*\/(en|fr)/i;
    // console.log(req.headers['accept-language'])
    if (rxLocal.test(req.url)){
        var arr = rxLocal.exec(req.url);
        var local = arr[1];
        i18n.setLocale(local);
    } else {
        i18n.setLocale('en');
    }

    // SET I18N
    app.use(i18n.init);

    // PROCEED
    next();

});

// GLOBALS
app.locals.appVersion = '1.2.3';



// SERVE OUR CORRECT VIEWS FOR APP

// HOME
app.get('/', function(req, res){

    var model = {
        copyright: 'aap',
        writer: 'oudenniel',
        label: 'foo.bar',
        content: [{
            template: 'header'
        }, {
            template: 'dummy'
        }, {
            template: 'footer'
        }]
    }
    res.render('index', model);
});


// SAMPLE USING JSON MODEL FROM OTHER DOMAIN
app.get('/sample', function(req, res) {

    var url = 'http://www.oudenniel.nl/model.json';
    var tmpl = 'sample-1';

    xhr(res, url, tmpl);

});


// SEARCH APP
app.get('/destinations/:country/:language/search', function(req, res) {

    var model = {
        country: req.param("country"),
        language: req.param("language")
    }

    res.render('sample-2', model);

});




// CITY APP
// ARTICLE APP



// STATIC FILES
// TODO: MOVE STATIC FILES TO ANOTHER STATIC CDN!
app.use('/static', express.static(__dirname + '/static', { maxAge: 31104000000, etag: '' }));


app.get('*', function(req, res) {
    //res.redirect('/');
    res.render('error', res);
});

// START APP
app.listen(process.env.PORT || 3000);
console.log('app listening on: 3000');


// TODO:
// E2E tests: http://nightwatchjs.org/

