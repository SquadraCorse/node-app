var request = require('request');
var blah = process.env['CI_BUILD_NUMBER'] || 123;

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
        body.term = process.env['TERM'];
        res.render(template, body);
    });

};
