import React, { Component } from 'react';
import './Link.css'

class Link extends Component {
  constructor(props) {
    super(props);
    console.log('props', props);
  }
  render() {
    return (
      <a className="Link" href={this.props.linkDest}>
        {this.props.children}
      </a>
    );
  }
}

export default Link;
