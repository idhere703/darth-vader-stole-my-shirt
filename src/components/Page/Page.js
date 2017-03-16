import React, { Component } from 'react';
import './Page.css'
import Content from '../Content/Content';
import DateSelector from '../DatePicker/DatePicker';
class Page extends Component {
  render() {
    return (
      <div className="Page">
        <Content>
          <div className="vertical-container">
            // <DateSelector></DateSelector>
          </div>
        </Content>
      </div>

    );
  }
}

export default Page;
