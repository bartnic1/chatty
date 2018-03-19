import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };
  }

  newMessage = (chatMessage) => {
    let newChatMessage = {username: this.state.currentUser.name, content: chatMessage};
    let messages = [...this.state.messages, newChatMessage];
    this.setState({messages: messages});
  }


  // in App.jsx
  componentDidMount() {

    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    // console.log('Rendering <App/>');
    return (
      <div>
        <Navbar/>
        <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser} newMessage={this.newMessage}/>
      </div>
    );
  }
}
export default App;
