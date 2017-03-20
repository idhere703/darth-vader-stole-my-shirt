import moment from 'moment';

const CalendarInfo = {
  getData: () => {
    let currentDate = moment(); // Current date so we can display that.
    let daysInCurrentMonth = currentDate.daysInMonth(); // Days in month, used to determine how many cells we need.
    let weeks = Math.round((daysInCurrentMonth / 4) || 0); // Number of weeks to display.

    return {
      currentDate,
      daysInCurrentMonth,
      weeks
    };
  }
};

export default CalendarInfo;
