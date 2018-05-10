// Jensen Shurbert, Alexander Powell, Delaney Ambrosen
// Kenyon College
// port (8888) must match  port of client
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
	if (playerNum == 2){
		playerTurn = true;
	}
  }

//when your opponent moved
  if(message.operation == 'moved'){
  	console.log("This should only work if other player moved");
  	oppX = message.xPos;
  	oppY = message.yPos;
  	playerNum = message.num;
    oppY2 = dropToBottom(oppX, oppY);

    addDiscToBoard(currentPlayer, oppX, oppY2);
    printBoard();

    if (verticalWin() || horizontalWin() || diagonalWin()) {
        // Destroy our click listener to prevent further play.
        //$('.board button').unbind('click');
        playerTurn = false;
        $('.prefix').text(config.winPrefix);
        $('.play-again').show("slow");
        return;

    } else if (gameIsDraw()) {
        // Destroy our click listener to prevent further play.
        playerTurn = false;
        $('.message').text(config.drawMsg);
        $('.play-again').show("slow");
        return;
    }
    printBoard();
    changePlayer();
    console.log("change player");
    playerTurn = true;

	console.log("XPOS: " + oppX);
	console.log("PLAYER:"+playerNum+" Positions: " + oppX + oppY);
  }

  if(message.operation == 'move') {
  	console.log("This should work if YOU move");
  //$('.board button').unbind('click');
  playerTurn = false;

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

//when you move
$('.board button').click(function() {
	if (playerTurn == false){
	return;
	}

	var y_pos=0;
	var x_pos=0;
	y_pos = $('.board tr').index($(this).closest('tr'));
  x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));
	console.log("type:"+typeof y_pos);
  console.log("Position: " + x_pos + y_pos);

           // Ensure the piece falls to the bottom of the column.
      y_pos = dropToBottom(x_pos, y_pos);

        if (positionIsTaken(x_pos, y_pos)) {
            alert(config.takenMsg);
            return;
        }

        if(playerTurn= true){
        addDiscToBoard(currentPlayer, x_pos, y_pos);
        printBoard();

        socket.emit('message', {
          operation: "move",
          xPos: x_pos,
      	  yPos: y_pos,
      	  num: playerNum
        });

        if (verticalWin() || horizontalWin() || diagonalWin()) {
            // Destroy our click listener to prevent further play.
            playerTurn = false;
            $('.prefix').text(config.winPrefix);
            $('.play-again').show("slow");
            return;

        } else if (gameIsDraw()) {
            // Destroy our click listener to prevent further play.
            playerTurn = false;
            $('.message').text(config.drawMsg);
            $('.play-again').show("slow");
            return;
        }


        changePlayer();
        console.log("change player");
        printBoard();}
})

$('.play-again').click(function(e) {
    board = new_board;
    printBoard();

    socket.emit('message', {
      operation: "end",

    });


    if (playerNum==1){
    playerTurn = true;
    console.log("new game");

    }
});
