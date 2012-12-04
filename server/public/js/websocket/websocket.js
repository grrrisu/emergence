$(document).ready(function(){

  // websocket

  //connection = new WebSocket('ws://localhost:8080/'); // ['soap', 'xmpp']
  connection = new WebSocket('ws://localhost:4567/websocket2'); // ['soap', 'xmpp']

  connection.onopen = function(){
    connection.send('new user connected');
  };

  connection.onerror = function(error){
    console.log(error);
  };

  connection.onmessage = function(message){
    console.log(message, message.data);
    $('#message').append('<p>'+message.data+'</p>');
  };

  // input

  $('#form').submit(function(e){
    connection.send($('#input').attr('value'));
    $('#input').attr('value', '');
    return false;
  });

});
