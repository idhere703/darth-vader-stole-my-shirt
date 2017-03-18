import React, { Component } from 'react';

export class Calendar extends Component {
  render() {
    return (
      <diV>
        {this.props.month &&
          <table>
            <thead>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </thead>

            <tbody>
                {this.props.weeks && this.props.weeks.map((week) => {
                  return(<tr>
                    {week.days && week.days.map((day) => {return (
                      <td id={day.id}>{day.day}</td>
                    );})}
                  </tr>);
                })}
            </tbody>
          </table>
        }
      </diV>
    );
  };
}


export default Calendar;
