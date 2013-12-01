// check for environmental variable file and load if present
var fs = require("fs");
if (fs.existsSync("./config/env_vars.js")) {
  var env = require("./config/env_vars.js").env;
  for (i in env) { process.env[i] = env[i]; }
}

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

/*
	DB
*/

var mongoose = require('mongoose');
console.log('ENV:' + app.get('env'));
if ('development' == app.get('env')) {
	mongoose.connect('mongodb://localhost/db');
} else {
	mongoose.connect(process.env.mongo);
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  console.log('MongoDB connected !')
});

/*
	Real stuff
*/
var Mail = require("./util/mail.js");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.locals.pretty = true;
}

// Index
var routeMain = require('./routes/main.js')
app.get('/', routeMain.index);
app.get('/contact', routeMain.contact);

// Claims
var routeClaim = require('./routes/claim.js')
app.get('/claims', routeClaim.list);
app.get('/claims/add', routeClaim.add);
app.get('/claims/:id', routeClaim.detail);
app.get('/claims/:id/resolved', routeClaim.statusResolved);
app.get('/claims/:id/unresolved', routeClaim.statusUnresolved);
app.post('/claims/:id/delete', routeClaim.delete);
app.post('/claims', routeClaim.create);
app.post('/claims/status', routeClaim.status);

// Contact

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
