$(document).ready(function() {

    config.blackPlayerName = "Player1";
    config.redPlayerName = "Player2";

    // Trigger the game sequence by clicking on a position button on the board.
    $('.board button').click(function(e) {
        // Detect the x and y position of the button clicked.
        var y_pos = $('.board tr').index($(this).closest('tr'));
        var x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));

        // Ensure the piece falls to the bottom of the column.
        y_pos = dropToBottom(x_pos, y_pos);

        if (positionIsTaken(x_pos, y_pos)) {
            alert(config.takenMsg);
            return;
        }

        addDiscToBoard(currentPlayer, x_pos, y_pos);
        printBoard();

        // Check to see if we have a winner.
        if (verticalWin() || horizontalWin() || diagonalWin()) {
            // Destroy our click listener to prevent further play.
            $('.board button').unbind('click');
            $('.prefix').text(config.winPrefix);
            $('.play-again').show("slow");
            return;

        } else if (gameIsDraw()) {
            // Destroy our click listener to prevent further play.
            $('.board button').unbind('click');
            $('.message').text(config.drawMsg);
            $('.play-again').show("slow");
            return;
        }

        changePlayer();
    });

    $('.play-again').click(function(e) {
        location.reload();
    });

});
