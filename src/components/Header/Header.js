import React from 'react';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className="App-header">
        <div className="App-header-cont">
          <h1>Darth Vader Stole My Shirt</h1>
        </div>
        <div className="App-header-social">
          <i className="fa fa-facebook-square" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

export default Header;
