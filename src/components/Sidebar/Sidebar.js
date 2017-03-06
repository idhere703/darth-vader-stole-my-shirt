import React, { Component } from 'react';
import './Sidebar.css'
import Link from '../Link/Link';

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        <Link linkDest="http://lmgtfy.com/?q=where+am+i">Where Am I?</Link>
      </div>
    );
  }
}

export default Sidebar;
