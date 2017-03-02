import React, { Component } from 'react';
import './Page.css'
import Content from '../Content/Content';
import { lines } from '../../data/text';

class Page extends Component {
  render() {
    return (
      <Content>
        <div className="content">
          <div className="vertical-container">
            {lines.map((text, index) => {
              return (
                <div key={index} className="vertical-box">
                  {text}
                </div>
              );
            })}
          </div>
        </div>
      </Content>
    );
  }
}

export default Page;
