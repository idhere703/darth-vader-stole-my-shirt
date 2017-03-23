import React, { Component } from 'react';
import './Page.css'
import Content from '../Content/Content';
// import DateSelector from '../DatePicker/DatePicker';
import Calendar from '../Calendar/Calendar';

class Page extends Component {
  render() {
    return (
      <div className="Page">
        <Content>
          <div className="vertical-container">
            {/*<DateSelector></DateSelector>*/}
          </div>
        </Content>
        <Content>
          <div className="vertical-container">
            <Calendar></Calendar>
          </div>
        </Content>
      </div>

    );
  }
}

export default Page;
