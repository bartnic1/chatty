import React, {Component} from 'react';

class Message extends Component{
  render() {
    let message = this.props.message;
    if(this.props.type === "incomingMessage"){
      const nameStyle = {
        color: this.props.colour
      };
      let imgElem = '';
      //Search for presence of images using regular expressions
      let regex = /\S+\.jpg|\S+\.png|\S+\.gif/g
      let imgURL = regex.exec(message);
      if(imgURL !== null){
        message = message.replace(regex, '');
        imgElem = <img src={imgURL[0]} alt="Image" className="image"></img>
      }
      //Use: /\S+\.jpg|\S+\.png|\S+\.gif/g       <-- Note the g defines a global search

      return (
        <div>
          <div className="message">
            <span className="message-username" style={nameStyle}>{this.props.username}</span>
            <span className="message-content">{message}</span>
          </div>
          <div className="imageFlex">
            {imgElem}
          </div>
        </div>
      )
    }else if(this.props.type === "incomingNotification"){
      return (
        <div className="message system">
        {message}
        </div>
      )
    }
  }
}

export default Message;