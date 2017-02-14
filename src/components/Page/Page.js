import React, { Component } from 'react';
import './Page.css'

class Page extends Component {
  render() {
    return (
      <div className="content">
        <div className="vertical-container">
          <div className="vertical-box">
            Content with flex.
          </div>
          <div className="vertical-box">
            Other.
          </div>
          <div className="vertical-box">
            And some more.
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
