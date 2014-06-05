var request = require('request');
var blah = process.env.BLAH;

global.xhr = function (res, url, query, template) {

    var options = {
        url: url,
        qs: query,
        method: 'GET',
        json: true
    };

    // RENDER TEMPLATE
    request(options, function (error, response, body) {
        body.blah = blah;
        
        res.render(template, body);
    });

};
