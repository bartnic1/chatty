import React, {Component} from 'react';

class Navbar extends Component {
  render() {
  // Displays the current number of clients (plural if more than 1)
  const plural = this.props.userCount > 1 ? 'chatters' : 'chatter';
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <h2 className="navbar-counter">{this.props.userCount} {plural} online</h2>
      </nav>
    );
  }
}

export default Navbar;