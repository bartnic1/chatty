import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import Navbar from './Navbar.jsx';
import Main from './MessageList.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Main/>
        <Chatbar/>
      </div>
    );
  }
}
export default App;
