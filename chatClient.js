// Jensen Shurbert, Alexander Powell, Delaney Ambrosen
// Kenyon College
// port (8080) must match  port of client
var socket = io.connect('http://cslab.kenyon.edu:8888');
// Watch for incomming messages from server (chatapp.js)
var playerNum = "";
var playerTurn = false;



socket.on('message', function(message) {
  //A join message: {operation: 'join', name: clientname}
  if (message.operation == 'accept') {
  console.log(JSON.stringify(message));
	playerNumOpp = message.num;
	console.log("joined as " + playerNumOpp);
  }
  if (message.operation == 'reject') {
	console.log("rejected");
  }
    if (message.operation == 'joined') {
  	console.log(JSON.stringify(message));
	playerNum = message.num;
	console.log("Opponent joined as " + playerNum);
  }
  if(message.operation == 'moved'){
  	console.log("This should only work if other player moved");
  	oppX = message.xPos;
  	oppY = message.yPos;
  	playerNum = message.num;
    oppY2 = dropToBottom(oppX, oppY);

    addDiscToBoard(currentPlayer, oppX, oppY2);
    printBoard();
    changePlayer();
    $('.board button').bind('click');

	console.log("XPOS: " + oppX);
	console.log("PLAYER:"+playerNum+" Positions: " + oppX + oppY);
  }
  if(message.operation == 'move') {
  	console.log("This should work if YOU move");
  $('.board button').unbind('click');

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
	var y_pos=0;
	var x_pos=0;
	y_pos = $('.board tr').index($(this).closest('tr'));
    x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));
	console.log("type:"+typeof y_pos);
    //console.log(name + " joins!");
    console.log("Position: " + x_pos + y_pos);

  socket.emit('message', {
    operation: "move",
    xPos: x_pos,
	yPos: y_pos,
	num: playerNum
  });
})


//operations : join, move, end
//playerCount for end and move
//move also needs an x and y

//in client
//when this button gets pushed, send a join and look at the message back, "you were accepted"

//both start as not being able to move, if you get a message saying player2 joined, then its player 1's turn so set = true
//then at that point, any time you do a move, you set it to false, any time the other side moves, set it to true
