import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component{
  render() {
    // console.log('Rendering <Messages/>');
    let iterator = 0;
    const messages = this.props.messages.map((message) => {
      iterator++;
      return (<Message key={iterator} message={message.content} username={message.username}/>)
    })


    return(
      <main className="messages">
        {messages}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    )
  }

}

export default MessageList;