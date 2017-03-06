import React from 'react';
import './Header.css';
import Link from '../Link/Link';
import socialLinks from '../../data/socialMediaLinks';

class Header extends React.Component {
  render() {
    return (
      <div className="App-header">
        <div className="App-header-cont">
          <h1>Darth Vader Stole My Shirt</h1>
        </div>
        <div className="App-header-social">
          <Link linkDest={socialLinks.facebook}><i className="fa fa-facebook-square" aria-hidden="true"></i></Link>
        </div>
        <div className="App-header-social">
          <Link linkDest={socialLinks.github}><i className="fa fa-github-square" aria-hidden="true"></i></Link>
        </div>
        <div className="App-header-social">
          <Link linkDest={socialLinks.instagram}><i className="fa fa-instagram" aria-hidden="true"></i></Link>
        </div>
        <div className="App-header-social">
          <Link linkDest={socialLinks.snapchat}><i className="fa fa-snapchat" aria-hidden="true"></i></Link>
        </div>
      </div>
    );
  }
}

export default Header;
