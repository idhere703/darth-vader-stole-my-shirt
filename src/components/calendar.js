import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

const MyCalendar = props => (
    <div>
      <BigCalendar />
    </div>
);

export default MyCalendar;