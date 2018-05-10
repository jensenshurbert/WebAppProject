//Global

var config = {
        blackPlayerName: "Player 1",
        redPlayerName: "Player 2",
        startingPlayer: "black", //starting player
        takenMsg: "This position is already taken. Please make another choice.",
        drawMsg: "Yay Friendship!!! Friendship Points +1.",
        playerPrefix: "Current Player is: ",
        winPrefix: "The winner is: ",
        countToWin: 4,
    };

//Two-dimensional array representing our board
var board = [[0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0]];

var new_board = board;

// Set the starting player.
var currentPlayer = config.startingPlayer;
