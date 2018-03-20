import React, {Component} from 'react';

class Message extends Component{
  render() {
    if(this.props.type === "incomingMessage"){
      return (
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.message}</span>
        </div>
      )
    }else if(this.props.type === "incomingNotification"){
      return (
        <div className="message system">
        {this.props.message}
        </div>
      )
    }
  }
}

export default Message;