'use strict';


var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
//#
var cors = require('cors')
//#
var whitelist = [
  'http://testdev-us-east-1.s3-website-us-east-1.amazonaws.com/*',      //this is my front-end url for development
  'http://testdev-us-east-1.s3-website-us-east-1.amazonaws.com:80/*',
  '*',
  "http://testdev-us-east-1.s3-website-us-east-1.amazonaws.com"
];

//var corsOptions = {
//  origin: function(origin, callback){
//    if (whitelist.indexOf(origin) !== -1) {
//      callback(null, true)
//    } else {
//      callback(new Error('Not allowed by CORS' + origin))
//    }
//  }
//}

app.use(cors());

app.start = function() {
  // start the web server
  return app.listen(function(req, res) {
   //what is going on 
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');

    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};


// enable CORS!
app.use(enableCORS);

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
