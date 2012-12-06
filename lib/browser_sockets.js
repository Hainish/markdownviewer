var config = require("../config");
var io = require("socket.io").listen(config.socket_port);
var Emitter = require("events").EventEmitter;

var socket_emitter = new Emitter();

socket_emitter.sockets = {};
io.sockets.on('connection', function (socket) {
  socket_emitter.sockets[socket.id] = socket;
  socket_emitter.emit("new_socket",socket.id);
  socket.on('disconnect', function(){
    socket_emitter.emit();
    delete socket_emitter.sockets[socket.id];
  });
});
module.exports = socket_emitter;
