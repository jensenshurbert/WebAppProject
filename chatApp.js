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
          	
    }
    

      

    }
    
    
    // Message from client {operation: 'mess', name: clientname, test: message}
    if (message.operation == 'mess') {
      console.log('Message: ' + message.text);
      // sent back out to everyone
      socket.broadcast.emit('message', {
        operation: 'mess',
        name: message.name,
        text: message.text
      });
      // send back to sender
      socket.emit('message', {
        operation: 'mess',
        name: message.name,
        text: message.text
      });

    }
  });

});
//Everyone must use own port > 8000
server.listen(8888);


//operations : accept, reject, move, joined
//playerCount for accept and reject
//move needs playerCount and an x and y

//write server code that sits there and waits for a message, must be an accept
//if accept, send back a accept



//counter is in the server 