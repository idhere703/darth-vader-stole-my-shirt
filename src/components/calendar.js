import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

const MyCalendar = props => (
    <div>
      <BigCalendar events={ [] } view={ 'week' } />
    </div>
);

export default MyCalendar;