#!/usr/bin/env node
var express = require("express");
var config = require("./config");
require("./lib/file_watcher.js");

var port = config.http_port;

var server = express();

server.configure(function(){
  server.use(server.router);
  server.use(express.static(__dirname + '/public'));
});

server.set('view engine', 'ejs');

server.get('/', function(req, res){
  console.log(req.method+" request for / from "+req.connection.remoteAddress);
  res.render('index', {socket_port: config.socket_port}); 
});

server.listen(port);
console.log("Started monitoring markdown file, view at http://localhost:"+port);
