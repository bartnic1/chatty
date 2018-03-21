import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    //Message event handles when a user presses 'enter' to send a new message
    const messageEvent = evt => {
      if(evt.key === 'Enter'){
        const chatMessage = evt.target;
        this.props.newMessage(chatMessage.value);
        chatMessage.value = '';
      }
    }
    //User event handles when a user presses 'enter' to change their username
    const userEvent = evt => {
      if(evt.key === 'Enter'){
        const user = evt.target;
        this.props.newUser(user.value);
      }
    }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} onKeyPress={userEvent}/>
        <input className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" onKeyPress={messageEvent}/>
      </footer>
    );
  }
}

export default Chatbar;