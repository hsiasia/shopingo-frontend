import React, { useState, useEffect } from 'react';
import { Footer, Navbar } from '../components';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    fetch(`https://shopingo.info/api/calendar/getCalendarEvents?user_id=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const events = data.data.map(event => ({
          id: event.id,
          title: event.summary,
          start: new Date(event.start.dateTime),
          end: new Date(event.end.dateTime),
        }));
        setEventList(events);
      })
      .catch((error) => {
        console.error('Error fetching calendar events:', error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Calendar</h1>
        <hr />
        <div>
          <BigCalendar
            localizer={localizer}
            events={eventList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Calendar;
