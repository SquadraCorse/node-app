var request = require('request');

global.xhr = function (res, url, query, template) {

    var options = {
        url: url,
        qs: query,
        method: 'GET',
        json: true
    };

    // RENDER TEMPLATE
    request(options, function (error, response, body) {
        res.render(template, body);
    });

};