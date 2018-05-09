// Jensen Shurbert, Alexander Powell, Delaney Ambrosen
// Kenyon College
// Run: node chatApp.js
var http = require('http');
var fs = require('fs');
var playerCount = 0;







// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
  var url = req.url;
  // If no path, get the index.html
  if (url == "/") url = "/connectfour.html";
  // get the file extension (needed for Content-Type)
  var ext = url.split('.').pop();
  console.log(url + "  :  " + ext);
  // convert file type to correct Content-Type
  var memeType = 'html'; // default
  switch (ext) {
    case 'css':
      memeType = 'css';
      break;
    case 'png':
      memeType = 'png';
      break;
    case 'jpg':
      memeType = 'jpeg';
      break;
  }
  // Send the requested file
  fs.readFile('.' + url, 'utf-8', function(error, content) {
    res.writeHead(200, {
      "Content-Type": "text/" + memeType
    });
    res.end(content);
  });
});

console.log("Loaded index file");
// Loading socket.io
var io = require('socket.io').listen(server);

// When a client connects, we note it in the console
io.sockets.on('connection', function(socket) {
  console.log('A message has been sent!');
  // watch for message from client (JSON)
  socket.on('message', function(message) {
  	console.log(JSON.stringify(message));
    //Join message {operation: 'join', name: clientname}
    if (message.operation == 'join') {
      console.log('Client: joins'+playerCount);
      // Send join message to all other clients
    
    if (playerCount == 0) {
    	playerCount+= 1;
    	console.log("Player" + playerCount + " attempted to join");
    	
    	socket.emit('message', {
        	operation: 'accept',
        	num: "1"
      	});
      
      	socket.broadcast.emit('message', {
        	operation: 'joined',
        	num: "1"
      	});
    } else if (playerCount == 1) {
    	playerCount += 1;
    	console.log("Player" + playerCount + " attempted to join");

    	socket.emit('message', {
        	operation: 'accept',
        	num: "2"
      	});
      
      	socket.broadcast.emit('message', {
        	operation: 'joined',
        	num: "2"
      	});
    } else if (playerCount == 2) {
    	console.log("Additional Player Rejected");
    	
    	socket.emit('message', {
        	operation: 'reject',
      	});
          	
    }    		}

    
    else if (message.operation == 'move'){
    	console.log("You made a move");
    	
    	playerNumber = message.num;
    	var x_pos=message.xPos;
    	var y_pos=message.yPos;
    	
    	if (playerNumber == 1){
    	console.log("Player1 Moved");
    	
    	socket.emit('message', {
        	operation: 'move',
    		xPos: x_pos,
			yPos: y_pos,        	
        	num: "2"
      	});
      
      	socket.broadcast.emit('message', {
        	operation: 'moved',
    		xPos: x_pos,
			yPos: y_pos,        	
        	num: "2"
      	});
      	console.log(x_pos + " : " + y_pos);
      	
   			 }
    
    	if (playerNumber == 2){
    	console.log("Player2 Moved");

        socket.emit('message', {
        	operation: 'move',
    		xPos: x_pos,
<<<<<<< HEAD
			yPos: y_pos,
=======
			yPos: y_pos,        	
>>>>>>> 7b8ee4361f11b886fc97ab1c5853762dc6f34021
        	num: "1"
      	});
      	
      	socket.broadcast.emit('message', {
        	operation: 'moved',
    		xPos: x_pos,
			yPos: y_pos,        	
        	num: "1"
      	});
      console.log(x_pos + " : " + y_pos);

    }
    }
    

  });

});
//Everyone must use own port > 8000
server.listen(8888);

(function (logger) {
    console.old = console.log;
    console.log = function () {
        var output = "", arg, i;

        for (i = 0; i < arguments.length; i++) {
            arg = arguments[i];
            output += "<span class=\"log-" + (typeof arg) + "\">";

            if (
                typeof arg === "object" &&
                typeof JSON === "object" &&
                typeof JSON.stringify === "function"
            ) {
                output += JSON.stringify(arg);
            } else {
                output += arg;
            }

            output += "</span>&nbsp;";
        }

        logger.innerHTML += output + "<br>";
        console.old.apply(undefined, arguments);
    };
})(document.getElementById("logger"));

console.log("Hi!", {a:3, b:6}, 42, true);
console.log("Multiple", "arguments", "here");
console.log(null, undefined);
console.old("Eyy, that's the old and boring one.");

//operations : accept, reject, move, joined
//playerCount for accept and reject
//move needs playerCount and an x and y

//write server code that sits there and waits for a message, must be an accept
//if accept, send back a accept



//counter is in the server 