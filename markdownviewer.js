#!/usr/bin/env node

if(process.argv.length < 3){
  print_usage();
  process.exit();
}

var express = require("express");
var config = require("./config");
if(process.argv.length > 3) {
  var params = process.argv.slice(3);
  var i = 0;
  while(i < params.length) {
    if(params[i] == '-p') {
      var port_base = parseInt(params[i + 1]);
      if(port_base >= 1024) {
        config.http_port = port_base;
        config.socket_port = port_base + 1;
      }
    }
    i++;
  }
}

require("./lib/file_watcher.js");

var port = config.http_port;

var server = express();

function print_usage(){
  console.log("Usage: ./markdownviewer MARKDOWN_FILE [-p PORT]");
}

server.configure(function(){
  server.use(server.router);
  server.use(express.static(__dirname + '/public'));
});

server.set('view engine', 'ejs');

server.get('/', function(req, res){
  console.log(req.method+" request for / from "+req.connection.remoteAddress);
  res.render(__dirname+'/views/index', {socket_port: config.socket_port}); 
});

server.listen(port);
console.log("Started monitoring markdown file, view at http://localhost:"+port);
