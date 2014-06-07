var request = require('request');

// OAUTH CREDENTIALS
var CONSUMER_KEY = process.env['BLAH'] || 123;
var CONSUMER_SECRET = process.env['BLAH'] || 123;

// VAR OAUTH
var oauth = { 
    callback: 'http://mysite.com/callback/', 
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET
};

// DEMO HAS NO OAUTH YET... example at ln40

// GET MODEL FROM SERVICE
global.xhr = function (res, url, template) {

    var options = {
        url: url,
        method: 'GET',
        json: true
    };

    // RENDER TEMPLATE
    request(options, function (error, response, body) {
        body.CONSUMER_KEY = CONSUMER_KEY;
        res.render(template, body);
    });

};







/* OAUTH EXAMPLE

var qs = require('querystring')
  , oauth =
    { callback: 'http://mysite.com/callback/'
    , consumer_key: CONSUMER_KEY
    , consumer_secret: CONSUMER_SECRET
    }
  , url = 'https://api.twitter.com/oauth/request_token'
  ;
request.post({url:url, oauth:oauth}, function (e, r, body) {
  // Ideally, you would take the body in the response
  // and construct a URL that a user clicks on (like a sign in button).
  // The verifier is only available in the response after a user has
  // verified with twitter that they are authorizing your app.
  var access_token = qs.parse(body)
    , oauth =
      { consumer_key: CONSUMER_KEY
      , consumer_secret: CONSUMER_SECRET
      , token: access_token.oauth_token
      , verifier: access_token.oauth_verifier
      }
    , url = 'https://api.twitter.com/oauth/access_token'
    ;
  request.post({url:url, oauth:oauth}, function (e, r, body) {
    var perm_token = qs.parse(body)
      , oauth =
        { consumer_key: CONSUMER_KEY
        , consumer_secret: CONSUMER_SECRET
        , token: perm_token.oauth_token
        , token_secret: perm_token.oauth_token_secret
        }
      , url = 'https://api.twitter.com/1.1/users/show.json?'
      , params =
        { screen_name: perm_token.screen_name
        , user_id: perm_token.user_id
        }
      ;
    url += qs.stringify(params)
    request.get({url:url, oauth:oauth, json:true}, function (e, r, user) {
      console.log(user)
    })
  })
})
*/