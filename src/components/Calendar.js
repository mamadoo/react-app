import { useState } from 'react';
import * as dateFns from 'date-fns-jalali';

import './Calendar.css';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateClick = day => {
    setSelectedDate(day);

    if (!dateFns.isSameMonth(currentMonth, day)) {
      const monthStart = dateFns.startOfMonth(currentMonth);
      const monthEnd = dateFns.endOfMonth(currentMonth);

      if (dateFns.isAfter(day, monthEnd)) {
        nextMonth();
      } else if (dateFns.isBefore(day, monthStart)) {
        prevMonth();
      }
    }
  };

  const nextMonth = () => {
    setCurrentMonth(dateFns.addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(dateFns.subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className='header row flex-middle'>
        <div className='col col-start'>
          <div className='icon' onClick={prevMonth}>
            chevron_left
          </div>
        </div>

        <div className='col col-center'>
          <span>{dateFns.format(currentMonth, dateFormat)}</span>
        </div>

        <div className='col col-end'>
          <div className='icon' onClick={nextMonth}>
            chevron_right
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = 'iiii';
    const days = [];

    const startDate = dateFns.startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className='col col-center' key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className='days row'>{days}</div>;
  };

  const renderCells = () => {
    const dateFormat = 'd';
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(currentMonth);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.startOfWeek(monthEnd);

    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const clonedDay = day;
        let className = 'col cell';
        if (!dateFns.isSameMonth(day, monthStart)) {
          className += ' disabled';
        } else if (dateFns.isSameDay(day, selectedDate)) {
          className += ' selected';
        }

        days.push(
          <div
            className={className}
            key={day}
            onClick={() => onDateClick(clonedDay)}
          >
            <span className='number'>{formattedDate}</span>
            <span className='bg'>{formattedDate}</span>
          </div>
        );

        day = dateFns.addDays(day, 1);
      }

      rows.push(
        <div className='row' key={day}>
          {days}
        </div>
      );

      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  return (
    <div className='calendar'>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
