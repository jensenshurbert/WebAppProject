// Jensen Shurbert, Alexander Powell, Delaney Ambrosen
// Kenyon College
// port (8080) must match  port of client
var socket = io.connect('http://cslab.kenyon.edu:8888');
// Watch for incomming messages from server (chatapp.js)
var playerNum = "";


socket.on('message', function(message) {
  //A join message: {operation: 'join', name: clientname}
  if (message.operation == 'accept') {
  console.log(JSON.stringify(message));
	playerNum = message.num;
	console.log("joined as " + playerNum);
  }
  if (message.operation == 'reject') {
	console.log("rejected");
  }
    if (message.operation == 'joined') {
  console.log(JSON.stringify(message));
	playerNum = message.num;
	console.log("Opponent joined as " + playerNum);
  }

})

//add join button here
// Action if they push the set name button
$('#name-btn').click(function() {
  console.log("A player pressed the join button");
  socket.emit('message', {
    operation: "join",
  });
})

// Action if they push the set name button
$('.board button').click(function() {
	var y_pos = $('.board tr').index($(this).closest('tr'));
    var x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));

    //console.log(name + " joins!");
    console.log("Position: " + y_pos + x_pos);

  socket.emit('message', {
    operation: "move",
    //name: name
    text: message

  });
})



//change operations to column#


//operations : join, move, end
//playerCount for end and move 
//move also needs an x and y

//in client
//when this button gets pushed, send a join and look at the message back, "you were accepted"



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