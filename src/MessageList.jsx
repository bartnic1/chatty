import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component{
  render() {
    // console.log('Rendering <Messages/>');
    let iterator = 0;
    const messages = this.props.messages.map((message) => {
      iterator++;
      return (<Message key={iterator} type={message.type} message={message.content} username={message.username}/>)
    })

    return(
      <main className="messages">
        {messages}
      </main>
    )
  }

}

export default MessageList;