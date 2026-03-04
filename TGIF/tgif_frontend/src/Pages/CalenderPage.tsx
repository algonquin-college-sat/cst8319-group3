import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

interface Event {
  id: number;
  titleEn: string;
  titleFr: string;
  eventDate: string;
  location: string;
}

function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get<Event[]>("http://localhost:8080/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const eventsOnSelectedDate = events.filter(
    (event) => new Date(event.eventDate).toDateString() === date.toDateString()
  );

  return (
    <div className="container">
      <h2>Event Calendar</h2>

      //eslint-disable-next-line @typescript-eslint/no-unused-vars
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) setDate(value); // safe
        }}
        value={date}
      />

      <h3>Events on {date.toDateString()}</h3>

      {eventsOnSelectedDate.length === 0 && <p>No events</p>}

      {eventsOnSelectedDate.map((event) => (
        <div key={event.id} className="event-card">
          <h4>{event.titleEn}</h4>
          <p>{event.location}</p>
        </div>
      ))}
    </div>
  );
}

export default CalendarPage;