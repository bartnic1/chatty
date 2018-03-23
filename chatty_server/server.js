const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// This function generates a new, randomized colour for each client (independent of their current username)
// Hex values go up to b (11) to ensure that only darker colours are generated.

// Note that, as with UUIDs, it is highly improbable that any two users are assigned the same colour.
function newColour() {
  let hex = '0123456789ab';
  let colour = '#';
  for(let index = 0; index < 6; index++){
    colour += hex[Math.floor(Math.random()*12)];
  }
  return colour;
}


// Set up a callback that will run when a client connects to the server.
// When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  //When a new user connects, give them a random colour for their username
  ws.send(JSON.stringify({type: 'colour', colour: newColour()}));

  //Update user count for all users when a new connection is established
  wss.clients.forEach(function each(client) {
    let countMessage = JSON.stringify({type: 'countMessage', clientCount: wss.clients.size});
    client.send(countMessage);
  })

  //This section deals with messages and notifications. Responses are managed based on type, and sent to all users.
  ws.on('message', function incoming(messageData) {
    let sendSelf = true;
    let newUUID = uuidv4();
    let message = JSON.parse(messageData);
    let returnMessage;
    switch(message.type){
      case 'postMessage':
        returnMessage = JSON.stringify({id: newUUID, type: 'incomingMessage', username: message.username, content: message.content, colour: message.colour});
        break;
      case 'postNotification':
        returnMessage = JSON.stringify({id: newUUID, type: 'incomingNotification', content: message.content});
        break;
      case 'postEnterNotification':
        returnMessage = JSON.stringify({id: newUUID, type: 'incomingNotification', content: message.content});
        sendSelf = false;
        break;
      default:
        break;
    }
    // Broadcast to everyone else (except if someone entered, in which case everyone else is notified)
    wss.clients.forEach(function each(client) {
      if (sendSelf === true && client.readyState === 1){
        client.send(returnMessage);
      }
      if(sendSelf === false && client !== ws && client.readyState === 1){
        client.send(returnMessage);
      }
    });
    sendSelf = true;
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  // Also sends a message to all clients updating the total user count.
  ws.on('close', () => {
    console.log('Client disconnected')
    wss.clients.forEach(function each(client) {
      let countMessage = JSON.stringify({type: 'countMessage', clientCount: wss.clients.size});
      client.send(countMessage);
    })
  });
});