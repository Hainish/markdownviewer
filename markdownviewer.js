#!/usr/bin/env node

if(process.argv.length != 3){
  print_usage();
  process.exit();
}

var express = require("express");
var config = require("./config");
require("./lib/file_watcher.js");

var port = config.http_port;

var server = express();

function print_usage(){
  console.log("Usage: ./markdownviewer MARKDOWN_FILE");
}

server.use(express.static(__dirname + '/public'));

server.set('view engine', 'ejs');

server.get('/', function(req, res){
  console.log(req.method+" request for / from "+req.connection.remoteAddress);
  res.render(__dirname+'/views/index', {socket_port: config.socket_port}); 
});

server.listen(port);
console.log("Started monitoring markdown file, view at http://localhost:"+port);
