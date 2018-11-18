'use strict';


var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
//#
var cors = require('cors')
//#
var originsWhitelist = [
  'http://testdev-us-east-1.s3-website-us-east-1.amazonaws.com/'      //this is my front-end url for development
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}


//here is the magic
//app.use(cors(corsOptions), function(req, res, next){  
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//    
//});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use(cors())
//app.use(function(req, res, next){
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});

app.start = function() {
  // start the web server
  return app.listen(function(req, res) {
   //what is going on 
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    //app.get('/api/UserAccounts', function(req, res, next){
    //    res.json({msg: 'This is CORS-ENABLE for all origins!' + baseUrl})
    //      res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    //      res.header("Access-Control-Allow-Headers");
    //})
    
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
