import React, {Component} from 'react';

class Message extends Component{
  render() {
    let message = this.props.message;
    //This section handles new messages, possibly including images
    if(this.props.type === 'incomingMessage'){
      // Set colour according to value sent by websocket server
      const nameStyle = {
        color: this.props.colour
      };
      // Search for presence of images using regular expressions. If found, remove the expression and replace it
      // with an image element that has the corresponding URL.
      let imgElem = '';
      let regex = /\S+\.jpg|\S+\.png|\S+\.gif/g
      let imgURLs = message.match(regex);
      if(imgURLs !== null){
        message = message.replace(regex, '');
        let iterator = 0;
        imgElem = imgURLs.map(imgURL => {
          iterator++;
          return <img key={iterator} src={imgURL} alt='Image' className='image'></img>
        })
      }
      return (
        <div>
          <div className='message'>
            <span className='message-username' style={nameStyle}>{this.props.username}</span>
            <span className='message-content'>{message}</span>
          </div>
          <div className='imageFlex'>
            {imgElem}
          </div>
        </div>
      )
    // This section handles incoming notifications, posted with a special CSS styling.
    }else if(this.props.type === 'incomingNotification'){
      return (
        <div className='message system'>
        {message}
        </div>
      )
    }
  }
}

export default Message;