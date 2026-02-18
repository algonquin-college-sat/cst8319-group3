import React from "react";

const EventCard = ({ event, language }) => {
  return (
    <div className="event-card">
      <h2>{language === "EN" ? event.titleEn : event.titleFr}</h2>

      <p>
        <strong>Date:</strong> {event.eventDate}
      </p>

      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <p>
        <strong>Speaker:</strong> {event.keynoteSpeaker}
      </p>
    </div>
  );
};

export default EventCard;
