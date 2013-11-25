// check for environmental variable file and load if present
var fs = require("fs");
if (fs.existsSync("./config/env_vars.js")) {
  var env = require("./config/env_vars.js").env;
  for (i in env) { process.env[i] = env[i]; }
}

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();

// Sequelize Database ORM Initialization
var Sequelize = require("sequelize");
var modelNames = [ "item", "person", "claim", "bag", "clothing", "accessory", "key", "phone", "tablet"];
var db = require("./config/sequelize.js").createConnection(Sequelize,process.env);
global.Model = require("./model/_all.js").createModel(db,Sequelize,modelNames);

global.Mail = require("./mail.js");

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
}

var callbacks = {}; for (var i = 0; i < modelNames.length; i++) {
  var filePath = './routes/'+modelNames[i]+'.js'; if (fs.existsSync(filePath)) { callbacks[modelNames[i]] = require(filePath); } }

app.get('/item', callbacks.item.add);
app.post('/item', callbacks.item.create);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
