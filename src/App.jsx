import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';

//TO DO LIST:

//Need to create system where, if the current user input is empty, it sets the currentuser to undefined

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], // messages coming from the server will be stored here
      userCount: 0,
      colour: '#000000'
    };

  }

  // Handles sending messages to the websockets server (3001)
  newMessage = (chatMessage) => {
    let username = this.state.currentUser.name;
    let colour = this.state.colour;
    if(username === ''){
      username = 'Anonymous';
    }
    let messageData = {type: "postMessage", username: username, content: chatMessage, colour: colour};
    this.socket.send(JSON.stringify(messageData));
  }

  //This function defines what happens when a user changes their name
  newUser = (newUser) => {
    //Set the state of who the current user is
    let currentState = this.state;
    let currentUser = currentState.currentUser.name;
    //Handle edge case for when no user name is entered:
    if(newUser === ''){
      newUser = "anonymous"
    }
    currentState.currentUser.name = newUser;
    //Send a new notification message indicating change of user name
    let newNotification = `${currentUser} changed their name to ${newUser}`;
    let newMessage = {type: "postNotification", content: newNotification};
    this.socket.send(JSON.stringify(newMessage));

    //Finally set the state with the new user, re-render the page
    this.setState(currentState);
  }

  // Will only be called once (mentor)
  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, type: "incomingMessage", username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 3000);

    //Set up websocket
    this.socket = new WebSocket("ws://localhost:3001");

    //Handle messages received from server
    this.socket.onmessage = (event) => {
      let currentState = this.state;
      let incomingMessage = JSON.parse(event.data);
      //Divert messages that update the user count
      if(incomingMessage.type === "countMessage"){
        currentState.userCount = incomingMessage.clientCount;
      }
      //Handle message defining new user's colour
      else if(incomingMessage.type === "colour"){
        currentState.colour = incomingMessage.colour;
        console.log(currentState.colour);
      }
      //Otherwise, update the chat log (messages and notifications)
      else{
        currentState.messages.push(incomingMessage);
      }
      this.setState(currentState);
    }
  }

  render() {
    return (
      <div>
        <Navbar userCount={this.state.userCount}/>
        <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser} newMessage={this.newMessage} newUser={this.newUser}/>
      </div>
    );
  }
}
export default App;
