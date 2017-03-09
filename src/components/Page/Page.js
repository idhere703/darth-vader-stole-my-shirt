import React, { Component } from 'react';
import './Page.css'
import Content from '../Content/Content';
import DateSelector from '../DatePicker/DatePicker';
class Page extends Component {
  render() {
    return (
      <Content>
        <div>
          <div className="vertical-container">
            <DateSelector></DateSelector>
          </div>
        </div>
      </Content>
    );
  }
}

export default Page;
