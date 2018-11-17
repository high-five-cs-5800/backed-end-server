'use strict';


var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
//#
var cors = require('cors')
//#
app.use(cors())

app.start = function() {
  // start the web server
  return app.listen(function() {
   //what is going on 
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    app.get('/api', function(req, res, next){
        res.json({msg: 'This is CORS-ENABLE for all origins!'})
    })
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
