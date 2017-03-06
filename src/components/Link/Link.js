import React, { Component } from 'react';
import './Link.css'

class Link extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <a className="Link" target="_blank" href={this.props.linkDest}>
        {this.props.children}
      </a>
    );
  }
}

export default Link;
