$(document).ready(function() {

    // Setup game.
    config.blackPlayerName = "Player1";
    config.redPlayerName = "Player2";

  $('.prefix').text(config.playerPrefix);
  $('#player').addClass(currentPlayer).text(config[currentPlayer + "PlayerName"]);


    $('.play-again').click(function(e) {
        location.reload();
    });

});
