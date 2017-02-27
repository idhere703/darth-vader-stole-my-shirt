import React from 'react';
import './Content.css';

class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Content">
        {this.props.children}
      </div>
    );
  }
}

export default Content;
