var fs = require('fs');
var express = require('express');
var apphbs = require('express3-handlebars');
var i18n = require("i18n");

// OWN FUNCTIONS
require('./lib/xhr');


// USE EXPRESS HANDLEBARS
var app = express();
var hbs;

hbs = apphbs.create({
    extname: '.hbs',
    // defaultLayout: 'main',
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
    var template = hbs.handlebars.compile(fs.readFileSync(myPartial, 'utf8'));
    // Compiled template is already available...
    // var template = hbs.compiled[myPartial];

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

// HELPER: toJson
hbs.handlebars.registerHelper('toJson', function (model) {
    // JSON.stringify(model);
    // JSON.parse(model);
    return new hbs.handlebars.SafeString(JSON.stringify(model));
});

// HELPER: find
// TODO: MOVE LOGIC TO MODEL INSTEAD
hbs.handlebars.registerHelper('find', function (data, value, options) {
    // {{find model.header.inspirationalVisual.hrefs "small" operator="==" key="type" value="url"}}
    // {{find visual.hrefs "medium" operator="==" key="type" value="url"}}
    var operator = options.hash.operator;
    var key = options.hash.key;
    var string;

    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }

    for (var i = 0, len = data.length; i < len; i++) {

        var record = data[i];

        if (operators[operator](record[key], value)) {        
            string = data[i][options.hash.value];
        }

    }

    return string;

});
hbs.handlebars.registerHelper('compare', function (lvalue, rvalue, options) {

    // {{#compare visual visual.type 'article-container-image-full-width' operator='=='}}

    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    var operator = options.hash && options.hash.operator || "==";

    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }

    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

    var result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});


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
// app.locals.appVersion = '1.2.3';


// JSON
// ENRICH
app.get('/destinations/content/', function(req, res) {
    var url = 'http://www.klm.com' + req.url;
    var tmpl = 'json-enrich';
    xhr(res, url, tmpl);
});
// ALL DESTINATIONS
app.get('/destinations/', function(req, res) {
    var url = 'http://www.klm.com' + req.url;
    var tmpl = 'json-alldestinations';
    xhr(res, url, tmpl);
});
// EBT POS REVERSE PROXY
app.get('/passage/ebtui/*', function(req, res) {
    var url = 'http://www.klm.com' + req.url;
    var tmpl = 'json-ebtui';
    xhr(res, url, tmpl);
});

// TRIDION REDIRECT
app.get('/travel/*', function(req, res) {
    var url = "//www.klm.com" + req.url;
    res.statusCode = 302; 
    res.setHeader("Location", url);
    res.end();
});
// FREAK REDIRECT
app.get('/ams/*', function(req, res) {
    var url = "//www.klm.com" + req.url;
    res.statusCode = 302; 
    res.setHeader("Location", url);
    res.end();
});

// SEARCH APP
app.get('/destinations/:country/:language/search', function(req, res) {
    var url = 'http://www.klm.com' + req.url;
    var tmpl = 'search';
    var query = {};
    xhr(res, url, tmpl);

});

// CITY APP
// PARTIALS

app.get('/destinations/:country/:language/:continent/:land/:stad/partial/:template', function(req, res) {
    var tmpl = 'partial';
    var url = 'http://www.klm.com' + req.url;
    xhr(res, url, tmpl, 'html');
});
app.get('/destinations/:country/:language/:continent/:land/:stad', function(req, res) {
    var url = 'http://www.klm.com' + req.url;
    var tmpl = 'city';
    xhr(res, url, tmpl);
});
app.get('/destinations/:country/:language/:continent/:land/:stad/*', function(req, res) {
    var url = 'http://www.klm.com' + req.url;
    var tmpl = 'city';
    xhr(res, url, tmpl);
});


// TIMETABLE
app.get('/destinations/:country/:language/timetable/*', function(req, res) {
    var tmpl = 'partial';
    var url = 'http://www.klm.com' + req.url;
    xhr(res, url, tmpl, 'html');
});
// PRICEBOX
app.get('/destinations/:country/:language/pricebox/*', function(req, res) {
    var tmpl = 'partial';
    var url = 'http://www.klm.com' + req.url;
    xhr(res, url, tmpl, 'html');
});

// ARTICLE APP
app.get('/destinations/:country/:language/article/*', function(req, res) {

    var url = 'http://www.klm.com' + req.url;
    var tmpl = 'article';

    xhr(res, url, tmpl);

});




// STATIC FILES
// TODO: MOVE STATIC FILES TO ANOTHER STATIC CDN!
app.use('/destinations/static', express.static(__dirname + '/static', { maxAge: 31104000000, etag: '' }));


app.get('*', function(req, res) {
    //res.redirect('/');
    res.render('error', res);
});

// START APP
app.listen(process.env.PORT || 3000);
console.log('app listening on: 3000');


// TODO:
// E2E tests: http://nightwatchjs.org/