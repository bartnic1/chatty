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
      messages: [] // messages coming from the server will be stored here
    };
    //On compass, they moved this to "componentdidmount". May want to change this later?
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = (evt) => {
      console.log("Connected to server");
    }
  }


  // New way: Sending messages to an external server (3001)

  newMessage = (chatMessage) => {
    let username = this.state.currentUser.name;
    if(username === ''){
      username = 'Anonymous';
    }
    let messageData = {type: "postMessage", username: username, content: chatMessage};
    this.socket.send(JSON.stringify(messageData));
  }

  newUser = (newUser) => {
    //Set the state of who the current user is
    let currentState = this.state;
    let currentUser = currentState.currentUser.name;
    currentState.currentUser.name = newUser;

    //Send a new notification message indicating change of user name
    let newNotification = `${currentUser} changed their name to ${newUser}`;
    let newMessage = {type: "postNotification", content: newNotification};
    this.socket.send(JSON.stringify(newMessage));

    //Finally set the state with the new user, re-render the page
    this.setState(currentState);
  }

  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, type: "incomingMessage", username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 3000);

    this.socket.onmessage = (event) => {
      let currentState = this.state;
      let incomingMessage = JSON.parse(event.data);
      currentState.messages.push(incomingMessage);
      this.setState(currentState);
    }
  }

  render() {
    // console.log('Rendering <App/>');
    return (
      <div>
        <Navbar/>
        <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser} newMessage={this.newMessage} newUser={this.newUser}/>
      </div>
    );
  }
}
export default App;
