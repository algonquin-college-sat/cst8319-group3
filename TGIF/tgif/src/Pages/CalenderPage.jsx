import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getAllEvents } from "../Services/eventService";
import "./CalendarPage.css";

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const currentYear = new Date().getFullYear();
  const eventsThisYear = events.filter((e) => {
    const d = new Date(e.eventDate);
    return d.getFullYear() === currentYear;
  });

  const eventsOnSelectedDate = eventsThisYear.filter(
    (event) => new Date(event.eventDate).toDateString() === date.toDateString()
  );

  const tileClassName = ({ date: tileDate }) => {
    const hasEvent = eventsThisYear.some(
      (e) => new Date(e.eventDate).toDateString() === tileDate.toDateString()
    );
    return hasEvent ? "cal-has-event" : null;
  };

  const maxDate = new Date(currentYear, 11, 31);
  const minDate = new Date(currentYear, 0, 1);

  return (
    <div className="cal-page">
      <div className="cal-header">
        <h1>Festival Calendar</h1>
        <p>Events for {currentYear}. Click a date to see events.</p>
      </div>

      <div className="cal-layout">
        <section className="cal-calendar-wrap">
          <Calendar
            onChange={setDate}
            value={date}
            minDate={minDate}
            maxDate={maxDate}
            tileClassName={tileClassName}
            className="cal-widget"
          />
        </section>

        <section className="cal-events">
          <h2>Events on {date.toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</h2>
          {loading ? (
            <p>Loading...</p>
          ) : eventsOnSelectedDate.length === 0 ? (
            <p className="cal-no-events">No events on this date.</p>
          ) : (
            <ul className="cal-event-list">
              {eventsOnSelectedDate.map((event) => (
                <li key={event.id} className="cal-event-item">
                  <Link to={`/events/${event.id}`}>
                    <strong>{event.titleEn}</strong>
                    <span>{event.location}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default CalendarPage;
