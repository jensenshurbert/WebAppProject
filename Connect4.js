/*Functions included
  -addDiscToBoard
  -printBoard
  -changePlayer
  -dropToBottom
  -positionIsTaken
  -gameIsDraw
  -horizontalWin
  -verticalWin
  -diagonalWin
*/


//add position of piece to the board
function addDiscToBoard(color, x_pos, y_pos) {
    board[y_pos][x_pos] = color;
}

function printBoard() {
    // Loop through the board, and add classes to each cell for the
    // appropriate colors.
    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            if (board[y][x] !== 0) {
                var cell = $("tr:eq(" + y + ")").find('td').eq(x);
                cell.children('button').addClass(board[y][x]);
            }
        }
    }
}

//Change player turn
function changePlayer() {
    // Change the value of our player variable.
    if (currentPlayer === 'black') {
        currentPlayer = 'red';
    } else {
        currentPlayer = 'black';
    }

    // Update the UI.
    $('#player').removeClass().addClass(currentPlayer).text(config[currentPlayer + "PlayerName"]);

    //**Testing adding to statistic boxes
    if (currentPlayer === 'red') {
      $('#player1.score').removeClass().addClass(currentPlayer).text("You moved");
    } else {
      $('#player2.score').removeClass().addClass(currentPlayer).text("You moved");
    }
}

 //Drop piece to the bottom
function dropToBottom(x_pos, y_pos) {
    for (var y = 5; y > y_pos; y--) {
        if (board[y][x_pos] === 0) {
            return y;
        }
    }
    return y_pos;
}

 //Check if position is currently taken
function positionIsTaken(x_pos, y_pos) {
    var value = board[y_pos][x_pos];

    return value === 0 ? false : true;
}

 //Decide if game is a draw
function gameIsDraw() {
    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            if (board[y][x] === 0) {
                return false;
            }
        }
    }

    // No locations were empty. Return true to indicate that the game is a draw.
    return true;
}

//Check horizontally for a win
function horizontalWin() {
    var currentValue = null,
        previousValue = 0,
        tally = 0;

    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;
        }

        // After each row, reset the tally and previous value.
        tally = 0;
        previousValue = 0;
    }

    // No horizontal win was found.
    return false;
}

//Check vertically for a win
function verticalWin() {
    var currentValue = null,
        previousValue = 0,
        tally = 0;

    for (var x = 0; x <= 6; x++) {
        for (var y = 0; y <= 5; y++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;
        }

        // After each column, reset the tally and previous value.
        tally = 0;
        previousValue = 0;
    }

    // No vertical win was found.
    return false;
}

//Check if a diagonal win
function diagonalWin() {
    var x = null,
        y = null,
        xtemp = null,
        ytemp = null,
        currentValue = null,
        previousValue = 0,
        tally = 0;

    // Test for down-right diagonals across the top.
    for (x = 0; x <= 6; x++) {
        xtemp = x;
        ytemp = 0;

        while (xtemp <= 6 && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;

            // Shift down-right one diagonal index.
            xtemp++;
            ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
    }

    // Test for down-left diagonals across the top.
    for (x = 0; x <= 6; x++) {
        xtemp = x;
        ytemp = 0;

        while (0 <= xtemp && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;

            // Shift down-left one diagonal index.
            xtemp--;
            ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
    }

    // Test for down-right diagonals down the left side.
    for (y = 0; y <= 5; y++) {
        xtemp = 0;
        ytemp = y;

        while (xtemp <= 6 && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;

            // Shift down-right one diagonal index.
            xtemp++;
            ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
    }

    // Test for down-left diagonals down the right side.
    for (y = 0; y <= 5; y++) {
        xtemp = 6;
        ytemp = y;

        while (0 <= xtemp && ytemp <= 5) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                // Reset the tally if you find a gap.
                tally = 0;
            }
            if (tally === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;

            // Shift down-left one diagonal index.
            xtemp--;
            ytemp++;
        }
        // Reset the tally and previous value when changing diagonals.
        tally = 0;
        previousValue = 0;
    }

    // No diagonal wins found. Return false.
    return false;
}
