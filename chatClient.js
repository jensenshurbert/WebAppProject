// Jensen Shurbert, Alexander Powell, Delaney Ambrosen
// Kenyon College
// port (8080) must match  port of client
var socket = io.connect('http://cslab.kenyon.edu:8080');
// Watch for incomming messages from server (chatapp.js)

var playerCount = 0;

socket.on('message', function(message) {
  A join message: {operation: 'join', name: clientname}
  if (message.operation == 'join') {
    playerCount += 1;
    if (playerCount == 1){
    	    console.log("Joins: Player" + playerCount);
			//send message
    }
     if (playerCount == 2){
    	    console.log("Joins: Player" + playerCount);
			//send message
    }
    if (playerCount > 2){
    	    console.log("Too many players");
			//send message
    }
    $('#chatBox').html($('#chatBox').html() + "<font color='red'>User joins: </font>" + message.name + "<br />");
  }
  // A text message: {operation: 'mess', name: clientname, text: message}
  if (message.operation == 'mess') {
    console.log("Mess:" + message.text);
    $('#chatBox').html($('#chatBox').html() + "<font color='red'>" + message.name + ": </font>" + message.text + "<br />");
  }
})

//add join button here
// Action if they push the set name button
$('#name-btn').click(function() {
  var name = $('#yourname').val();
  console.log(name + " joins!");
  socket.emit('message', {
    operation: "join",
    name: name
  });
})

// Action if they push the set name button
$('.board button').click(function() {
	var y_pos = $('.board tr').index($(this).closest('tr'));
    var x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));  
    //console.log(name + " joins!");
    console.log("Position: " + y_pos + x_pos);

  socket.emit('message', {
    operation: "mess",
    //name: name
    text: message

  });
})




// Action if they push the send message button
// $('#send-btn').click(function() {
//   var message = $('#message').val();
//   var name = $('#yourname').val();
//   console.log(" message:" + message);
//   socket.emit('message', {
//     operation: "mess",
//     name: name,
//     text: message
//   });
// })

//change operations to column#