socket.on('file_change', function (data) {
  $('body').html(data);
});

