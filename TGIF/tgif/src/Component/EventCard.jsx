import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event, language, imageUrl, showImage = false }) => {
  const title = language === "EN" ? event.titleEn : event.titleFr;

  return (
    <div className="event-card">
      {showImage && imageUrl && (
        <div className="event-card-img">
          <Link to={`/events/${event.id}`}>
            <img src={imageUrl} alt={title} />
          </Link>
        </div>
      )}
      <div className="event-card-body">
        <h2>{title}</h2>
        <p>
          <strong>Date:</strong> {event.eventDate}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        {event.keynoteSpeaker && (
          <p>
            <strong>Speaker:</strong> {event.keynoteSpeaker}
          </p>
        )}
        <Link to={`/events/${event.id}`} className="event-card-link">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
