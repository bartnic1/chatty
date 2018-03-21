import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [], // Messages coming from the server will be stored here
      userCount: 0,
      colour: '#000000'
    };
  }

  // Handles sending messages being sent from the browser to the websockets server (3001)
  newMessage = (chatMessage) => {
    let username = this.state.currentUser.name;
    let messageData = {type: "postMessage", username: username, content: chatMessage, colour: this.state.colour};
    this.socket.send(JSON.stringify(messageData));
  }

  //This function defines what happens when a user changes their name
  newUser = (newUser) => {
    if(newUser !== this.state.currentUser.name) {
      let currentState = this.state;
      let currentUser = currentState.currentUser.name;
      //If no user name is entered, switch name to anonymous:
      if(newUser === ''){
        newUser = "Anonymous"
      }
      currentState.currentUser.name = newUser;
      //Send a new notification message indicating change of user name
      let newNotification = `${currentUser} changed their name to ${newUser}`;
      let newMessage = {type: "postNotification", content: newNotification};
      this.socket.send(JSON.stringify(newMessage));

      this.setState(currentState);
    }
  }

  componentDidMount() {
    //This timeout was added as a part of the instructions for this project to test functionality
    setTimeout(() => {
      const newMessage = {id: 1, type: "incomingMessage", username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    }, 3000);

    //Set up websocket
    this.socket = new WebSocket("ws://localhost:3001");

    //Handle messages received from server
    this.socket.onmessage = (event) => {
      let currentState = this.state;
      let incomingMessage = JSON.parse(event.data);

      //Handle messages that update the user count
      if(incomingMessage.type === "countMessage"){
        currentState.userCount = incomingMessage.clientCount;
      }
      //Then, handle messages defining a new user's colour
      else if(incomingMessage.type === "colour"){
        currentState.colour = incomingMessage.colour;
      }
      //Otherwise, update the chat log (for messages and notifications)
      else{
        currentState.messages.push(incomingMessage);
      }
      this.setState(currentState);
    }
  }

  //Renders all state data into various react components
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
