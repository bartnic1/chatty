import React, {Component} from 'react';
import Message from './Message.jsx';

//The iterator ensures each react component has a unique key when it is rendered. Otherwise, data is passed
//thruogh props to each message.
class MessageList extends Component{
  render() {
    let iterator = 0;
    const messages = this.props.messages.map((message) => {
      iterator++;
      return (<Message key={iterator} type={message.type} message={message.content} username={message.username} colour={message.colour}/>)
    })

    return(
      <main className="messages">
        {messages}
      </main>
    )
  }

}

export default MessageList;