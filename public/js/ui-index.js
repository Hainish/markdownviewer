socket.on('file_change', function (data) {
  $('#wrapper').html(data);
});

