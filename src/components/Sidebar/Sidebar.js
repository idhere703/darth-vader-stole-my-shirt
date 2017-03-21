import React, { Component } from 'react';
import './Sidebar.css'
import Link from '../Link/Link';

class Sidebar extends Component {

openNav() {
  document.getElementById("sidenav").style.width = "250px";
  document.getElementById("App").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0)";
}

closeNav() {
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("App").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
}


  render() {
    return (
      <div>
        <div id="sidenav" className="sidenav">
          <Link linkDest="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</Link>
          <Link linkDest="http://lmgtfy.com/?q=where+am+i">Where Am I?</Link>
        </div>
        <span className="open-sidebar" onClick={this.openNav}>&#9776; Open</span>
      </div>

    );

  }
}

export default Sidebar;
