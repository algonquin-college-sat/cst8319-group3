import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const eventsOnSelectedDate = events.filter(event =>
    new Date(event.eventDate).toDateString() === date.toDateString()
  );

  return (
    <div className="container">
      <h2>Event Calendar</h2>

      <Calendar onChange={setDate} value={date} />

      <h3>Events on {date.toDateString()}</h3>

      {eventsOnSelectedDate.length === 0 && <p>No events</p>}

      {eventsOnSelectedDate.map(event => (
        <div key={event.id} className="event-card">
          <h4>{event.titleEn}</h4>
          <p>{event.location}</p>
        </div>
      ))}
    </div>
  );
}

export default CalendarPage;
