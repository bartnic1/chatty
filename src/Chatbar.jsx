import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    // console.log('Rendering <Chatbar/>');
    const onKeyPress = evt => {
      if(evt.key === 'Enter'){
        const chatMessage = evt.target;
        this.props.newMessage(chatMessage.value);
        chatMessage.value = '';
      }
    }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>
        <input className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" onKeyPress={onKeyPress}/>
      </footer>
    );
  }
}

export default Chatbar;