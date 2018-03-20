import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    // console.log('Rendering <Chatbar/>');
    const messageEvent = evt => {
      if(evt.key === 'Enter'){
        const chatMessage = evt.target;
        this.props.newMessage(chatMessage.value);
        chatMessage.value = '';
      }
    }

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