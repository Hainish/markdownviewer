var exec = require("child_process").exec;
var fs = require("fs");
var _ = require("underscore");

var config = require("../config");
var browser_sockets = require("./browser_sockets.js");

var sockets = browser_sockets.sockets;

var file = process.argv[2];

var file_html = "";

function retrieve_file_html(cb){
  cb = cb || function(){};
  exec("pandoc --from markdown --to html --standalone "+file, function(error, stdout){
    if(error) return cb(error);
    file_html = stdout;
    cb();
  });
}

function send_file_single_socket(socket){
  socket.emit("file_change", file_html);
}

function retrieve_and_send_file_all_sockets(){
  retrieve_file_html(function(error){
    if(error) return console.log(error);
    _.each(sockets, function(socket){
      send_file_single_socket(socket);
    });
  });
}

retrieve_and_send_file_all_sockets();

// as of node 0.8.14, fs.watch does not work here with vim
fs.watchFile(file, function(){
  console.log('file changed');
  retrieve_and_send_file_all_sockets();
});

browser_sockets.on("new_socket", function(id){
  send_file_single_socket(sockets[id]);
});
