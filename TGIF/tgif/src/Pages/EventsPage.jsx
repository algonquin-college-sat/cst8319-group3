import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../Services/eventService";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err) {
        setError("Unable to load events right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="page-container"><p>Loading events...</p></div>;
  }

  if (error) {
    return <div className="page-container"><p>{error}</p></div>;
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Events</h1>
        <p>Discover our free and paid events, and learn more about each experience.</p>
      </header>

      {events.length === 0 && <p>No events available at the moment.</p>}

      <div className="events-section">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h2>{event.titleEn}</h2>
            <p><strong>Date:</strong> {event.eventDate}</p>
            <p><strong>Location:</strong> {event.location}</p>
            {event.price != null && (
              <p><strong>Price:</strong> {event.price === 0 ? "Free" : `$${event.price}`} </p>
            )}
            <Link to={`/events/${event.id}`} className="event-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;

