import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class DateSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      displayName: 'Date'
    };
  }

  handleChange = (date) => {
    this.setState({startDate: date});
  };

  render() {
    return (
      <div>
        <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>
      </div>
    );
  }
}

export default DateSelector;
